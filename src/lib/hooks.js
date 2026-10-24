import { useEffect, useState } from 'react';

const mq = (q) => (typeof window !== 'undefined' && window.matchMedia ? window.matchMedia(q) : null);

/** Tracks a CSS media query. */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => !!mq(query)?.matches);
  useEffect(() => {
    const m = mq(query);
    if (!m) return;
    const on = () => setMatches(m.matches);
    on();
    m.addEventListener('change', on);
    return () => m.removeEventListener('change', on);
  }, [query]);
  return matches;
}

export const useReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)');

/** Safe storage helpers — storage can throw in private mode or embedded previews. */
export const storage = {
  get(key, area = 'localStorage') {
    try { return window[area].getItem(key); } catch { return null; }
  },
  set(key, value, area = 'localStorage') {
    try { window[area].setItem(key, value); } catch { /* ignore */ }
  },
};

/** Initial language: ?lang= → saved choice → browser language → English. */
export function getInitialLang() {
  try {
    const q = new URLSearchParams(window.location.search).get('lang');
    if (q === 'ar' || q === 'en') return q;
  } catch { /* ignore */ }
  const saved = storage.get('zovarix-lang');
  if (saved === 'ar' || saved === 'en') return saved;
  const nav = (navigator.languages?.[0] || navigator.language || '').toLowerCase();
  return nav.startsWith('ar') ? 'ar' : 'en';
}

/**
 * Adds `is-visible` to every `[data-reveal]` element once it scrolls into view.
 * Re-runs when `deps` change (e.g. after a language switch re-renders content).
 */
export function useReveal(deps = []) {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll('[data-reveal]:not(.is-visible)'));
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/** Returns the id of the section currently in the middle of the viewport. */
export function useActiveSection(ids) {
  const [active, setActive] = useState('');
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, [ids]);
  return active;
}

/** Cheap WebGL capability check (no context is kept alive). */
export function hasWebGL() {
  try {
    const c = document.createElement('canvas');
    const gl = c.getContext('webgl2') || c.getContext('webgl');
    if (!gl) return false;
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return true;
  } catch {
    return false;
  }
}

/** 'high' on capable desktops, 'lite' on phones / low-power devices. */
export function detectQuality() {
  const coarse = !!mq('(pointer: coarse)')?.matches;
  const small = !!mq('(max-width: 760px)')?.matches;
  const cores = navigator.hardwareConcurrency || 4;
  const mem = navigator.deviceMemory || 8;
  const saveData = navigator.connection?.saveData;
  if (saveData || coarse || small || cores <= 4 || mem <= 4) return 'lite';
  return 'high';
}
