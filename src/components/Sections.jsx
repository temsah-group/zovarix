import { useState } from 'react';
import { ArrowUpRight, Send } from 'lucide-react';
import Rich from './Rich.jsx';
import { site } from '../content.js';

export function Marquee({ items }) {
  const row = items.map((item, i) => (
    <span className="marquee-item" key={i}>{item}<i aria-hidden="true">✳</i></span>
  ));
  return (
    <div className="marquee" aria-label={items.join(' · ')} role="img">
      <div className="marquee-track" aria-hidden="true">
        <div className="marquee-group">{row}</div>
        <div className="marquee-group">{row}</div>
      </div>
    </div>
  );
}

export function Services({ t }) {
  const s = t.services;
  return (
    <section className="services section-pad" id="services" aria-labelledby="services-title">
      <div className="section-head" data-reveal>
        <span className="eyebrow">{s.eyebrow} <i aria-hidden="true">✳</i></span>
        <span className="micro" dir="ltr">02 / 04</span>
      </div>
      <h2 id="services-title" data-reveal><Rich text={s.title} /></h2>

      <ul className="service-list">
        {s.list.map((item) => (
          <li className="service-row" key={item.n} data-reveal>
            <span className="service-n">{item.n}</span>
            <div className="service-main">
              <h3>{item.name}</h3>
              <p>{item.detail}</p>
            </div>
            <ul className="chips chips-dark">
              {item.items.map((x) => <li key={x}>{x}</li>)}
            </ul>
            <ArrowUpRight className="service-arrow" aria-hidden="true" />
          </li>
        ))}
      </ul>

      <div className="process" data-reveal>
        <h3 className="process-title">{s.processTitle}</h3>
        <ol>
          {s.process.map(([name, text], i) => (
            <li key={name} style={{ '--i': i }}>
              <span className="process-step" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <strong>{name}</strong>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Studio({ t }) {
  const s = t.studio;
  return (
    <section className="studio section-pad" id="studio" aria-labelledby="studio-title">
      <div className="section-head" data-reveal>
        <span className="eyebrow">{s.eyebrow} <i aria-hidden="true">✳</i></span>
        <span className="micro" dir="ltr">03 / 04</span>
      </div>
      <div className="studio-grid">
        <h2 id="studio-title" data-reveal><Rich text={s.title} /></h2>
        <div className="studio-aside" data-reveal>
          <div className="studio-mark" aria-hidden="true">Z<span>®</span></div>
          <p>{s.text}</p>
          <span className="studio-location">{s.location}</span>
        </div>
      </div>
      <ul className="principles">
        {s.principles.map(([title, text], i) => (
          <li key={title} data-reveal style={{ '--i': i }}>
            <span aria-hidden="true">✳</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function ContactForm({ t }) {
  const f = t.contact.form;
  const [status, setStatus] = useState('idle'); // idle | invalid | sent
  const [type, setType] = useState(f.types[0]);

  const onSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      setStatus('invalid');
      form.querySelector(':invalid')?.focus();
      return;
    }
    const d = new FormData(form);
    // No backend required: compose the enquiry in the visitor's email app.
    // To use a form service instead (Formspree, Netlify Forms…), POST `d` here.
    const subject = `${d.get('type')} — ${d.get('name')}`;
    const body = [
      `${f.name}: ${d.get('name')}`,
      `${f.email}: ${d.get('email')}`,
      `${f.type}: ${d.get('type')}`,
      `${f.budget}: ${d.get('budget')}`,
      '',
      d.get('message'),
    ].join('\n');
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus('sent');
  };

  return (
    <form className={`contact-form${status === 'invalid' ? ' show-errors' : ''}`} onSubmit={onSubmit} noValidate data-reveal>
      <fieldset className="field-types">
        <legend>{f.type}</legend>
        <div className="type-pills">
          {f.types.map((x) => (
            <label key={x} className="pill">
              <input type="radio" name="type" value={x} checked={type === x} onChange={() => setType(x)} />
              <span>{x}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <div className="field">
        <label htmlFor="cf-name">{f.name}</label>
        <input id="cf-name" name="name" autoComplete="name" required />
      </div>
      <div className="field">
        <label htmlFor="cf-email">{f.email}</label>
        <input id="cf-email" name="email" type="email" autoComplete="email" dir="ltr" required />
      </div>
      <div className="field">
        <label htmlFor="cf-budget">{f.budget}</label>
        <select id="cf-budget" name="budget" defaultValue={f.budgets[0]}>
          {f.budgets.map((b) => <option key={b}>{b}</option>)}
        </select>
      </div>
      <div className="field field-wide">
        <label htmlFor="cf-message">{f.message}</label>
        <textarea id="cf-message" name="message" rows={4} required aria-describedby="cf-hint" />
        <small id="cf-hint">{f.messageHint}</small>
      </div>
      <div className="form-foot">
        <button type="submit" className="btn btn-solid">
          {f.submit} <Send size={15} aria-hidden="true" />
        </button>
        <p className="form-status" role="status" aria-live="polite">
          {status === 'invalid' && f.required}
          {status === 'sent' && <>{f.sent} <a href={`mailto:${site.email}`}>{site.email}</a>.</>}
        </p>
      </div>
    </form>
  );
}

export function Contact({ t, lang }) {
  const c = t.contact;
  const socials = site.socials.filter((s) => s.href);
  return (
    <section className="contact section-pad" id="contact" aria-labelledby="contact-title">
      <div className="section-head" data-reveal>
        <span className="eyebrow">{c.eyebrow} <i aria-hidden="true">✳</i></span>
        <span className="micro" dir="ltr">04 / 04</span>
      </div>
      <h2 id="contact-title" data-reveal><Rich text={c.title} /></h2>
      <div className="contact-grid">
        <div className="contact-side" data-reveal>
          <p className="contact-lead">{c.lead}</p>
          <span className="micro">{c.orEmail}</span>
          <a className="email-link" href={`mailto:${site.email}`} dir="ltr">
            {site.email}<ArrowUpRight aria-hidden="true" />
          </a>
          {socials.length > 0 && (
            <ul className="socials">
              {socials.map((s) => (
                <li key={s.label}><a href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a></li>
              ))}
            </ul>
          )}
        </div>
        <ContactForm t={t} key={lang} />
      </div>
      <footer className="footer-bottom">
        <a className="brand" href="#top" aria-label={`${site.name} — home`}>ZOVARIX<span aria-hidden="true">®</span></a>
        <span>{t.footer.tagline}</span>
        <span dir="ltr">© {site.name} {new Date().getFullYear()}</span>
        <a href="#top" className="back-top">{t.footer.top}</a>
      </footer>
    </section>
  );
}
