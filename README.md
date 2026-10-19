# Lens & Legacy

A photography, film and event studio site: one studio landing page and **three
vertical pages** — Sports, Weddings, and Special Occasions & Events — each with its
own palette, type and layout.

---

## Quick start

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # typecheck + production build
npm run preview  # preview the build
```

## Pages

| URL | Page | Direction |
| --- | --- | --- |
| `/` | **Home** (the studio) | Paper + ink + cobalt, Bricolage Grotesque |
| `/?page=sports` | **Sports** | Dark navy + electric blue, Anton |
| `/?page=weddings` | **Weddings** | Ivory + dusty rose, Sentient serif |
| `/?page=events` | **Special Occasions & Events** | Stone + emerald, Cabinet Grotesk |

The home page chapters link into each vertical; each vertical's wordmark and
"All work" link return home. URLs are direct-linkable.

---

## The three verticals

| Page | Palette | Type | Character |
| --- | --- | --- | --- |
| **Sports** | `#080B14` · `#3B6CFF` | Anton + Satoshi | Cinematic, high-energy, matchday |
| **Weddings** | `#FAF7F2` · `#B4786A` | Sentient + Satoshi | Editorial, romantic, quiet |
| **Events** | `#F1F1EC` · `#0B5D45` | Cabinet Grotesk + Satoshi | Structured, polished, premium |

The home page uses a light-first theme with an optional dark mode (moon icon in the
nav). Each vertical page has a fixed theme of its own.

---

## Structure

```
src/
├─ App.tsx                  # router: ?page= → Home | Sports | Weddings | Events
├─ index.css                # tokens, fonts, utilities, theme classes
├─ data/
│  ├─ site.ts               # home content: brand, hero, pillars, gallery, stats
│  └─ pages.ts              # vertical content: hero, intro, services, gallery, CTA
├─ lib/
│  ├─ usePage.ts            # URL routing
│  ├─ theme.ts              # light/dark preference (home)
│  ├─ scroll.ts / gsap.ts   # Lenis + ScrollTrigger helpers
├─ pages/
│  ├─ Home.tsx
│  ├─ Sports.tsx
│  ├─ Weddings.tsx
│  └─ Events.tsx
└─ components/
   ├─ CursorLayer.tsx       # cursor light, dot and hover labels
   ├─ SmoothScroll.tsx      # Lenis ⇄ ScrollTrigger
   ├─ ThemeToggle.tsx       # light / dark (home)
   ├─ World.tsx             # the 3D camera stage
   ├─ site/                 # Nav, Hero, Chapter, Contact, Footer, FilmStrip,
   │                        # PageNav, PageFooter
   ├─ three/StudioCamera.tsx
   └─ ui/                   # Reveal, MaskText, Cta, Gallery, Marquee, Bits
```

### Theming

Each page defines the same CSS variable names under a theme class in
`src/index.css` (`.theme-sports`, `.theme-weddings`, `.theme-events`). `App.tsx`
adds the class to `<html>`, and components read the variables:

```tsx
<div className="bg-[var(--bg)] text-[var(--fg)] border-[var(--line)]">
  <h2 className="font-display">…</h2>
  <a className="bg-[var(--accent)] text-[var(--accent-ink)]">…</a>
</div>
```

The home page uses `:root` (light) and `[data-theme="dark"]` for its optional dark
mode. Vertical themes are defined after the dark block, so they always win.

---

## Editing content

- **Home:** `src/data/site.ts` — brand, hero, the three pillars, gallery, stats,
  testimonial.
- **Sports / Weddings / Events:** `src/data/pages.ts` — each page's hero, intro,
  services, stats, gallery, testimonial and CTA.
- **Home gallery:** the `gallery` array in `site.ts`.
- **Vertical galleries:** the `gallery` array inside each entry in `pages.ts`.

Images are `picsum.photos` placeholders. Replace the URLs with your own; recommended
ratios are portrait (4:5) for people, landscape (3:2) for events.

---

## The 3D

`components/World.tsx` renders a procedural camera (no model files) in a studio
rig. It is light chrome in the light theme and graphite in the dark theme, reacts to
the pointer and scroll, and is lazy-loaded so three.js stays out of the initial
bundle.

## Accessibility & performance

- Skip link, landmarks, alt text, visible focus, one-line button labels.
- Animation uses transform/opacity and respects `prefers-reduced-motion`.
- The 3D and vendor libraries are code-split; the main bundle is ~79 KB gzipped.
- `backdrop-filter` is limited to the nav and small overlays.

## Next steps

1. Replace the placeholder imagery with real work.
2. Wire the CTAs to a real contact form or booking flow.
3. Add individual project pages if you want a deeper case study per commission.
