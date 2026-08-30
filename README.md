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
    img/*.svg           30 generated abstract sector images + brand mark
    logo/*.jpeg         The original logo files supplied by the client

build/
  build.js              Regenerates the inner pages from index.html's header/footer
  bodies/*.html         Page bodies (edit these, then run `node build/build.js`)
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

There were no photographs available, so every image is a **generated SVG** —
gradient meshes, topographic contours and sector-specific line geometry (bridges, cranes,
turbines, solar arrays, dams, skylines, networks, terraces). They are vector, tiny,
offline, and unique to this project.

They are designed to be swapped for photography with no code changes: each is referenced
as an ordinary `<img src="assets/img/…">`. Replace the file (keeping the name, or updating
the `src`) and the layout, masks and hover animations continue to work.

To regenerate or add variants, the generator used is a small Node script; the
palettes and geometry types are at the top of it (`copper`, `slate`, `earth`, `forest`,
`dusk`, `sand` × `bridge`, `towers`, `turbines`, `cranes`, `road`, `solar`, `dam`,
`terraces`, `network`, `skyline`).

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
| Footprint | Interactive orthographic globe: animated pins, connection arcs, linked country list and readout |
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
geometric-sans pairing, the generated sector artwork, the interactive globe, the scroll-driven
project rail, and the trilingual EN/ES/FR system.
