# Obras Cullera — corporate website

A static, dependency-free corporate site for **Obras Cullera — International Business & Development**,
built as a hybrid of the two reference sites supplied by the client (Meridiam and Mubadala).

---

## 1. How to view it

No build step and no server is required — the site is plain HTML/CSS/JS.

```
site/index.html          ← open this in a browser
```

For the best result (and because some browsers restrict `file://`), serve the folder:

```bash
cd site
python -m http.server 8080      # then open http://localhost:8080
```

Google Fonts are loaded from the network; the site degrades to system fonts offline.

---

## 2. What is in the box

```
site/
  index.html            Home
  who-we-are.html       Story, milestones, values & governance, footprint
  what-we-do.html       Four platforms, project lifecycle, PPP & development finance
  projects.html         Filterable portfolio (9 mandates)
  our-impact.html       Impact framework, UN SDG alignment, programmes, governance
  news.html             Newsroom & insights
  contact.html          Enquiry form, offices, careers, suppliers, footprint map
  assets/
    css/main.css        Complete design system
    js/main.js          All interaction (no libraries)
    js/i18n.js          Spanish + French dictionaries
    js/globe.js         WebGL satellite Earth (see 5b)
    img/*.webp          30 optimised photographs (see 4) + logo-mark.svg
    logo/*.jpeg         The original logo files supplied by the client

build/
  build.js              Regenerates the inner pages from index.html's header/footer
  bodies/*.html         Page bodies (edit these, then run `node build/build.js`)
  optimise-images.js    images/*.png  ->  sized, compressed WebP
  gen-earth-textures.js Blue Marble sources -> packed WebP textures
  gen-art.js            Generator for the original placeholder SVG artwork (superseded)

images/                 Source PNGs — working files, not committed
```

### Editing pages
`index.html` is the source of truth for the header, mobile menu and footer.
Change it, then run `node build/build.js` to push those changes into the other six pages.
Page-specific content lives in `build/bodies/<page>.html`.

---

## 3. Languages

The site ships in **English, Spanish and French**, switchable from the header (and
remembered in `localStorage`; first visit follows the browser language).

- English lives in the HTML itself.
- `assets/js/i18n.js` holds the Spanish and French dictionaries, keyed by `data-i18n`.
- Any key missing from a dictionary falls back to the English in the markup, so a
  partial translation can never break the page.

To change a piece of copy, edit the English in the HTML **and** the matching key in
`i18n.js`. Arabic (as on Meridiam) can be added later by adding an `AR` dictionary plus
`dir="rtl"` handling.

---

## 4. Imagery

The site uses photographic imagery, delivered as **WebP**.

Source files (large PNGs from the image generator) live in `images/` and are
**not committed** — they are working files. The pipeline that produces what ships:

```bash
npm install sharp            # dev-only; the site itself has no dependencies
node build/optimise-images.js
```

That reads `images/*.png` and writes sized, compressed WebP into
`site/assets/img/`. Three tiers:

| Tier | Size | Used for |
|---|---|---|
| Full-bleed | 1536×1024, q72 | hero slides, page heroes, CTA bands |
| Card | 1200×800, q78 | project cards, news cards, accordion figures |
| Portrait | 768×1024, q78 | `art-energy`, `art-mining` — only ever shown in a portrait frame |

Result: **71.6 MB of PNG became 3.52 MB of WebP — 95% smaller**, averaging
~120 kB per image.

Loading behaviour:
- Every image carries intrinsic `width`/`height` so nothing shifts as it loads.
- Everything below the fold is `loading="lazy"`.
- The first hero slide is `fetchpriority="high"`; slides 2–4 hold their URL in
  `data-src` and are fetched by the carousel just before they are shown, so the
  first paint costs one 67 kB image instead of four.

To replace a picture, drop a new PNG into `images/` under the same name and
re-run the two commands above. `build/rewrite-img-tags.js` was the one-off that
converted the markup from SVG to WebP; it does not need running again.

---

## 5. Animation & interaction inventory

| Area | Behaviour |
|---|---|
| Load | Preloader with logo stroke-draw and progress bar |
| Navigation | Full-screen curtain wipe between pages (5 panels, staggered) |
| Header | Shrinks on scroll, hides on scroll-down, blurred glass background |
| Hero | 4-slide cinematic carousel, Ken Burns drift, timed progress bars, live particle-network canvas that reacts to the pointer |
| Text | Line-by-line clip reveal on headings, mask reveal on lead paragraphs |
| Sections | IntersectionObserver reveals with per-element stagger |
| Numbers | Eased count-up, locale-aware thousands separators |
| Pillars | Image zoom + description expand on hover (always visible on touch) |
| Platforms | Accordion with grid-template-rows transition and image reveal |
| Footprint | Interactive 3D globe on canvas: real land geometry, directional lighting, depth shading, atmosphere, animated pins and great-circle routes, drag to rotate with inertia |
| Theme | Dark / light toggle in the header, remembered per visitor, following the OS until they choose |
| Projects | Scroll-driven horizontal rail (desktop) / snap-scroll (mobile); sector filter |
| Cursor | Custom ring + dot with magnetic buttons (desktop only) |
| Misc | Scroll progress bar, marquee ticker, parallax bands, back-to-top, form validation |

