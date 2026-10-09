import { lazy, Suspense } from 'react'
import { useReducedMotion } from 'motion/react'
import { Aperture, ArrowUpRight } from '@phosphor-icons/react'
import {
  brand,
  nav,
  hero,
  CTA_PRIMARY,
  CTA_WORK,
  marqueeWords,
  studio,
  gallery,
  work,
  process,
  testimonials,
  footerLinks,
} from '../data/site'
import { MaskText, Reveal } from '../components/ui/Reveal'
import Cta from '../components/ui/Cta'
import Categories from '../components/ui/Categories'
import Gallery from '../components/ui/Gallery'

const KitScene = lazy(() =>
  Promise.all([import('../components/three/Stage'), import('../components/three/objects')]).then(
    ([stage, objects]) => ({
      default: function Kit() {
        return (
          <stage.Stage
            tone="light"
            scale={1.1}
            object={({ progress, pointer }) => (
              <objects.ChromeLens progress={progress} pointer={pointer} />
            )}
          />
        )
      },
    }),
  ),
)

/** Two stacked copies of a word that roll upward on hover. */
function Roll({ children, className = '' }: { children: string; className?: string }) {
  return (
    <span
      className={`relative inline-block h-[1em] overflow-hidden align-bottom leading-none ${className}`}
    >
      <span className="block transition-transform duration-[600ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-translate-y-1/2">
        <span className="block">{children}</span>
        <span className="block" aria-hidden>
          {children}
        </span>
      </span>
    </span>
  )
}

function Rec({ label = 'REC' }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.24em] text-[var(--muted)]">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-70" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
      </span>
      {label}
    </span>
  )
}

/** Thin crop / registration marks in the four corners of a framed element. */
function Corners({ tone = 'light', className = '' }: { tone?: 'light' | 'dark'; className?: string }) {
  const c = tone === 'light' ? 'border-white/45' : 'border-black/30'
  const m = `absolute h-3.5 w-3.5 ${c}`
  return (
    <span aria-hidden className={`pointer-events-none absolute inset-0 ${className}`}>
      <span className={`${m} left-0 top-0 border-l border-t`} />
      <span className={`${m} right-0 top-0 border-r border-t`} />
      <span className={`${m} bottom-0 left-0 border-b border-l`} />
      <span className={`${m} bottom-0 right-0 border-b border-r`} />
    </span>
  )
}

/** Film-strip focus scale, a technical motif from the reference. */
function Ruler() {
  const ticks = [-2, -1, 0, 1, 2]
  return (
    <div aria-hidden className="flex items-end gap-5">
      <div className="flex items-end gap-3">
        {ticks.map((t) => (
          <span key={t} className="flex flex-col items-center gap-1">
            <span className="font-mono text-[10px] text-[var(--faint)]">{t}</span>
            <span
              className={`w-px ${t === 0 ? 'h-3.5 bg-[var(--accent)]' : 'h-2 bg-[var(--line-strong)]'}`}
            />
          </span>
        ))}
      </div>
      <span className="font-mono text-[10px] tracking-[0.18em] text-[var(--faint)]">FRAME</span>
    </div>
  )
}

