import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import Rich from './Rich.jsx';
import { categories, projects } from '../content.js';
import { useReveal } from '../lib/hooks.js';

const pad = (n, lang) => {
  const s = String(n).padStart(2, '0');
  return lang === 'ar' ? s.replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[d]) : s;
};
export const projectName = (project, lang) => (lang === 'ar' && project.nameAr) || project.name;
const catLabel = (id, lang) => categories.find((c) => c.id === id)?.[lang] ?? id;

/** Project artwork: a real image when `project.image` is set, otherwise CSS-built art. */
export function ProjectArt({ project, lang, index, total }) {
  const p = project[lang];
  return (
    <div className={`art art-${project.art}`}>
      {project.shots?.phones ? (
        <div className="art-scene phones-scene" aria-hidden="true">
          {project.shots.phones.slice(0, 3).map((src, i) => (
            <div className={`pshot pshot-${i}`} key={src}>
              <img src={src} alt="" loading="lazy" decoding="async" />
            </div>
          ))}
        </div>
      ) : project.shots ? (
        <div className="art-scene shot-scene" aria-hidden="true">
          <div className="browser shot-browser">
            <div className="browser-bar" dir="ltr"><i /><i /><i /><span>{project.url?.replace(/^https?:\/\//, '').replace(/\/$/, '')}</span></div>
            <img src={project.shots.desktop} alt="" loading="lazy" decoding="async" />
          </div>
          {project.shots.mobile && (
            <div className="shot-phone">
              <img src={project.shots.mobile} alt="" loading="lazy" decoding="async" />
            </div>
          )}
        </div>
      ) : project.image ? (
        <img src={project.image} alt={project.imageAlt?.[lang] || ''} loading="lazy" decoding="async" style={project.focus ? { objectPosition: project.focus } : undefined} />
      ) : (
        <div className="art-scene" aria-hidden="true">
          {project.symbol && <span className="art-symbol">{project.symbol}</span>}
          {project.art === 'rasmetak' && (
            <>
              <div className="browser browser-light">
                <div className="browser-bar" dir="ltr"><i /><i /><i /><span>rasmetak.com</span></div>
                <div className="browser-body rm-body">
                  <div className="rm-head"><b /><b /><b className="short" /></div>
                  <div className="rm-grid">
                    <span className="paint p1" /><span className="paint p2" /><span className="paint p3" />
                  </div>
                </div>
              </div>
              <div className="frame"><span className="paint p4" /></div>
            </>
          )}
          {project.art === 'asl' && (
            <>
              <div className="asl-phone asl-back">
                <div className="asl-map">
                  <i className="road r1" /><i className="road r2" /><i className="road r3" />
                  <i className="pin pin1" /><i className="pin pin2" /><i className="pin pin3" /><i className="pin pin4" />
                </div>
              </div>
              <div className="asl-phone asl-front" dir="rtl">
                <div className="asl-top"><b>أصل</b><span /></div>
                <div className="asl-search"><span /></div>
                <div className="asl-chips"><i className="on" /><i /><i /></div>
                <div className="asl-card">
                  <div className="asl-photo"><span className="asl-house" /><em /></div>
                  <div className="asl-info"><b /><i /><span /></div>
                </div>
                <div className="asl-card asl-card-sm">
                  <div className="asl-photo asl-photo-2" />
                  <div className="asl-info"><b /><i /></div>
                </div>
                <div className="asl-nav"><i className="on" /><i /><i /><i /></div>
              </div>
            </>
          )}
          {project.art === 'ghrnata' && (
            <div className="browser">
              <div className="browser-bar" dir="ltr"><i /><i /><i /><span>ghrnata.com</span></div>
              <div className="browser-body gh-body">
                <div className="gh-window"><span className="gh-view" /><span className="gh-shutter" /></div>
                <div className="gh-swatches">
                  <span className="sw sw-al" /><span className="sw sw-pvc" /><span className="sw sw-sh" /><span className="sw sw-wd" />
                </div>
              </div>
            </div>
          )}
          {project.art === 'monolith' && (
            <>
              <span className="block block-one" />
              <span className="block block-two" />
            </>
          )}
          {project.art === 'slowform' && (
            <div className="phone">
              <div className="phone-top" dir="ltr">9:41 <span>•••</span></div>
              <div className="phone-mark">s.</div>
              <div className="phone-sun" />
              <div className="phone-lines" />
              <div className="phone-bottom" dir="ltr">TAKE A MOMENT</div>
            </div>
          )}
          {project.art === 'dusk' && (
            <>
              <span className="moon" />
              <span className="dune dune-one" />
              <span className="dune dune-two" />
            </>
          )}
        </div>
      )}
      {index != null && (
        <span className="art-index" aria-hidden="true">{pad(index + 1, lang)} / {pad(total, lang)}</span>
      )}
      <span className="art-caption" aria-hidden="true">{p.tagline}</span>
    </div>
  );
}

function ProjectDialog({ t, lang, project, onClose, onNext }) {
  const ref = useRef(null);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (!d.open) d.showModal?.();
    document.documentElement.classList.add('dialog-open');
    d.querySelector('.dialog-close')?.focus();
    return () => document.documentElement.classList.remove('dialog-open');
  }, [project?.id]);

  const p = project[lang];
  const tp = t.project;
  return (
    <dialog
      ref={ref}
      className="project-dialog"
      aria-labelledby="dialog-title"
      onCancel={(e) => { e.preventDefault(); onClose(); }}
      onClick={(e) => { if (e.target === ref.current) onClose(); }}
    >
      <div className="dialog-inner" key={project.id}>
        <div className="dialog-bar">
          <span className="badge">{catLabel(project.category, lang)}</span>
          <button type="button" className="dialog-close" onClick={onClose} aria-label={tp.close}>
            <X aria-hidden="true" />
          </button>
        </div>
        <ProjectArt project={project} lang={lang} />
        <div className="dialog-body">
          <p className="project-type">{p.type}</p>
          <h3 id="dialog-title">{projectName(project, lang)}</h3>
          <p className="dialog-lead">{p.summary}</p>
          <dl className="dialog-facts">
            <div><dt>{tp.category}</dt><dd>{catLabel(project.category, lang)}</dd></div>
            <div><dt>{tp.platform}</dt><dd>{p.platform}</dd></div>
            {project.year && <div><dt>{tp.year}</dt><dd>{project.year}</dd></div>}
          </dl>
          <div className="dialog-cols">
            <section><h4>{tp.challenge}</h4><p>{p.challenge}</p></section>
            <section><h4>{tp.approach}</h4><p>{p.approach}</p></section>
          </div>
          <h4>{tp.deliverables}</h4>
          <ul className="chips">{p.deliverables.map((d) => <li key={d}>{d}</li>)}</ul>
          {project.sample && <p className="sample-note">{tp.sample}</p>}
          <div className="dialog-actions">
            {project.url && (
              <a className="btn btn-solid" href={project.url} target="_blank" rel="noopener noreferrer">
                {t.work.visit} <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            )}
            <a className={`btn ${project.url ? 'btn-ghost' : 'btn-solid'}`} href="#contact" onClick={onClose}>
              {tp.enquire} <ArrowUpRight size={16} aria-hidden="true" />
            </a>
            <button type="button" className="btn btn-ghost" onClick={onNext}>{tp.next} {lang === 'ar' ? '←' : '→'}</button>
          </div>
        </div>
      </div>
    </dialog>
  );
}

