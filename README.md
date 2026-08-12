# AEES Consulting Engineers — marketing site

Front-end for **AEES Consulting Engineers**, a civil and highway engineering
consultancy.

Design language: Apple **"Liquid Glass"** — translucent, layered, light-bending
surfaces floating over a slow aurora bed, on a warm light ground. Glass is the
*material*, not decoration: it carries floating chrome and cards, never running
body text.

The palette is warm stone neutrals plus a single terracotta accent. **There is
no blue anywhere in the system** — not in the type, the chrome, the aurora bed,
the shadows or the line work.

React 18 · Vite 5 · React Router 6 · Tailwind 3 · Framer Motion · lucide-react.
No back end — an Express API can be plugged into the contact form later.

---

## Setup

Requires **Node 18+**.

```bash
npm install
npm run dev        # http://localhost:5173
```

## Scripts

| Script                    | What it does                                                   |
| ------------------------- | -------------------------------------------------------------- |
| `npm run dev`             | Vite dev server with HMR                                        |
| `npm run build`           | Production build to `dist/`                                     |
| `npm run preview`         | Serve the production build locally                              |
| `npm run lint`            | ESLint (react, hooks, jsx-a11y), zero-warning policy            |
| `npm run format`          | Prettier across the repo, with Tailwind class sorting           |
| `npm run optimize:images` | Convert `src/assets/originals` → WebP in `src/assets/optimized` |

`optimize:images` accepts flags:

```bash
npm run optimize:images -- --widths 640,1280,1920 --quality 78
```

---

## Structure

```
index.html                 fonts, favicon, JSON-LD Organization schema
tailwind.config.js         ← ALL brand tokens (colour, glass, type, shape, motion)
scripts/optimize-images.mjs

src/
  main.jsx                 entry
  index.css                base layer + the glass utilities + the aurora bed
  lib/
    router.jsx             the single route table + <RootLayout/> + errorElement
    utils.js               cn, pagination, formatting, validators, map URLs
    icons.js               name → lucide component registry used by data files
  layouts/RootLayout.jsx   aurora bed + Header + Navbar + <Outlet/> + Footer
  components/
    Header.jsx             thin utility strip (scrolls away)
    Navbar.jsx             floating thin-glass pill, tightens + brightens on scroll
    Footer.jsx             one large read-tier glass panel
    Seo.jsx                per-route title / description / canonical / OG
    ScrollToTop.jsx        scroll reset + focus move to <main> on route change
    PageTransition.jsx     route-level spring settle, reduced-motion aware
    ui/                    the design-system primitives (see below)
    home/                  home page sections
    projects/              ProjectCard, ProjectFilters
    contact/               ContactForm
  pages/                   Home, About, Sectors, Projects, Contact, NotFound,
                           ErrorBoundaryPage
  data/                    ← ALL COPY LIVES HERE
  assets/originals         drop photography here
  assets/optimized         generated WebP output
```

### Routes

| Path        | Page                                   |
| ----------- | -------------------------------------- |
| `/`         | Home                                   |
| `/about`    | About Us                               |
| `/sectors`  | Sectors (12, paginated 4 at a time)    |
| `/projects` | Project register (filters sync to URL) |
| `/contact`  | Contact Us                             |
| `*`         | 404 — also used as the router fallback |

---

## Where to edit content

**Everything readable on the site lives in `src/data/`.** No component hardcodes
copy.

| File          | Controls                                                                              |
| ------------- | ------------------------------------------------------------------------------------- |
| `site.js`     | Brand, navigation, offices, contact channels, footer, trust chips                      |
| `seo.js`      | Per-route `<title>`, meta description, canonical path                                  |
| `home.js`     | Hero, stat strip, mandate, services, portfolio band, methodology, process, closing CTA |
| `about.js`    | Hero, founding story, timeline, leadership, disciplines, method pillars                |
| `sectors.js`  | The twelve sectors and their sub-discipline chip groups                                |
| `projects.js` | The project register plus the filter facets (service lines, modes, sort options)       |
| `contact.js`  | Contact intro, form field labels/hints, subject options, success copy                  |
| `notFound.js` | 404 and router-error copy                                                              |

