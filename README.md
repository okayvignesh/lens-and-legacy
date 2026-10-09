# Lens & Legacy, Art Directions

A premium landing experience for a photography, film and live-events studio,
presented as **five complete art directions** plus a **design document**. Every
direction is a full, responsive landing page built on one shared system, flip
between them live with the control pinned to the bottom of the screen.

---

## Quick start

```bash
npm install
npm run dev      # http://localhost:5173  → opens the design document
npm run build    # typecheck + production build
npm run preview  # preview the build
```

## Routes

| URL | Screen |
| --- | --- |
| `/` | **01, Aurora** (the default direction) |
| `/?v=aurora` | **01, Aurora** (dark · glass · lit camera) |
| `/?v=reel` | **02, Reel** (dark · cinematic editorial) |
| `/?v=chrome` | **03, Chrome Precision** (light · technical) |
| `/?v=nocturne` | **04, Nocturne** (dark · immersive) |
| `/?v=atelier` | **05, Atelier** (light · editorial portfolio) |
| `/?v=doc` | Design document (not shown in the UI) |

The floating switcher at the bottom of every screen jumps between the directions,
and the URL updates so any direction is directly linkable. The design document is
still available at `/?v=doc`, but it is deliberately hidden from the interface.

---

## The five directions

| # | Direction | Family | Palette | Type | Motion |
| --- | --- | --- | --- | --- | --- |
| 01 | **Aurora** | Modern premium / glass | off-black + spring mint | Clash Display / Satoshi | 6/10 |
| 02 | **Reel** | Cinematic / editorial | near-black + film red | Panchang / Satoshi | 7/10 |
| 03 | **Chrome Precision** | Technical product | silver + signal red | Switzer / Switzer (+ mono) | 6/10 |
| 04 | **Nocturne** | Immersive narrative | ocean-ink + ice cyan | Cabinet Grotesk / Satoshi | 9/10 |
| 05 | **Atelier** | Editorial portfolio | bone + near-black + cream | Switzer / General Sans (+ Boska italic) | 5/10 |

Directions 02 (Reel) and 05 (Atelier) take their cues from Framer references the
studio supplied, a cinematic call-sheet editorial, and an editorial portfolio.

Each direction has its own page in the design document (`/`), with concept notes,
palette swatches, type pairing, motion intensity and signature moves.

---

## Architecture

```
src/
├─ App.tsx                  # router: ?v= → direction or doc, sets the theme class
├─ index.css                # tokens, fonts, material utilities, theme classes
├─ data/site.ts             # ← ALL content (edit this)
├─ lib/
│  ├─ themes.ts             # metadata for the five directions (drives the doc)
│  ├─ useVariant.ts         # URL-driven routing
│  └─ gsap.ts / scroll.ts   # ScrollTrigger + Lenis helpers
├─ doc/DesignDoc.tsx        # the design document
├─ variants/
│  ├─ Aurora.tsx            # 01, dark glass + lit camera
│  ├─ Reel.tsx              # 02, cinematic editorial
│  ├─ Chrome.tsx            # 03, technical product
│  ├─ Nocturne.tsx          # 04, immersive narrative
│  └─ Atelier.tsx           # 05, editorial portfolio
└─ components/
   ├─ VariantSwitcher.tsx   # the floating control
   ├─ CursorLayer.tsx       # global cursor light + hover labels
   ├─ SmoothScroll.tsx      # Lenis ⇄ ScrollTrigger bridge
   ├─ ui/                   # Reveal, MaskText, Cta, Categories, Gallery, Marquee
   └─ three/                # Stage + procedural 3D (camera, lens, aperture)
```

### How theming works

Each direction defines the **same CSS variable names** in `src/index.css` under a
theme class. `App.tsx` sets that class on `<html>`, and components read the
variables, so one component reads correctly in every direction:

```tsx
<div className="bg-[var(--bg)] text-[var(--fg)] border-[var(--line)]">
  <h2 className="font-display">…</h2>
  <p className="text-[var(--muted)]">…</p>
  <a className="bg-[var(--accent)] text-[var(--accent-ink)]">…</a>
</div>
```

**Material utilities** (also in `index.css`):

- `glass`translucent fill + hairline ring + inner light. Safe on scrolling content.
- `glass-blur`the same plus real `backdrop-filter`. Use only on fixed/sticky/hero surfaces.
- `texture` / `texture-grid`a fine dot / line grid at low opacity, used instead of decorative gradients.
- `CursorLayer` (`components/CursorLayer.tsx`)a theme-tinted light pool that follows the pointer, plus a glass label pill over any element carrying `data-cursor="Label"`. The native cursor is never hidden.

Adding a seventh direction = one theme class in `index.css` + one entry in
`lib/themes.ts` + one file in `variants/`.

---

## Where to put your content

**Everything editable lives in [`src/data/site.ts`](src/data/site.ts)**, brand,
nav, hero, the three pillars, services, projects, the gallery, testimonials, FAQs
and footer. All five directions read from it, so a change propagates everywhere.

### The three pillars

The studio runs on three core pillars, defined once as `categories` and reused by
every direction's "What we do" section (via the shared `Categories` component):

1. **Sports**, media, events, digital, sponsorships, event operations
2. **Weddings**, photography, cinematic films, candid, pre-wedding, celebrations
3. **Special Occasions & Events**, engagements, naming ceremonies, corporate
   events, podcasts, schools, colleges, institutions

`gallery` holds the full archive shown by the shared `Gallery` component (a
masonry with a keyboard-accessible lightbox), which every direction includes.

### Imagery

The directions use `picsum.photos` placeholders with descriptive seeds. Replace
each `https://picsum.photos/...` URL with your own imagery (local import or CDN).
Recommended ratios: `studio.image` 4:5, `services[].image` 7:5, `work[].image` 3:4.

---

## The 3D

Everything is procedural, there are no model files to download.

- **Aurora**, a lit mirrorless camera (`components/three/StudioCamera.tsx`).
- **Reel / Chrome**, a machined lens (`components/three/objects.tsx` → `ChromeLens`).
- **Nocturne**, a glass aperture (`objects.tsx` → `GlassAperture`).

All are lit by a shared studio rig in `components/three/Stage.tsx`, react to the
pointer and the page scroll, and are code-split so three.js only loads for the
direction you open.

## Accessibility & performance

- Skip link, semantic landmarks, visible focus rings, one-line button labels.
- All animation runs on `transform` / `opacity` and collapses under
  `prefers-reduced-motion`.
- Each direction is its own lazy chunk; the 3D sits in a further chunk.
- Film grain is a fixed `pointer-events-none` overlay, never on scrolling content.
- `backdrop-filter` is confined to the nav and hero surfaces.

## Next steps

1. Replace copy and imagery in `src/data/site.ts`.
2. Pick a direction (or keep all five and A/B them).
3. Wire a contact form to a real endpoint (the current directions link to `mailto:`).
4. Add a Journal/blog route and an individual project template if needed.