**Accessibility & robustness**
- Full `prefers-reduced-motion` support — every animation collapses to a static state.
- Reveal states are scoped to `html.js`, so with JavaScript disabled the page renders
  fully visible instead of blank.
- A 6-second failsafe reveals anything the observer missed.
- Keyboard focus rings, ARIA labels, semantic landmarks, breadcrumbs.
- Verified with no horizontal overflow from 485 px upward.

---

## 5b. The Earth

`site/assets/js/globe.js` renders a satellite view of Earth in **raw WebGL** —
no Three.js, no framework. A single full-screen triangle; the fragment shader
ray-traces the sphere and shades it per pixel:

- **Surface** from NASA Blue Marble colour imagery
- **Day/night terminator** — soft-edged Lambert, with city lights emerging only
  once the sun has genuinely set on that longitude
- **Cloud deck** sampled at its own longitude offset, so it drifts slowly
  relative to the surface; it also casts a light shadow on the ground below
- **Specular glint** off water, masked to the oceans
- **Atmosphere** — Rayleigh-ish scattering thickening towards the limb, plus an
  outer halo brightest on the sunlit side
- **Space** with sparse stars, faded out before the canvas edge so the square
  never shows

Rotation is one revolution every four minutes — an orbital drift rather than a
spinning logo. Drag to rotate, with inertia; hovering a country in the list
turns the globe to face it. Markers sit on a 2D overlay canvas that shares the
shader's projection, which also keeps hit-testing simple.

**Textures** (`build/gen-earth-textures.js`) pack three greyscale maps into the
channels of one image, so the page makes two requests, not four:

| File | Size | Contents |
|---|---|---|
| `earth-day-2048.webp` | 167 kB | colour surface (desktop) |
| `earth-day-1024.webp` | 36 kB | colour surface (phones, low-DPR) |
| `earth-mask-1024.webp` | 89 kB | R = city lights · G = cloud · B = ocean mask |

256 kB on desktop, 125 kB on a phone — and **nothing is fetched and no GL
context is created until the section is within 250 px of the viewport**. The
render loop pauses whenever it scrolls out of view. Without WebGL it degrades to
a static shaded disc.

To regenerate:

```bash
npm install --no-save sharp
node build/gen-earth-textures.js     # reads images/earth/*
```

Source imagery is NASA Blue Marble / Visible Earth (public domain), staged in
`images/earth/` and not committed.

---

## 5c. Dark and light themes

The palette is entirely CSS custom properties. `:root` holds the dark values,
`:root[data-theme="light"]` overrides them, and the theme is set on the root
element by an inline script in `<head>` before first paint, so there is no flash.
Choice is remembered in `localStorage`; until the visitor chooses, the site
follows `prefers-color-scheme`.

Blocks that sit on top of photography — the hero, page heroes, pillar cards,
project and rail figures, the CTA band heading and the un-stuck header — keep a
dark token set in **both** themes, because the scrims over the images stay dark
either way. The header switches to the page palette as soon as it becomes
sticky over content.

The globe reads its colours from CSS variables too, and repaints them when the
theme changes.

---

## 6. Content status — please read before go-live

All copy, figures, project names, dates and news items are **invented placeholder content**
written for this launch build, as agreed (the client had no content available). Nothing here
should be published as fact. Before go-live, replace:

- every statistic (portfolio value, project counts, jobs, percentages, dates);
- the project list and their technical facts;
- the news articles;
- office addresses and e-mail addresses;
- the ISO / certification claims and the impact-framework commitments.

The two "note strips" on the Projects, Impact and News pages already say on the page itself
that the figures are indicative — remove those strips once real data is in.

The contact and newsletter forms are **front-end only**: they validate and confirm, but send
nothing. They need to be wired to a mailbox or form service before launch.

---

## 7. How the two reference sites were used

**From Meridiam** — editorial rigour: a purpose-first mandate statement, four "impact
domains", a hard statistics band, explicit SDG reporting, a restrained palette with a
single accent, generous whitespace, and multilingual delivery.

**From Mubadala** — cinematic scale: a rotating full-bleed hero with captions and progress
bars, the expandable "business platforms" accordion, the global-reach section built around
a country count, big confident section headings, and a news grid that reads like a newsroom.

**What is ours** — the copper-on-near-black identity taken from the OC mark, the serif /
geometric-sans pairing, the interactive globe, the scroll-driven
project rail, and the trilingual EN/ES/FR system.