/** Big uppercase kinetic band. */
function Band({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const reduce = useReducedMotion()
  const group = (k: string) => (
    <div key={k} className="flex shrink-0 items-center">
      {items.map((it, i) => (
        <span key={`${k}-${i}`} className="flex items-center">
          <span className="px-6 font-display text-[clamp(2rem,6vw,5rem)] font-medium uppercase leading-none tracking-[-0.02em] text-[var(--fg)] md:px-10">
            {it}
          </span>
          <span className="font-mono text-xs text-[var(--accent)]">/</span>
        </span>
      ))}
    </div>
  )
  return (
    <div className="relative overflow-hidden border-y border-[var(--line)] py-6 md:py-10">
      <div
        className="flex w-max animate-marquee will-change-transform"
        style={reduce ? { animation: 'none' } : reverse ? { animationDirection: 'reverse' } : undefined}
      >
        {group('a')}
        {group('b')}
      </div>
    </div>
  )
}

const SPECS = [
  { k: 'A', v: '185' },
  { k: 'C', v: '105' },
  { k: 'SHUTTER', v: '1/250' },
  { k: 'ISO', v: '400' },
  { k: 'F', v: '1.4' },
]

const PHILOSOPHY = [
  { n: '[ 001 ]', t: 'Composition', s: 'Only motion', b: 'We compose for the frame we will keep, not the one we will take. Intent before the shutter.' },
  { n: '[ 002 ]', t: 'Raw', s: 'Authentic moments', b: 'Nothing staged, nothing rehearsed. Real rooms, real light, real people, the honest version.' },
  { n: '[ 003 ]', t: 'Space', s: 'Sound & atmosphere', b: 'A film is edited in the gaps. We grade for mood and cut for feeling, not for volume.' },
]

/** 02, Reel. Dark cinematic editorial in the language of a call sheet. */
export default function Reel() {
  return (
    <>
      {/* top bar */}
      <header className="fixed inset-x-0 top-0 z-40 border-b border-[var(--line)] bg-[var(--bg)]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-6 px-5 md:px-10">
          <a href="#top" className="group flex items-center gap-2.5" aria-label={`${brand.name} home`}>
            <Aperture weight="bold" className="h-5 w-5 text-[var(--accent)]" />
            <span className="font-display text-[15px] font-medium uppercase tracking-[0.02em] text-[var(--fg)]">
              Lens <span className="text-[var(--accent)]">&amp;</span> Legacy
            </span>
          </a>
          <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
            {nav.map((n) => (
              <a
                key={n.label}
                href={n.href}
                className="group font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--muted)] transition-colors hover:text-[var(--fg)]"
              >
                <Roll>{n.label}</Roll>
              </a>
            ))}
          </nav>
          <Cta href="#contact" icon={false} className="!py-2.5 !pl-5 !text-[12px] !uppercase">
            {CTA_PRIMARY}
          </Cta>
        </div>
      </header>

      <main>
        {/* hero */}
        <section className="relative min-h-[100dvh] overflow-hidden pt-16">
          <div aria-hidden className="texture-grid pointer-events-none absolute inset-0 opacity-40" />
          <div className="relative mx-auto grid max-w-[1440px] grid-cols-1 gap-10 px-5 pb-16 pt-16 md:grid-cols-12 md:items-center md:px-10 md:pt-24">
            <div className="md:col-span-7">
              <div className="flex flex-wrap items-center gap-4 font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--muted)]">
                <Rec />
                <span>{hero.eyebrow}</span>
              </div>
              <MaskText
                as="h1"
                lines={['Every frame', 'becomes', 'a legacy.']}
                delay={0.15}
                className="mt-7 font-display text-[clamp(2.8rem,8.5vw,7rem)] font-medium uppercase leading-[0.9] tracking-[-0.03em] text-[var(--fg)] text-edge"
              />
              <Reveal delay={0.6}>
                <p className="mt-8 max-w-[44ch] text-[15px] leading-relaxed text-[var(--muted)]">
                  {hero.sub}
                </p>
              </Reveal>
              <Reveal delay={0.75}>
                <div className="mt-9 flex flex-wrap items-center gap-3">
                  <Cta href="#contact" variant="primary" magnetic>
                    {CTA_PRIMARY}
                  </Cta>
                  <Cta href="#gallery" variant="ghost" arrow="right">
                    {CTA_WORK}
                  </Cta>
                </div>
              </Reveal>
              <Reveal delay={0.9}>
                <div className="mt-12 flex flex-wrap gap-x-6 gap-y-2 border-t border-[var(--line)] pt-5 font-mono text-[11px] tracking-[0.16em] text-[var(--faint)]">
                  <span>EST. 2012</span>
                  <span>{brand.locations.join(' · ').toUpperCase()}</span>
                  <span>GLOBAL PRODUCTION</span>
                </div>
              </Reveal>
            </div>

            {/* media panel */}
            <Reveal delay={0.35} className="md:col-span-5">
              <div className="relative overflow-hidden rounded-lg ring-1 ring-[var(--line-strong)]">
                <img
                  src={work[1].image}
                  alt=""
                  className="aspect-[4/5] w-full object-cover"
                />
                <Corners tone="light" className="m-2.5" />
                <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
                  <Rec />
                  <span className="font-mono text-[10px] tracking-[0.16em] text-white/80">00:02:14:08</span>
                </div>
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/80">
                    Northbound / Arc’teryx
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.16em] text-white/60">4K · 24FPS</span>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <Band items={marqueeWords} />

        {/* about + figures */}
        <section id="studio" className="px-5 py-24 md:px-10 md:py-36">
          <div className="mx-auto max-w-[1440px]">
            <div className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--accent)]">
              <span>About</span>
              <span className="h-px w-12 bg-[var(--line-strong)]" />
              <span className="text-[var(--faint)]">The studio</span>
            </div>
            <Reveal delay={0.05}>
              <h2 className="mt-6 max-w-[16ch] font-display text-[clamp(2.2rem,6vw,4.6rem)] font-medium uppercase leading-[0.92] tracking-[-0.03em]">
                <span className="text-[var(--fg)]">Our capture</span>{' '}
                <span className="text-[var(--faint)]">story.</span>
              </h2>
            </Reveal>
            <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-12">
              <Reveal className="md:col-span-6 md:col-start-7">
                <p className="text-[16px] leading-relaxed text-[var(--muted)]">{studio.body}</p>
                <p className="mt-6 font-mono text-[12px] uppercase tracking-[0.14em] text-[var(--accent)]">
                  {studio.signature}
                </p>
              </Reveal>
            </div>

            <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-[var(--line)] bg-[var(--line)] md:grid-cols-4">
              {studio.stats.map((s, i) => (
                <Reveal key={s.label} delay={i * 0.06} className="bg-[var(--bg)]">
                  <div className="p-6 md:p-8">
                    <div className="font-display text-[clamp(2rem,4vw,3rem)] font-medium uppercase leading-none text-[var(--fg)]">
                      {s.value}
                    </div>
                    <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--muted)]">
                      {s.label}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* what we do */}
        <Categories
          id="services"
          eyebrow="What we do"
          title="Three things, done properly."
          intro="Sport, weddings and every occasion in between, covered end to end by one crew, in photo, film and live events."
          className="border-t border-[var(--line)]"
        />

        {/* gallery */}
        <Gallery
          id="gallery"
          items={gallery}
          eyebrow="Gallery"
          title="The archive."
          intro="Every frame we've kept, from matchday to the last dance."
          columns={4}
          action={
            <Cta href="#contact" variant="ghost" arrow="right">
              {CTA_WORK}
            </Cta>
          }
        />

        {/* the kit, 3D */}
        <section className="relative overflow-hidden border-t border-[var(--line)]">
          <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-10 px-5 py-24 md:grid-cols-12 md:px-10 md:py-36">
            <div className="md:col-span-5">
              <div className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--accent)]">
                <span>The kit</span>
              </div>
              <h2 className="mt-6 font-display text-[clamp(2rem,4.5vw,3.4rem)] font-medium uppercase leading-[0.94] tracking-[-0.03em] text-[var(--fg)]">
                Glass we
                <br />
                trust.
              </h2>
              <p className="mt-7 max-w-[44ch] text-[15px] leading-relaxed text-[var(--muted)]">
                A small, deliberate kit. Fast primes, cinema bodies and a crew that knows them by
                feel, so the day never waits for the gear.
              </p>
              <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-[var(--line)] bg-[var(--line)] sm:grid-cols-5">
                {SPECS.map((s) => (
                  <div key={s.k} className="bg-[var(--bg)] p-4">
                    <dt className="font-mono text-[10px] tracking-[0.18em] text-[var(--faint)]">{s.k}</dt>
                    <dd className="mt-2 font-mono text-lg text-[var(--fg)]">{s.v}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-8">
                <Ruler />
              </div>
            </div>
            <div className="relative md:col-span-6 md:col-start-7">
              <div className="relative h-[46vh] min-h-[320px] w-full">
                <Suspense fallback={null}>
                  <KitScene />
                </Suspense>
              </div>
            </div>
          </div>
        </section>

        {/* philosophy */}
        <section className="border-t border-[var(--line)] px-5 py-24 md:px-10 md:py-36">
          <div className="mx-auto max-w-[1440px]">
            <div className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--accent)]">
              <span>Frame philosophy</span>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
              {PHILOSOPHY.map((p, i) => (
                <Reveal key={p.t} delay={i * 0.08}>
                  <div className="border-t border-[var(--line-strong)] pt-5">
                    <span className="font-mono text-[11px] tracking-[0.16em] text-[var(--faint)]">
                      {p.n}
                    </span>
                    <h3 className="mt-5 font-display text-[clamp(1.6rem,3vw,2.2rem)] font-medium uppercase tracking-[-0.01em] text-[var(--fg)]">
                      {p.t}
                    </h3>
                    <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--accent)]">
                      {p.s}
                    </p>
                    <p className="mt-4 max-w-[36ch] text-[14px] leading-relaxed text-[var(--muted)]">
                      {p.b}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* process timeline */}
        <section className="border-t border-[var(--line)] px-5 py-24 md:px-10 md:py-36">
          <div className="mx-auto max-w-[1440px]">
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.4rem)] font-medium uppercase leading-[0.94] tracking-[-0.03em] text-[var(--fg)]">
              Captured motion
            </h2>
            <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-8">
              {process.map((p, i) => (
                <Reveal key={p.step} delay={i * 0.08}>
                  <div className="relative border-t border-[var(--line)] pt-5">
                    <span className="absolute -top-[3px] left-0 h-[5px] w-[5px] rounded-full bg-[var(--accent)]" />
                    <span className="font-mono text-[11px] text-[var(--accent)]">{p.step}</span>
                    <h3 className="mt-5 font-display text-[1.3rem] font-medium uppercase tracking-[0.01em] text-[var(--fg)]">
                      {p.title}
                    </h3>
                    <p className="mt-3 max-w-[34ch] text-[13px] leading-relaxed text-[var(--muted)]">
                      {p.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* testimonial */}
        <section className="border-t border-[var(--line)] px-5 py-24 md:px-10 md:py-36">
          <div className="mx-auto max-w-[1100px]">
            <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--accent)]">
              Testimonial
            </span>
            <p className="mt-8 font-display text-[clamp(1.7rem,4vw,3rem)] font-medium uppercase leading-[1.08] tracking-[-0.02em] text-[var(--fg)]">
              {testimonials[0].quote}
            </p>
            <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--muted)]">
              {testimonials[0].name} · {testimonials[0].role}, {testimonials[0].location}
            </p>
          </div>
        </section>

        {/* closing */}
        <section id="contact" className="border-t border-[var(--line)] px-5 py-24 md:px-10 md:py-36">
          <div className="mx-auto max-w-[1440px]">
            <MaskText
              as="h2"
              lines={['Shape your', 'vision into', 'reality.']}
              className="font-display text-[clamp(2.6rem,8vw,6.5rem)] font-medium uppercase leading-[0.9] tracking-[-0.03em] text-[var(--fg)]"
            />
            <div className="mt-12 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <p className="max-w-[46ch] text-[15px] leading-relaxed text-[var(--muted)]">
                From first call to final cut, we shape films and frames that resonate, without
                unnecessary noise.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Cta href={`mailto:${brand.email}`} variant="primary" magnetic>
                  {CTA_PRIMARY}
                </Cta>
                <a
                  href={`mailto:${brand.email}`}
                  className="font-mono text-[12px] tracking-[0.08em] text-[var(--muted)] hover:text-[var(--fg)]"
                >
                  {brand.email}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* footer */}
      <footer className="border-t border-[var(--line)] px-5 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-[1440px]">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <div>
              <span className="font-display text-[clamp(1.6rem,3.5vw,2.6rem)] font-medium uppercase tracking-[-0.02em] text-[var(--fg)]">
                Lens <span className="text-[var(--accent)]">&amp;</span> Legacy
              </span>
              <p className="mt-4 max-w-[32ch] font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--faint)]">
                {brand.tagline} · {brand.locations.join(' / ')}
              </p>
            </div>
            <div className="flex flex-wrap gap-x-10 gap-y-2">
              {footerLinks.flatMap((c) => c.links).map((l, i) => (
                <a
                  key={`${l}-${i}`}
                  href="#top"
                  className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--muted)] hover:text-[var(--fg)]"
                >
                  /{String(i + 1).padStart(2, '0')} {l}
                </a>
              ))}
            </div>
          </div>
          <div className="mt-12 flex flex-col gap-3 border-t border-[var(--line)] pt-6 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--faint)] md:flex-row md:items-center md:justify-between">
            <span>© {new Date().getFullYear()} {brand.name}. All rights reserved.</span>
            <a href="#top" className="inline-flex items-center gap-2 hover:text-[var(--muted)]">
              Back to top <ArrowUpRight weight="bold" className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </footer>
    </>
  )
}
