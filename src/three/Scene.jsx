/* ============================================================================
 * Hero sculpture — "Strata" (lazy-loaded, its own JS chunk).
 *
 * A kinetic sculpture: a sphere sliced into floating rounded plates, stacked
 * around a softly glowing core. The plates twist into a helix, ripple slowly,
 * fan open toward the pointer and pull apart as the hero scrolls away.
 * On load they fly in from a scattered state and assemble (~1.8 s).
 *
 * Tweak the look with PALETTE and the SHAPE constants below.
 *
 * Performance notes
 *  - No external HDR: the environment map is generated locally (RoomEnvironment).
 *  - One shared rounded-box geometry for every plate; plates are scaled, not rebuilt.
 *  - 'lite' quality (phones / low-power / slow frame rate): fewer plates, no
 *    antialiasing, lower pixel ratio.
 *  - Rendering stops entirely when the hero is off-screen (`active` prop).
 *  - With prefers-reduced-motion the scene renders on demand (no idle motion).
 * ========================================================================== */
import { useEffect, useMemo, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { MathUtils, PMREMGenerator } from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import LeanCanvas from './LeanCanvas.jsx';

const PALETTE = {
  plate: '#6c7156', // olive plates
  plateAlt: '#d9d1b4', // ivory accent plates
  core: '#efe4c2', // glowing core
  ring: '#c9c0a0',
  key: '#f1ead7',
  fill: '#899071',
  rim: '#c8bfa2',
};

const SHAPE = {
  plates: { high: 24, lite: 16 },
  radius: 1.55, // overall sculpture radius
  thickness: 0.07, // plate thickness
  twist: 0.11, // resting helix twist between plates (radians)
  accentEvery: 5, // every Nth plate is ivory
};

const CAMERA = { position: [0, 0, 5.5], fov: 40 };
const GL_HIGH = { antialias: true, alpha: true, powerPreference: 'high-performance' };
const GL_LITE = { antialias: false, alpha: true, powerPreference: 'default' };

const easeOutExpo = (x) => (x >= 1 ? 1 : 1 - Math.pow(2, -10 * x));
// deterministic pseudo-random so the "scattered" start is the same every load
const rand = (i, s) => {
  const x = Math.sin(i * 127.1 + s * 311.7) * 43758.5453;
  return x - Math.floor(x);
};

function LocalEnvironment({ intensity = 0.6 }) {
  const { gl, scene, invalidate } = useThree();
  useEffect(() => {
    const pmrem = new PMREMGenerator(gl);
    const room = new RoomEnvironment();
    const rt = pmrem.fromScene(room, 0.04);
    scene.environment = rt.texture;
    scene.environmentIntensity = intensity;
    invalidate();
    return () => {
      scene.environment = null;
      rt.dispose();
      pmrem.dispose();
      room.dispose?.();
    };
  }, [gl, scene, invalidate, intensity]);
  return null;
}

/** Downgrades to 'lite' if the first seconds run below ~40 fps. */
function FrameRateGuard({ quality, onSlow }) {
  const samples = useRef({ t: 0, frames: 0, done: false });
  useFrame((state, dt) => {
    const s = samples.current;
    if (s.done || quality !== 'high') return;
    if (state.clock.elapsedTime < 1.2) return; // skip shader-compile warm-up
    s.t += dt;
    s.frames += 1;
    if (s.t > 2) {
      s.done = true;
      if (s.frames / s.t < 40) onSlow();
    }
  });
  return null;
}

function PointerLight({ pointer }) {
  const light = useRef();
  useFrame((_, dt) => {
    if (!light.current) return;
    light.current.position.x = MathUtils.damp(light.current.position.x, pointer.current.x * 4.5, 3, dt);
    light.current.position.y = MathUtils.damp(light.current.position.y, pointer.current.y * 3 + 1, 3, dt);
  });
  return <pointLight ref={light} position={[0, 1, 3.4]} intensity={10} distance={9} color={PALETTE.key} />;
}

function Strata({ pointer, progress, quality, reduced, startAt, onReady }) {
  const root = useRef();
  const core = useRef();
  const ring = useRef();
  const plateRefs = useRef([]);
  const readySent = useRef(false);
  const fan = useRef(0); // smoothed pointer "energy"
  // Portrait screens (phones): a calmer, rounder, slightly smaller sculpture that reads clearly.
  const { size } = useThree();
  const portrait = size.width < 761 || size.width < size.height * 0.9;

  const count = portrait ? 22 : SHAPE.plates[quality === 'high' ? 'high' : 'lite'];
  const geometry = useMemo(() => new RoundedBoxGeometry(1, 1, 1, 3, 0.18), []);
  useEffect(() => () => geometry.dispose(), [geometry]);

  // Plate layout: slices of a sphere (width follows the sphere's profile).
  const plates = useMemo(() => {
    const gap = (SHAPE.radius * 2) / count;
    return Array.from({ length: count }, (_, i) => {
      const y = (i - (count - 1) / 2) * gap;
      const t = y / SHAPE.radius;
      const w = Math.max(0.28, Math.sqrt(Math.max(0, 1 - t * t)) * SHAPE.radius * (portrait ? 1.3 : 1.55));
      return {
        y,
        w,
        d: w * (portrait ? 0.9 : 0.58),
        accent: i % SHAPE.accentEvery === 2,
        // scattered start for the intro
        sx: (rand(i, 1) - 0.5) * 7,
        sy: (rand(i, 2) - 0.5) * 6,
        sr: (rand(i, 3) - 0.5) * 4,
      };
    });
  }, [count, portrait]);

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    if (!readySent.current) { readySent.current = true; onReady?.(); }

    const e = reduced ? 1 : easeOutExpo(Math.min(1, Math.max(0, (performance.now() - startAt) / 1800)));
    const p = progress.current; // 0 → 1 while the hero scrolls away
    const px = pointer.current.x;
    const py = pointer.current.y;
    fan.current = MathUtils.damp(fan.current, Math.min(1, Math.hypot(px, py)), 2.5, dt);

    const spread = 1 + fan.current * 0.35 + p * 1.1; // vertical opening
    const twist = (portrait ? 0.035 : SHAPE.twist) + px * 0.12 + p * 0.25 + (1 - e) * 0.6;
    const idle = reduced ? 0 : t;

    plates.forEach((pl, i) => {
      const m = plateRefs.current[i];
      if (!m) return;
      const wave = reduced ? 0 : Math.sin(idle * 0.9 + i * 0.42);
      const k = 1 - e; // 1 = scattered, 0 = assembled
      m.position.set(
        pl.sx * k + wave * 0.03 * (1 + fan.current),
        pl.y * spread + pl.sy * k,
        wave * 0.02
      );
      m.rotation.set(pl.sr * k + py * 0.05 * wave, i * twist + idle * 0.12 + pl.sr * k, pl.sr * 0.3 * k);
    });

    if (root.current) {
      root.current.rotation.y = MathUtils.damp(root.current.rotation.y, px * 0.45, 2.6, dt);
      root.current.rotation.x = MathUtils.damp(root.current.rotation.x, (portrait ? 0.08 : 0.22) - py * 0.3 + p * 0.5, 2.6, dt);
      root.current.rotation.z = MathUtils.damp(root.current.rotation.z, (portrait ? -0.05 : -0.18) + px * 0.06, 2.6, dt);
      root.current.position.y = -p * 0.8;
      root.current.scale.setScalar((0.7 + 0.3 * e) * (1 - p * 0.15) * (portrait ? 0.86 : 1));
    }
    if (core.current) {
      const pulse = reduced ? 1 : 1 + Math.sin(idle * 1.4) * 0.04;
      core.current.scale.setScalar((0.55 + fan.current * 0.12 + p * 0.25) * pulse * e);
      core.current.material.emissiveIntensity = 0.55 + fan.current * 0.6 + p * 0.4;
    }
    if (ring.current) {
      ring.current.rotation.z = idle * 0.08;
      ring.current.rotation.x = 1.08 + py * 0.15;
      ring.current.scale.setScalar((0.8 + 0.2 * e + p * 0.2) * (portrait ? 0.8 : 1));
    }
  });

  return (
    <group ref={root}>
      {plates.map((pl, i) => (
        <mesh
          key={`${count}-${i}`}
          ref={(el) => { plateRefs.current[i] = el; }}
          geometry={geometry}
          scale={[pl.w, SHAPE.thickness, pl.d]}
        >
          <meshPhysicalMaterial
            color={pl.accent ? PALETTE.plateAlt : PALETTE.plate}
            metalness={pl.accent ? 0.1 : 0.28}
            roughness={pl.accent ? 0.42 : 0.46}
            clearcoat={0.45}
            clearcoatRoughness={0.35}
          />
        </mesh>
      ))}
      <mesh ref={core}>
        <sphereGeometry args={[1, 40, 24]} />
        <meshStandardMaterial color={PALETTE.core} emissive={PALETTE.core} emissiveIntensity={0.6} roughness={0.4} />
      </mesh>
      <mesh ref={ring}>
        <torusGeometry args={[1.8, 0.008, 8, 160]} />
        <meshStandardMaterial color={PALETTE.ring} metalness={0.7} roughness={0.35} />
      </mesh>
    </group>
  );
}