**Adding a project:** append an object to `projects` in `src/data/projects.js`.
`service` must be one of `SERVICE_LINES` and `mode` one of `DELIVERY_MODES` in
the same file, or it will not be reachable through the filters. `lengthKm` may
be `null` for non-linear assignments.

**Adding a nav item:** add it to `navigation` in `src/data/site.js` *and* to the
route table in `src/lib/router.jsx`.

**Adding a map:** render `<MapEmbed query="Sector 62, Noida, India" title="…" />`.
It builds a keyless `maps.google.com/…&output=embed` URL — no API key, no
billing account.

---

## Retheming: the two files

- **`tailwind.config.js`** — colour, glass tokens, type scale, radii, shadows,
  motion easing and the drift keyframes.
- **`index.html`** — the Google Fonts `<link>`. The stacks lead with **SF Pro
  Display** / **SF Pro Text** / **SF Mono**, so Apple hardware renders in the
  real system faces; Inter Tight / Inter / IBM Plex Mono are the cross-platform
  fallbacks that actually get downloaded. Swap families there, then update
  `theme.extend.fontFamily` to match.

Glass intensity is tuned from four CSS variables at the top of `src/index.css`:

```css
--glass-thin-fill: rgba(255, 255, 255, 0.55);
--glass-thick-fill: rgba(255, 255, 255, 0.72);
--glass-blur-thin: 24px;
--glass-blur-thick: 32px;
```

---

## The material

Three tiers, all in `src/index.css`, all reachable through `<GlassPanel tier="…">`:

| Class / tier   | Fill        | Blur | Use for                                      |
| -------------- | ----------- | ---- | -------------------------------------------- |
| `.glass-thin`  | white 55%   | 24px | Navbar, chips, buttons, segmented controls   |
| `.glass-thick` | white 72%   | 32px | Hero panel, data bands, image frames         |
| `.glass-read`  | white 86%   | 32px | **Opacity floor** — any panel with body copy |

Plus three behaviours layered on top:

- `.glass-rim` — 1px gradient border, brighter top-left, faking a light-catch.
- `.glass-hover` — 2px lift with a rim brighten.
- `.liquid-sheen` — a specular highlight that travels across the control on
  hover, the way light moves over curved glass. On every button and every
  interactive card.

The bed is `<AuroraBackground />`, mounted once in `RootLayout`: four blurred
primary/accent/success blobs on 34–44s drift cycles over a dotted grid, fixed
and `pointer-events-none`. The glass samples it, so panels shift subtly as you
scroll. Hero art and the hero panel move at different rates for a shallow
parallax.

**Blur budget:** roughly a dozen `backdrop-filter` nodes are live at once, and
none of them sit on a long scrolling list — the project register cards use the
read tier, which is nearly opaque and cheap to composite.

---

## Colour and the fill/text split

This is the part that is easy to get wrong, so it is enforced in the tokens.

| Token         | Value     | On light | Role                                             |
| ------------- | --------- | -------- | ------------------------------------------------ |
| `ink`         | `#1C1917` | 17.0:1   | Headings, primary text                           |
| `body`        | `#44403C` | 9.9:1    | Body copy                                        |
| `meta`        | `#57534E` | 7.6:1    | Small labels, table meta                         |
| `muted`       | `#A8A29E` | 2.6:1    | **Decorative only** — icons, dividers            |
| `primary`     | `#332F2B` | 13.3:1   | Warm graphite: structure, figures, solid fills   |
| `accent`      | `#FF6B35` | 2.8:1    | **FILL ONLY** — never text                       |
| `accent-ink`  | `#C2410C` | 5.2:1    | Accent as text — links, eyebrows, active states  |
| `success`     | `#10B981` | 2.5:1    | **FILL ONLY**                                    |
| `success-ink` | `#047857` | 5.5:1    | Verified state as text                           |

Surface is `#FAF8F5`, surface-2 `#F3EFE9`, hairline `#EDE9E3` — all warm.

