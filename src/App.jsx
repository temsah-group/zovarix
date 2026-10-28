import { useEffect, useLayoutEffect, useState } from 'react';
import { copy, site } from './content.js';
import { getInitialLang, storage, useActiveSection, useReducedMotion, useReveal } from './lib/hooks.js';
import Nav, { SECTIONS } from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import Work from './components/Work.jsx';
import { Contact, Marquee, Services, Studio } from './components/Sections.jsx';

/*
 * Opening sequence (≈2 s total):
 *   0.00–1.15 s  veil: wordmark + drawing line, then the veil lifts
 *   0.75–2.00 s  hero: headline lines rise, copy + meta fade in, sculpture unwinds
 * The full veil plays once per browser session; later visits use a short intro.
 * With prefers-reduced-motion there is no veil and no movement.
 */
const VEIL_MS = 1150;
const INTRO_MS = 2100;

export default function App() {
  const reduced = useReducedMotion();
  const [lang, setLang] = useState(getInitialLang);
  const [introMode, setIntroMode] = useState(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return 'done';
    return storage.get('brand-intro', 'sessionStorage') ? 'short' : 'full';
  });
  const [veil, setVeil] = useState(introMode === 'full');
  const t = copy[lang];
  const active = useActiveSection(SECTIONS);
  useReveal([lang]);

  // Keep <html lang/dir>, title and description in sync with the language.
  useLayoutEffect(() => {
    const html = document.documentElement;
    html.lang = lang;
    html.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.title = t.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta.description);
    storage.set('brand-lang', lang);
  }, [lang, t]);

  // Magnetic hover for buttons (mouse/pen only, off with reduced motion).
  useEffect(() => {
    if (reduced || !window.matchMedia?.('(pointer: fine)').matches) return;
    const SEL = '.btn, .nav-cta, .filter';
    let current = null;
    const reset = (el) => { if (el) el.style.transform = ''; };
    const onMove = (e) => {
      const el = e.target.closest?.(SEL);
      if (el !== current) { reset(current); current = el; }
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) / r.width;
      const y = (e.clientY - (r.top + r.height / 2)) / r.height;
      el.style.transform = `translate(${(x * 8).toFixed(2)}px, ${(y * 6).toFixed(2)}px)`;
    };
    const onOut = (e) => { if (current && !current.contains(e.relatedTarget)) { reset(current); current = null; } };
    document.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerout', onOut, { passive: true });
    return () => {
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerout', onOut);
      reset(current);
    };
  }, [reduced]);

  useEffect(() => {
    storage.set('brand-intro', '1', 'sessionStorage');
    const v = setTimeout(() => setVeil(false), VEIL_MS);
    const d = setTimeout(() => setIntroMode('done'), introMode === 'full' ? INTRO_MS + 300 : 1200);
    return () => { clearTimeout(v); clearTimeout(d); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <a className="skip-link" href="#work">{t.skip}</a>
      {veil && (
        <div className="intro-veil" aria-hidden="true">
          <div className="veil-mark">
            {site.name.split('').map((ch, i) => <span key={i} style={{ '--i': i }}>{ch}</span>)}
          </div>
          <span className="veil-line" />
        </div>
      )}
      <Nav t={t} lang={lang} active={active} onToggleLang={() => setLang((l) => (l === 'ar' ? 'en' : 'ar'))} />
      <main className={lang === 'ar' ? 'is-rtl' : ''}>
        <Hero t={t} lang={lang} reduced={reduced} introMode={introMode} />
        <div className="sheet">
          <Marquee items={t.marquee} />
          <Work t={t} lang={lang} />
          <Services t={t} />
          <Studio t={t} />
          <Contact t={t} lang={lang} />
        </div>
      </main>
    </>
  );
}
