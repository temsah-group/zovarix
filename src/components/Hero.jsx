import { Component, lazy, Suspense, useEffect, useRef, useState } from 'react';
import { MoveUpRight } from 'lucide-react';
import Rich from './Rich.jsx';
import { detectQuality, hasWebGL } from '../lib/hooks.js';

// The whole Three.js / R3F stack lives in this lazily-loaded chunk, so the page
// text renders before ~250 KB (gzip) of 3D code has even arrived.
const loadScene = () => import('../three/Scene.jsx');
const Scene = lazy(loadScene);

class SceneBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(err) { if (import.meta.env.DEV) console.warn('3D scene disabled:', err); }
  render() { return this.state.failed ? null : this.props.children; }
}

export default function Hero({ t, lang, reduced, introMode }) {
  const ref = useRef(null);
  // When the sculpture's entrance should begin (aligned with the veil lifting).
  const [startAt] = useState(() => performance.now() + (introMode === 'full' ? 750 : introMode === 'short' ? 100 : 0));
  const pointer = useRef({ x: 0, y: 0 });
  const progress = useRef(0);
  const [active, setActive] = useState(true);
  const [ready, setReady] = useState(false);
  const [webgl] = useState(hasWebGL);
  const [quality] = useState(detectQuality);
  const [load, setLoad] = useState(false);

  // Start fetching the 3D chunk right after first paint.
  useEffect(() => {
    if (!webgl) return;
    const id = requestAnimationFrame(() => setLoad(true));
    return () => cancelAnimationFrame(id);
  }, [webgl]);

  // Pause WebGL rendering while the hero is off-screen.
  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Pointer tilt + scroll progress → CSS variables (--mx, --my, --p) and refs for the 3D scene.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const target = { x: 0, y: 0 };
    const cur = { x: 0, y: 0 };
    let raf = 0;
    let running = false;

    const tick = () => {
      const k = reduced ? 1 : 0.075;
      cur.x += (target.x - cur.x) * k;
      cur.y += (target.y - cur.y) * k;
      const h = el.offsetHeight || window.innerHeight;
      const p = Math.min(1, Math.max(0, window.scrollY / (h * 0.85)));
      progress.current = p;
      pointer.current.x = cur.x;
      pointer.current.y = cur.y;
      el.style.setProperty('--mx', cur.x.toFixed(4));
      el.style.setProperty('--my', cur.y.toFixed(4));
      el.style.setProperty('--p', p.toFixed(4));
      if (Math.abs(target.x - cur.x) > 0.0008 || Math.abs(target.y - cur.y) > 0.0008) {
        raf = requestAnimationFrame(tick);
      } else {
        running = false;
      }
    };
    const kick = () => {
      if (!running) { running = true; raf = requestAnimationFrame(tick); }
    };
    const onMove = (e) => {
      if (e.pointerType === 'touch') return; // touch: auto-motion + scroll only
      const r = el.getBoundingClientRect();
      target.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
      target.y = -((e.clientY - r.top) / r.height - 0.5) * 2;
      kick();
    };
    const onLeave = () => { target.x = 0; target.y = 0; kick(); };

    el.addEventListener('pointermove', onMove, { passive: true });
    el.addEventListener('pointerleave', onLeave);
    window.addEventListener('scroll', kick, { passive: true });
    window.addEventListener('resize', kick);
    kick();
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('scroll', kick);
      window.removeEventListener('resize', kick);
    };
  }, [reduced]);

  return (
    <section ref={ref} className={`hero intro-${introMode}`} id="top" aria-labelledby="hero-title">
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-liquid">
          <i className="blob b1" /><i className="blob b2" /><i className="blob b3" /><i className="blob b4" />
        </div>
        <div className="hero-glow" />
        <div className="hero-grain" />
        <span className="hero-orbit" />
      </div>

      <div className={`hero-object${ready ? ' is-ready' : ''}`} role="img" aria-label={t.hero.sculptureAria}>
        <div className="hero-poster" aria-hidden="true" />
        {webgl && load && (
          <SceneBoundary>
            <Suspense fallback={null}>
              <Scene
                pointer={pointer}
                progress={progress}
                active={active}
                reduced={reduced}
                initialQuality={quality}
                startAt={startAt}
                onReady={() => setReady(true)}
              />
            </Suspense>
          </SceneBoundary>
        )}
      </div>

      <div className="hero-meta">
        <span>{t.hero.eyebrow}</span>
      </div>

      <div className="hero-copy">
        <p className="kicker"><span className="dot" aria-hidden="true" />{t.hero.kicker}</p>
        <h1 id="hero-title" key={lang}><Rich text={t.hero.title} lines /></h1>
        <div className="hero-bottom">
          <p>{t.hero.intro}</p>
          <div className="hero-actions">
            <a href="#contact" className="btn btn-solid">
              {t.cta} <MoveUpRight size={16} aria-hidden="true" />
            </a>
            <a href="#work" className="btn btn-ghost">{t.hero.viewWork}</a>
          </div>
        </div>
      </div>

      <a className="scroll-cue" href="#work" tabIndex={-1} aria-hidden="true">
        <span>{t.hero.explore}</span>
        <span className="scroll-line" />
      </a>
      <div className="hero-index" aria-hidden="true">01 — 04</div>
    </section>
  );
}