/** Keeps a reduced-motion (on-demand) scene in sync with pointer / scroll. */
function DemandDriver({ pointer, progress }) {
  const { invalidate } = useThree();
  useEffect(() => {
    let last = '';
    let raf;
    const loop = () => {
      const key = `${pointer.current.x.toFixed(3)}|${pointer.current.y.toFixed(3)}|${progress.current.toFixed(3)}`;
      if (key !== last) { last = key; invalidate(); }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [invalidate, pointer, progress]);
  return null;
}

export default function Scene({ pointer, progress, active, reduced, initialQuality = 'high', startAt = 0, onReady }) {
  const [quality, setQuality] = useState(initialQuality);
  const high = quality === 'high';

  return (
    <LeanCanvas
      dpr={high ? [1, 1.75] : [1, 1.35]}
      camera={CAMERA}
      gl={high ? GL_HIGH : GL_LITE}
      frameloop={!active ? 'never' : reduced ? 'demand' : 'always'}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 5, 5]} intensity={1.6} color={PALETTE.key} />
      <pointLight position={[-4, -2, 3]} intensity={14} color={PALETTE.fill} />
      <pointLight position={[2, 2, -4]} intensity={8} color={PALETTE.rim} />
      <pointLight position={[0, 0, 0]} intensity={1.6} distance={2.4} color={PALETTE.core} />
      <PointerLight pointer={pointer} />
      <LocalEnvironment intensity={0.32} />
      <Strata pointer={pointer} progress={progress} quality={quality} reduced={reduced} startAt={startAt} onReady={onReady} />
      <FrameRateGuard quality={quality} onSlow={() => setQuality('lite')} />
      {reduced && active && <DemandDriver pointer={pointer} progress={progress} />}
    </LeanCanvas>
  );
}
