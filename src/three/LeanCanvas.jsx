/* ============================================================================
 * LeanCanvas — a minimal replacement for R3F's <Canvas>.
 *
 * R3F's <Canvas> registers the *entire* three.js namespace (`extend(THREE)`),
 * which defeats tree-shaking. Here we register only the classes the scene
 * uses, which roughly halves the 3D chunk. If you add new three.js objects to
 * the scene (e.g. <boxGeometry/>), add their classes to `extend({...})` below.
 * ========================================================================== */
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createRoot, extend } from '@react-three/fiber';
import {
  AmbientLight,
  DirectionalLight,
  Group,
  Mesh,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  PointLight,
  SphereGeometry,
  TorusGeometry,
} from 'three';

extend({
  AmbientLight,
  DirectionalLight,
  Group,
  Mesh,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  PointLight,
  SphereGeometry,
  TorusGeometry,
});

export default function LeanCanvas({ children, dpr, camera, gl, frameloop = 'always', className, style }) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const rootRef = useRef(null);
  const [size, setSize] = useState(null);

  // Track wrapper size.
  useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const measure = () => {
      const r = el.getBoundingClientRect();
      if (r.width && r.height) setSize({ width: r.width, height: r.height, top: 0, left: 0 });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Create a fresh <canvas> per mount (safe under React StrictMode double-mounts).
  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'display:block;width:100%;height:100%';
    wrapRef.current.appendChild(canvas);
    canvasRef.current = canvas;
    rootRef.current = createRoot(canvas);
    return () => {
      rootRef.current?.unmount();
      rootRef.current = null;
      canvas.remove();
    };
  }, []);

  // (Re)configure and render whenever inputs change.
  useEffect(() => {
    const root = rootRef.current;
    if (!root || !size) return;
    let cancelled = false;
    Promise.resolve(root.configure({ size, dpr, camera, gl, frameloop })).then(() => {
      if (!cancelled && rootRef.current === root) root.render(children);
    });
    return () => { cancelled = true; };
  });

  return <div ref={wrapRef} className={className} style={{ position: 'relative', width: '100%', height: '100%', ...style }} />;
}
