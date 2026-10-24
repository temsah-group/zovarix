# ZOVARIX — studio website

React + Vite site for ZOVARIX, an independent digital studio. It has a cinematic opening, an interactive 3D sculpture (Three.js + React Three Fiber), a bilingual English/Arabic interface with full RTL, and sections for Work, Services, Studio and Contact.

## Run locally

```sh
npm install        # run again after pulling these changes (new font packages)
npm run dev        # http://localhost:5173
npm run build      # production build → dist/
npm run preview    # serve the production build locally
```

Use Node 20.19+ or 22.12+ (required by Vite 8).

## Where to edit things

| What | File |
| --- | --- |
| All copy in both languages, projects, services, studio details, email | `src/content.js` |
| Colours, spacing, layout, animation timings | `src/style.css` (tokens at the top under `:root`) |
| 3D sculpture (“Strata” — sliced plates around a glowing core) | `src/three/Scene.jsx` (`PALETTE` and `SHAPE` at the top) |
| Opening sequence timing | `src/App.jsx` (`VEIL_MS`, `INTRO_MS`) and the hero keyframes in `style.css` |
| Fonts | `src/fonts.js`, self-hosted via @fontsource: Manrope, DM Sans and DM Mono, Instrument Serif for the accent words, and IBM Plex Sans Arabic |
| Page title, description and social-share tags | `index.html` (Arabic title and description are set from `content.js`) |

### Content formatting

In `src/content.js`, `\n` adds a line break and `*text*` marks the olive serif accent, for example `'We make\ndigital *matter.*'`.

### Projects

`projects` starts with the client work: Rasmetak, GHRNATA and the Asl real-estate app (a CSS mockup until screenshots are added). After them come sample projects marked `sample: true`, which show a “Sample” badge. Each project has:

- `category`: `'web' | 'mobile' | 'games'`. This drives the Work filters and the badges.
- `shots: { desktop, mobile }`: real screenshots shown in a browser and phone mockup. The files are in `public/work/`; replace them with new captures any time.
- `url` (optional): adds a “Live” badge and a “Visit website” button.
- `art`: picks one of the CSS-built artworks (`rasmetak`, `ghrnata`, `monolith`, `slowform`, `dusk`).
- `image`: put a file in `public/work/` and set `image: '/work/name.webp'` (plus `imageAlt`) to show a real image instead of the CSS artwork.
- `en` / `ar`: the bilingual case-study text shown in the project dialog.

To add a project, copy an existing object and edit it. The counters and filters update automatically.

## Behaviour notes

- **Opening:** the wordmark veil (~1.1 s) plays once per browser session, and the headline, copy and sculpture finish by about 2 s. Later visits in the same session use a shorter intro.
- **Pointer:** the sculpture tilts, a light follows the cursor and the hero copy has a slight parallax. This runs on mouse and pen only; touch devices get the automatic motion.
- **Scroll:** as the hero leaves, the copy lifts and fades, the sculpture sinks and turns, and the content sheet slides over it.
- **Reduced motion:** with `prefers-reduced-motion`, there is no veil, marquee, reveal or idle spin. The 3D scene renders only on demand.
- **Language:** the site uses `?lang=ar` or `?lang=en`, then the saved choice, then the browser language. It updates `<html lang dir>`, the title and the meta description.
- **Contact form:** it needs no backend. It opens the visitor's email app with the enquiry filled in. To use a form service (Formspree, Netlify Forms, your own API), replace the `mailto:` line in `ContactForm` in `src/components/Sections.jsx`.

## Performance

- The 3D stack is **lazy-loaded** in its own chunk (about 190 KB gzip), so the page text renders from about 84 KB gzip of JS.
- `LeanCanvas` registers only the three.js classes the scene uses. R3F's default `<Canvas>` bundles the whole library. If you add new objects to the scene, add their classes in `src/three/LeanCanvas.jsx`.
- No external HDR download: the environment lighting is generated locally.
- Quality adapts to the device. Phones and low-power devices get a lighter material and a lower pixel ratio, and desktops that render below about 40 fps switch down automatically. Rendering pauses while the hero is off-screen.
- Fonts are self-hosted, so the site makes no third-party requests.

## Before publishing

1. Replace the email in `src/content.js` (`site.email`) and add social links (`site.socials`).
2. Review the Rasmetak and GHRNATA case-study text, and optionally add real screenshots as `image`. Then replace or delete the sample projects.
3. In `index.html`, uncomment and fill `og:url` / `og:image` with the production domain, and add an `og-image.jpg` (1200×630) to `public/`.
4. Run `npm install && npm run build`, then deploy the `dist/` folder to any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages…). No server routing is needed because this is a single page with hash links.
5. Optional: connect the contact form to a form service, and add analytics or a cookie notice if your region requires one.