**The division of labour.** `primary` is a neutral warm graphite and carries
*structure*: solid controls, stat figures, icon tiles, the logo mark, focus
rings. `accent-ink` carries *interaction*: links, the active nav item, the
selected office, the hero keyword, every eyebrow. That is the Apple pattern —
neutral chrome, one vivid accent — and it keeps accent usage near 10%.

Text sitting **on** an accent fill is `ink` (6.4:1). White on `#FF6B35` is only
2.8:1, so it is never used — that is why primary buttons and the active
segmented-toggle segment carry dark text. The pressed/hover fill for a primary
button is `accent-ink`, a token, not a one-off hex.

The aurora bed is entirely warm — amber, rose, terracotta and gold — so the
glass never picks up a cold cast from what it is blurring.

---

## Design system primitives (`src/components/ui`)

`AuroraBackground` · `Badge` · `Button` · `Card` · `Chip` · `Container` ·
`Field` · `GlassPanel` · `Logo` · `MapEmbed` · `Pagination` · `Placeholder` ·
`Reveal` (+ `RevealGroup`, `RevealItem`, `DrawLine`) · `RoadLine` · `Section` ·
`SectionHeading` · `SegmentedToggle` · `StatCounter` · `StatusPill`

Shape: rounded-2xl/3xl on cards and panels, rounded-full on **every** control —
buttons, chips, badges, pagination, the segmented toggle, the search field, the
navbar itself. No square corners anywhere.

Motion: fade + 16–22px slide on a low-stiffness spring (damping 22–26, no
overshoot), staggered children, count-up figures, the sheen sweep on hover,
shallow parallax between the hero glass and the bed, and an animated dashed
carriageway line in the hero, the process row and the 404.

---

## Image slots

There is no photography in the repo yet. Every place a picture belongs renders a
`<Placeholder />` — a glass-framed box with a thin line-art mark (road, bridge,
cone, hard hat, clipboard, map pin, tunnel, survey tripod, portrait, chart) and a
small caption. Nothing is ever a broken `<img>`.

To fill a slot, pass `src` and `alt` to the same component; it keeps the glass
frame, radius and aspect ratio:

```jsx
import corridor from '@/assets/optimized/corridor-1536.webp';

<Placeholder src={corridor} alt="NH-44 corridor at dusk" ratio="16/9" />;
```

Slots currently in place:

- **Home** — hero image (4:5), two service cards (16:9 and 4:3)
- **About** — wide 21:9 banner, four leadership portraits (4:5)
- **Projects** — none, by design; the register is a record, not a gallery

---

## Readability, fallbacks and accessibility

Guardrails that are required for a glass UI, all implemented:

- **Opacity floor.** Dense copy never sits on thin glass — those panels use
  `.glass-read` (white 86%).
- **No `backdrop-filter` support** → `@supports not (…)` turns every glass
  surface solid white with a hairline border, so nothing becomes unreadable.
- **`prefers-reduced-transparency: reduce`** → glass becomes opaque, the
  specular rim is hidden, and the aurora blobs are removed entirely.
- **`prefers-reduced-motion: reduce`** → the bed freezes, the road dashes stop,
  and every reveal/page transition/count-up resolves instantly rather than being
  withheld. Handled both in CSS and per-component.
- Text is always solid — no translucent type anywhere.
- Semantic landmarks, a skip link, exactly one `<h1>` per page.
- On every route change the page scrolls to top and focus moves to `<main>`.
- Visible `:focus-visible` rings (primary, 2px, offset) on every control.
- 44px minimum touch targets; `aria-label` on all icon-only controls.
- The contact form validates on blur and on submit, with a focusable error
  summary that takes keyboard focus when submission fails.
- Filtering announces its result count through an `aria-live="polite"` region.
- Status is never colour-only — pills carry a text label beside the dot.
- Verified for zero horizontal overflow at 390 / 834 / 1440 px.

---

## Plugging in an API

`src/components/contact/ContactForm.jsx` currently validates, simulates a
round-trip and `console.log`s the payload. Replace the block marked
`// No API yet` with a `fetch` to your endpoint, keep the `submitting` and
`success` states, and surface a failure state alongside the existing error
summary.
