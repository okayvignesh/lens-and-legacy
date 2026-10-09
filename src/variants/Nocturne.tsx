import { lazy, Suspense, useRef, type ReactNode } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { Aperture, ArrowUp } from '@phosphor-icons/react'
import {
  brand,
  nav,
  hero,
  CTA_PRIMARY,
  CTA_WORK,
  marqueeWords,
  studio,
  services,
  work,
  gallery,
  testimonials,
  footerLinks,
} from '../data/site'
import { MaskText, Reveal } from '../components/ui/Reveal'
import Cta from '../components/ui/Cta'
import Categories from '../components/ui/Categories'
import Gallery from '../components/ui/Gallery'

/**
 * The heavy 3D rig is code-split and loaded alongside its object, so three.js
 * stays out of the initial bundle. The two modules resolve together before the
 * Scene mounts, keeping the hero light on slow connections.
 */
const Scene = lazy(() =>
  Promise.all([import('../components/three/Stage'), import('../components/three/objects')]).then(
    ([stage, objects]) => {
      const Stage = stage.Stage
      const GlassAperture = objects.GlassAperture
      return {
        default: function GlassScene() {
          return (
            <Stage
              tone="cool"
              scale={1.1}
              object={({ progress, pointer }) => (
                <GlassAperture progress={progress} pointer={pointer} />
              )}
            />
          )
        },
      }
    },
  ),
)

type Panel = {
  n: string
  kicker: string
  title: string
  body: string
  image: string
}

/** Four scroll chapters, drawn from services and selected work imagery. */
const PANELS: Panel[] = [
  {
    n: '01',
    kicker: services[0].tags.join(' · '),
    title: services[0].title,
    body: services[0].blurb,
    image: services[0].image,
  },
  {
    n: '02',
    kicker: services[1].tags.join(' · '),
    title: services[1].title,
    body: services[1].blurb,
    image: services[1].image,
  },
  {
    n: '03',
    kicker: work[1].category,
    title: work[1].title,
    body: `Selected work, ${work[1].year}`,
    image: work[1].image,
  },
  {
    n: '04',
    kicker: work[5].category,
    title: work[5].title,
    body: `Selected work, ${work[5].year}`,
    image: work[5].image,
  },
]

function Kicker({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.32em] text-[var(--accent)]">
      <span className="h-1 w-1 rounded-full bg-[var(--accent)]" />
      {children}
    </span>
  )
}

/** 04, Nocturne. An immersive, cinematic night-narrative direction. */
export default function Nocturne() {
  return (
    <>
      <TopBar />
      <main>
        <Hero />
        <Statement />
        <section id="chapters" aria-label="Selected chapters">
          {PANELS.map((panel) => (
            <Chapter key={panel.n} panel={panel} />
          ))}
        </section>
        <Gallery
          id="gallery"
          items={gallery}
          eyebrow="Gallery"
          title="The archive, in low light."
          intro="Nine frames pulled from the seasons behind us."
          columns={3}
          action={
            <Cta href="#contact" variant="ghost" arrow="right">
              {CTA_WORK}
            </Cta>
          }
        />
        <Categories
          id="services"
          eyebrow="What we do"
          title="Three things we do properly."
          intro="Sport, weddings and every occasion in between, covered end to end by one crew, in photo, film and live events."
        />
        <Testimonial />
        <ClosingCta />
      </main>
      <FooterBlock />
    </>
  )
}

function TopBar() {
  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[var(--bg)] to-transparent"
      />
      <div className="relative mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-5 py-4 md:px-10 md:py-6">
        <a href="#top" className="flex items-center gap-2.5" aria-label={`${brand.name} home`}>
          <Aperture weight="bold" className="h-5 w-5 text-[var(--accent)]" />
          <span className="font-display text-[15px] font-medium tracking-tight text-[var(--fg)]">
            Lens <span className="text-[var(--accent)]">&amp;</span> Legacy
          </span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {nav.slice(0, 3).map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="rounded-full px-4 py-2 text-[13px] text-[var(--muted)] transition-colors duration-300 hover:text-[var(--fg)]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <Cta href="#contact" variant="ghost" icon={false} className="!py-2.5 !pl-5 !pr-5 !text-[13px]">
            {CTA_PRIMARY}
          </Cta>
        </div>
        <a
          href="#contact"
          className="text-[13px] text-[var(--muted)] transition-colors hover:text-[var(--fg)] md:hidden"
        >
          {CTA_PRIMARY}
        </a>
      </div>
    </header>
  )
}

