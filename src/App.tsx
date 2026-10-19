import SmoothScroll from './components/SmoothScroll'
import CursorLayer from './components/CursorLayer'
import Nav from './components/site/Nav'
import Hero from './components/site/Hero'
import Chapter from './components/site/Chapter'
import Contact from './components/site/Contact'
import Footer from './components/site/Footer'
import FilmStrip from './components/site/FilmStrip'
import Gallery from './components/ui/Gallery'
import Marquee from './components/ui/Marquee'
import { Reveal } from './components/ui/Reveal'
import { Bit, FilmFrame, LensRing } from './components/ui/Bits'
import { pillars, gallery, stats, testimonial } from './data/site'

const CAPABILITIES = [
  'Photography',
  'Cinematic Film',
  'Drone',
  'Live Streaming',
  'Podcasts',
  'Social Media',
  'Sponsorships',
  'Event Operations',
]

function Numbers() {
  return (
    <section className="relative border-t border-[var(--line)] px-5 py-20 md:px-10 md:py-24">
      <Bit className="right-8 top-8 hidden h-12 w-16 lg:block" delay={0.5} duration={11} opacity={0.16}>
        <FilmFrame className="h-full w-full" />
      </Bit>
      <div className="mx-auto grid max-w-[1200px] grid-cols-2 gap-8 md:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.06}>
            <div>
              <div className="font-display text-[clamp(2.4rem,5vw,3.6rem)] font-semibold leading-none tracking-[-0.03em] text-[var(--fg)]">
                {s.value}
              </div>
              <div className="mt-3 text-[13px] text-[var(--muted)]">{s.label}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function KindWords() {
  return (
    <section className="relative border-t border-[var(--line)] px-5 py-24 md:px-10 md:py-32">
      <Bit className="left-8 top-12 hidden h-16 w-16 lg:block" delay={0.4} duration={13} opacity={0.12}>
        <LensRing className="h-full w-full" />
      </Bit>
      <div className="mx-auto max-w-[900px] text-center">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--accent)]">
          Kind words
        </span>
        <p className="mt-6 font-display text-[clamp(1.5rem,3.2vw,2.4rem)] font-medium leading-[1.25] tracking-[-0.02em] text-[var(--fg)]">
          “{testimonial.quote}”
        </p>
        <p className="mt-6 text-[13px] text-[var(--muted)]">
          {testimonial.name} · {testimonial.role}, {testimonial.location}
        </p>
      </div>
    </section>
  )
}

export default function App() {
  return (
    <>
      <SmoothScroll />
      <div className="grain-overlay animate-grain" aria-hidden />

      <a
        href="#top"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-[var(--accent)] focus:px-4 focus:py-2 focus:text-sm focus:text-[var(--accent-ink)]"
      >
        Skip to content
      </a>

      <Nav />

      <main id="top" className="relative">
        <Hero />
        <Marquee items={CAPABILITIES} />
        {pillars.map((p, i) => (
          <Chapter key={p.id} pillar={p} flip={i % 2 === 1} />
        ))}
        <Gallery
          id="gallery"
          items={gallery}
          eyebrow="Gallery"
          title="Selected work, kept."
          intro="Matchdays, weddings and every occasion in between. Open any frame to view it full size."
          columns={3}
        />
        <Numbers />
        <KindWords />
        <Contact />
      </main>

      <Footer />
      <FilmStrip />
      <CursorLayer />
    </>
  )
}
