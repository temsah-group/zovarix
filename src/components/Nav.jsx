import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Globe2, Menu, MoveUpRight, X } from 'lucide-react';
import { site } from '../content.js';

export const SECTIONS = ['work', 'services', 'studio', 'contact'];

export default function Nav({ t, lang, onToggleLang, active }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const panelRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  // Mobile menu: lock scroll, focus first link, close on Escape / resize to desktop.
  useEffect(() => {
    if (!open) return;
    document.documentElement.classList.add('menu-open');
    panelRef.current?.querySelector('a')?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') { setOpen(false); buttonRef.current?.focus(); }
      if (e.key === 'Tab' && panelRef.current) {
        // keep focus inside header (button + panel) while open
        const nodes = [buttonRef.current, ...panelRef.current.querySelectorAll('a,button')];
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    const mq = window.matchMedia('(min-width: 861px)');
    const onMq = () => mq.matches && setOpen(false);
    window.addEventListener('keydown', onKey);
    mq.addEventListener('change', onMq);
    return () => {
      document.documentElement.classList.remove('menu-open');
      window.removeEventListener('keydown', onKey);
      mq.removeEventListener('change', onMq);
    };
  }, [open]);

  const langButton = (className) => (
    <button type="button" className={className} onClick={onToggleLang} aria-label={t.langSwitch.aria}>
      <Globe2 size={14} aria-hidden="true" />
      <span lang={lang === 'ar' ? 'en' : 'ar'}>{t.langSwitch.label}</span>
    </button>
  );

  return (
    <header className={`nav${scrolled ? ' is-scrolled' : ''}${open ? ' is-open' : ''}`}>
      <a className="brand" href="#top" aria-label={`${site.name} — home`}>
        ZOVARIX<span aria-hidden="true">®</span>
      </a>
      <nav className="navlinks" aria-label={t.menu.label}>
        {SECTIONS.map((id) => (
          <a href={`#${id}`} key={id} aria-current={active === id ? 'true' : undefined}>{t.nav[id]}</a>
        ))}
      </nav>
      <div className="navright">
        {langButton('lang')}
        <a className="nav-cta" href="#contact">
          {t.cta} <MoveUpRight size={14} aria-hidden="true" />
        </a>
        <button
          ref={buttonRef}
          type="button"
          className="menu-button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? t.menu.close : t.menu.open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      <div id="mobile-menu" className="mobile-menu" ref={panelRef} hidden={!open}>
        <nav aria-label={t.menu.label}>
          {SECTIONS.map((id, i) => (
            <a href={`#${id}`} key={id} onClick={() => setOpen(false)} style={{ '--i': i }}>
              <span>{t.nav[id]}</span>
              <ArrowUpRight aria-hidden="true" />
            </a>
          ))}
        </nav>
        <div className="mobile-menu-foot">
          {langButton('lang lang-mobile')}
          <a href="#contact" className="nav-cta" onClick={() => setOpen(false)}>{t.cta}</a>
        </div>
      </div>
    </header>
  );
}