/** A slowly rotating ring of discipline words that orbits the aperture. */
function TypographicRing() {
  const reduce = useReducedMotion()
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-[31%] z-[2] hidden aspect-square w-[min(42vh,380px)] -translate-x-1/2 -translate-y-1/2 sm:block"
    >
      <div className="absolute inset-0 animate-spin-slower">
        {marqueeWords.map((word, i) => {
          const angle = (i / marqueeWords.length) * 360
          return (
            <span
              key={word}
              className="absolute inset-0 block"
              style={{ transform: `rotate(${angle}deg)` }}
            >
              <span
                className="absolute left-1/2 top-[12%] block"
                style={{ transform: `translate(-50%, -50%) rotate(${-angle}deg)` }}
              >
                <span
                  className="block whitespace-nowrap text-[10px] uppercase tracking-[0.34em] text-[var(--faint)]"
                  style={reduce ? undefined : { animation: 'spin 60s linear infinite reverse' }}
                >
                  {word}
                </span>
              </span>
            </span>
          )
        })}
      </div>
    </div>
  )
}

function Hero() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 110])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  return (
    <section ref={ref} className="relative min-h-[100dvh] w-full overflow-hidden">
      {/* deep, near-neutral atmosphere with a single motivated glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div className="texture absolute inset-0 opacity-50" />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(52% 44% at 50% 34%, color-mix(in oklab, var(--accent) 10%, transparent), transparent 72%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(closest-side at 50% 46%, transparent 44%, var(--bg) 100%)',
          }}
        />
      </div>

      {/* glass aperture, medallion in the upper half */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-[62%]">
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </div>

      <TypographicRing />

      {/* copy */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto flex min-h-[100dvh] max-w-[1440px] flex-col items-center justify-end px-5 pb-20 pt-[50vh] text-center md:px-10"
      >
        <Reveal delay={0.1}>
          <Kicker>{hero.eyebrow}</Kicker>
        </Reveal>

        <MaskText
          as="h1"
          lines={hero.headline}
          delay={0.25}
          className="mt-5 max-w-[18ch] font-display text-[clamp(2.2rem,5.6vw,4.6rem)] font-medium leading-[0.96] tracking-[-0.03em] text-[var(--fg)] text-edge"
        />

        <Reveal delay={0.7}>
          <p className="mt-6 max-w-[48ch] text-[15px] leading-relaxed text-[var(--muted)] md:text-base">
            {hero.sub}
          </p>
        </Reveal>

        <Reveal delay={0.85}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Cta href="#contact" variant="primary" magnetic>
              {CTA_PRIMARY}
            </Cta>
            <Cta href="#gallery" variant="ghost" arrow="right">
              {CTA_WORK}
            </Cta>
          </div>
        </Reveal>

        <Reveal delay={0.95} className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {hero.meta.map((m) => (
            <span key={m.k} className="flex items-baseline gap-2 text-[12px] text-[var(--faint)]">
              <span className="uppercase tracking-[0.2em]">{m.k}</span>
              <span className="text-[var(--muted)]">{m.v}</span>
            </span>
          ))}
        </Reveal>
      </motion.div>

      <div className="pointer-events-none absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2">
        <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--faint)]">Scroll</span>
        <span className="relative block h-9 w-px overflow-hidden bg-[var(--line-strong)]">
          <span className="absolute inset-x-0 top-0 block h-3 animate-scroll-hint bg-[var(--accent)]" />
        </span>
      </div>
    </section>
  )
}