export default function Work({ t, lang }) {
  const [filter, setFilter] = useState('all');
  const [openId, setOpenId] = useState(null);
  const lastTrigger = useRef(null);
  useReveal([filter, lang]);

  const counts = useMemo(() => {
    const c = { all: projects.length };
    categories.forEach((cat) => { c[cat.id] = projects.filter((p) => p.category === cat.id).length; });
    return c;
  }, []);
  const featured = projects.filter((p) => p.category !== 'games');
  const games = projects.filter((p) => p.category === 'games');
  const list = filter === 'all' ? featured : filter === 'games' ? [] : featured.filter((p) => p.category === filter);
  const showGames = (filter === 'all' || filter === 'games') && games.length > 0;
  const openProject = projects.find((p) => p.id === openId);

  const open = (id, e) => { lastTrigger.current = e.currentTarget; setOpenId(id); };
  const close = () => {
    setOpenId(null);
    // return focus to the card that opened the dialog
    requestAnimationFrame(() => lastTrigger.current?.focus());
  };
  const next = () => {
    const i = projects.findIndex((p) => p.id === openId);
    setOpenId(projects[(i + 1) % projects.length].id);
  };

  const filters = [{ id: 'all', label: t.work.all }, ...categories.map((c) => ({ id: c.id, label: c[lang] }))];

  return (
    <section className="work section-pad" id="work" aria-labelledby="work-title">
      <div className="section-head" data-reveal>
        <span className="eyebrow">{t.work.eyebrow} <i aria-hidden="true">✳</i></span>
        <span className="micro">{t.work.micro}</span>
      </div>
      <h2 id="work-title" data-reveal><span className="h-mask"><Rich text={t.work.title} /></span></h2>

      <div className="filters" role="group" aria-label={t.work.filterLabel} data-reveal>
        {filters.map((f) => (
          <button
            key={f.id}
            type="button"
            className="filter"
            aria-pressed={filter === f.id}
            onClick={() => setFilter(f.id)}
          >
            {f.label}
            <sup>{pad(counts[f.id], lang)}</sup>
          </button>
        ))}
      </div>

      <div className="projects" aria-live="polite">
        {list.length === 0 && !showGames && <p className="empty">{t.work.empty}</p>}
        {list.map((project, i) => {
          const p = project[lang];
          return (
            <article className={`project project-${project.art}`} key={project.id} data-reveal>
              <button
                type="button"
                className="project-link"
                onClick={(e) => open(project.id, e)}
                aria-haspopup="dialog"
                aria-label={`${t.work.view}: ${projectName(project, lang)} — ${catLabel(project.category, lang)}`}
              >
                <ProjectArt project={project} lang={lang} index={i} total={list.length} />
                <span className="art-arrow" aria-hidden="true"><ArrowUpRight /></span>
              </button>
              <div className="project-meta">
                <div>
                  <span className="project-type">
                    <span className="badge">{catLabel(project.category, lang)}</span>
                    {project.url && <span className="badge badge-live">{t.work.live}</span>}
                    {project.sample && <span className="badge badge-sample">{t.work.sampleTag}</span>}
                    {project.badge && <span className="badge badge-hot">{project.badge}</span>}
                    {project.year}
                  </span>
                  <h3>{projectName(project, lang)}</h3>
                  <p className="project-summary">{p.tagline}</p>
                </div>
                <span className="project-open" aria-hidden="true">
                  {t.work.view} <ArrowUpRight size={15} />
                </span>
              </div>
            </article>
          );
        })}
        {filter === 'all' && list.length % 2 === 1 && (
          <article className="project project-cta" data-reveal>
            <a className="cta-card" href="#contact">
              <span className="cta-title"><Rich text={t.work.ctaTitle} /></span>
              <span className="cta-text">{t.work.ctaText} <ArrowUpRight size={18} aria-hidden="true" /></span>
            </a>
          </article>
        )}
      </div>

      {showGames && (
        <div className="games-block" data-reveal>
          <div className="games-head">
            <div>
              <span className="eyebrow">{t.work.gamesEyebrow} <i aria-hidden="true">✳</i></span>
              <h3>{t.work.gamesTitle}</h3>
              <p>{t.work.gamesText}</p>
            </div>
            <a className="btn btn-ghost" href="https://goldenstreamers.com/games" target="_blank" rel="noopener noreferrer">
              {t.work.gamesLink} <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
          <ul className="games-grid">
            {games.map((g, gi) => (
              <li key={g.id} data-reveal style={{ '--i': gi % 4 }}>
                <button
                  type="button"
                  className="game-tile"
                  onClick={(e) => open(g.id, e)}
                  aria-haspopup="dialog"
                  aria-label={`${t.work.view}: ${projectName(g, lang)}`}
                >
                  <span className="game-cover">
                    <img src={g.image} alt="" loading="lazy" decoding="async" style={g.focus ? { objectPosition: g.focus } : undefined} />
                    {g.badge && <span className="game-badge">{g.badge}</span>}
                  </span>
                  <span className="game-name">{projectName(g, lang)}</span>
                  <span className="game-genre">{g.genre?.[lang]}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {projects.some((p) => p.sample) && <p className="sample-note" data-reveal>{t.work.sample}</p>}

      {openProject && <ProjectDialog t={t} lang={lang} project={openProject} onClose={close} onNext={next} />}
    </section>
  );
}