function Statement() {
  const lines = studio.headline.split(/(?<=\.)\s+/)
  return (
    <section id="studio" className="relative border-t border-[var(--line)] px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1120px]">
        <Reveal>
          <Kicker>{studio.kicker}</Kicker>
        </Reveal>
        <MaskText
          as="h2"
          lines={lines}
          delay={0.1}
          className="mt-9 max-w-[22ch] font-display text-[clamp(1.9rem,4.8vw,4.2rem)] font-medium leading-[1.02] tracking-[-0.03em] text-[var(--fg)]"
        />
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-12">
          <Reveal delay={0.2} className="md:col-span-7 md:col-start-6">
            <p className="text-[16px] leading-relaxed text-[var(--muted)]">{studio.body}</p>
            <p className="mt-7 font-display text-[15px] text-[var(--accent)]">{studio.signature}</p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Chapter({ panel }: { panel: Panel }) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <div ref={ref} className="relative min-h-[100dvh] w-full overflow-hidden border-t border-[var(--line)]" data-cursor="Chapter">
      <motion.img
        src={panel.image}
        alt={`${panel.title}, ${brand.name}`}
        loading="lazy"
        decoding="async"
        style={reduce ? undefined : { y }}
        className="absolute -top-[10%] left-0 h-[120%] w-full object-cover will-change-transform"
      />

      {/* scrims, tinted from the theme background so contrast survives every palette */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, var(--bg) 6%, color-mix(in oklab, var(--bg) 58%, transparent) 46%, transparent 100%)',
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to right, color-mix(in oklab, var(--bg) 80%, transparent) 0%, transparent 62%)',
        }}
      />

      <span
        aria-hidden
        className="pointer-events-none absolute right-5 top-24 font-display text-[clamp(3rem,9vw,7rem)] leading-none text-[var(--faint)] opacity-30 md:right-10"
      >
        {panel.n}
      </span>

      <div className="relative z-10 mx-auto flex min-h-[100dvh] w-full max-w-[1440px] flex-col justify-end px-5 pb-16 pt-32 md:px-10 md:pb-24">
        <div className="max-w-[48ch]">
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="font-display text-[13px] tracking-[0.14em] text-[var(--accent)]">
                {panel.n}
              </span>
              <span className="h-px w-10 bg-[var(--line-strong)]" />
              <span className="text-[11px] uppercase tracking-[0.28em] text-[var(--muted)]">
                {panel.kicker}
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <h3 className="mt-5 font-display text-[clamp(2rem,5.4vw,4.4rem)] font-medium leading-[0.98] tracking-[-0.03em] text-[var(--fg)]">
              {panel.title}
            </h3>
          </Reveal>
          <Reveal delay={0.22}>
            <p className="mt-5 max-w-[42ch] text-[15px] leading-relaxed text-[var(--muted)]">
              {panel.body}
            </p>
          </Reveal>
        </div>
      </div>
    </div>
  )
}

function Testimonial() {
  const quoteLines = testimonials[0].quote.split(/(?<=\.)\s+/)
  return (
    <section className="relative overflow-hidden px-5 py-28 md:px-10 md:py-40">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(56% 60% at 50% 42%, color-mix(in oklab, var(--accent) 14%, transparent), transparent 70%)',
        }}
      />
      <div className="relative mx-auto max-w-[960px] text-center">
        <Reveal>
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full ring-1 ring-inset ring-[var(--line-strong)]">
            <Aperture weight="bold" className="h-5 w-5 text-[var(--accent)]" />
          </span>
        </Reveal>
        <MaskText
          as="p"
          lines={quoteLines.map(
            (l, i) => `${i === 0 ? '“' : ''}${l}${i === quoteLines.length - 1 ? '”' : ''}`,
          )}
          delay={0.15}
          className="mt-10 font-display text-[clamp(1.5rem,3.6vw,2.8rem)] font-medium leading-[1.18] tracking-[-0.02em] text-[var(--fg)]"
        />
        <Reveal delay={0.35}>
          <p className="mt-9 text-[13px] uppercase tracking-[0.2em] text-[var(--muted)]">
            {testimonials[0].name}, {testimonials[0].role}, {testimonials[0].location}
          </p>
        </Reveal>
      </div>
    </section>
  )
}

function ClosingCta() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-[var(--line)] px-5 py-28 text-center md:px-10 md:py-40"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 70% at 50% 100%, color-mix(in oklab, var(--accent) 20%, transparent), transparent 72%)',
        }}
      />
      <div className="relative mx-auto max-w-[900px]">
        <Reveal>
          <Kicker>{hero.eyebrow}</Kicker>
        </Reveal>
        <MaskText
          as="h2"
          lines={['Bring us the moment.', 'We’ll keep it.']}
          delay={0.1}
          className="mt-7 font-display text-[clamp(2.4rem,7vw,5.2rem)] font-medium leading-[0.96] tracking-[-0.03em] text-[var(--fg)]"
        />
        <Reveal delay={0.35}>
          <p className="mx-auto mt-7 max-w-[46ch] text-[15px] leading-relaxed text-[var(--muted)]">
            {hero.sub}
          </p>
        </Reveal>
        <Reveal delay={0.5}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Cta href={`mailto:${brand.email}`} variant="primary" magnetic>
              {CTA_PRIMARY}
            </Cta>
            <Cta href="#gallery" variant="ghost" arrow="right">
              {CTA_WORK}
            </Cta>
          </div>
        </Reveal>
        <Reveal delay={0.6}>
          <div className="mt-8 flex flex-col items-center justify-center gap-1 text-[13px] text-[var(--faint)] sm:flex-row sm:gap-4">
            <a href={`mailto:${brand.email}`} className="transition-colors hover:text-[var(--fg)]">
              {brand.email}
            </a>
            <span aria-hidden className="hidden sm:inline">
              ·
            </span>
            <a
              href={`tel:${brand.phone.replace(/[^\d+]/g, '')}`}
              className="transition-colors hover:text-[var(--fg)]"
            >
              {brand.phone}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function FooterBlock() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative border-t border-[var(--line)] bg-[var(--surface)] px-5 pb-10 pt-20 md:px-10 md:pt-28">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-12">
          <div className="col-span-2 md:col-span-5">
            <a
              href="#top"
              className="font-display text-[clamp(1.8rem,3.6vw,2.6rem)] font-medium tracking-[-0.02em] text-[var(--fg)]"
            >
              Lens <span className="text-[var(--accent)]">&amp;</span> Legacy
            </a>
            <p className="mt-5 max-w-[32ch] text-[14px] leading-relaxed text-[var(--muted)]">
              {brand.tagline}. Studios in {brand.locations.join(', ')}.
            </p>
          </div>

          {footerLinks.map((col) => (
            <nav key={col.heading} aria-label={col.heading} className="md:col-span-2">
              <h3 className="text-[11px] uppercase tracking-[0.18em] text-[var(--faint)]">
                {col.heading}
              </h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#top"
                      className="text-[13px] text-[var(--muted)] transition-colors hover:text-[var(--fg)]"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="col-span-2 flex items-start md:col-span-1 md:justify-end">
            <a
              href="#top"
              aria-label="Back to top"
              className="group flex h-11 w-11 items-center justify-center rounded-full ring-1 ring-inset ring-[var(--line-strong)] transition-colors hover:bg-[var(--fg)]/5"
            >
              <ArrowUp
                weight="bold"
                className="h-4 w-4 text-[var(--fg)] transition-transform duration-500 group-hover:-translate-y-0.5"
              />
            </a>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-[var(--line)] pt-6 text-[12px] text-[var(--faint)] md:flex-row md:items-center md:justify-between">
          <span>
            © {year} {brand.name}. {brand.tagline}.
          </span>
          <span className="flex gap-5">
            <a href="#top" className="hover:text-[var(--muted)]">
              Privacy
            </a>
            <a href="#top" className="hover:text-[var(--muted)]">
              Terms
            </a>
            <span>Shot on location</span>
          </span>
        </div>
      </div>
    </footer>
  )
}
