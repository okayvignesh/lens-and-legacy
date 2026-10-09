import { lazy, Suspense, useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { ArrowUpRight, Aperture } from '@phosphor-icons/react'
import {
  brand,
  nav,
  hero,
  CTA_PRIMARY,
  CTA_WORK,
  marqueeWords,
  studio,
  gallery,
  testimonials,
  footerLinks,
} from '../data/site'
import { MaskText, Reveal } from '../components/ui/Reveal'
import Cta from '../components/ui/Cta'
import Gallery from '../components/ui/Gallery'
import Categories from '../components/ui/Categories'
import Marquee from '../components/ui/Marquee'

const CameraCanvas = lazy(() => import('../components/three/CameraCanvas'))

const SPEC = [
  { k: 'ƒ/', v: '1.4' },
  { k: 'SHUTTER', v: '1/250' },
  { k: 'ISO', v: '400' },
]

/** 01, Aurora. Near-black glass, fine texture, a lit camera. */
export default function Aurora() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 90])
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  return (
    <>
      {/* ── top bar ─────────────────────────────────────────── */}
      <header className="fixed inset-x-0 top-0 z-40 flex justify-center px-4 pt-4 md:pt-6">
        <nav className="glass-blur flex w-full max-w-[1180px] items-center justify-between gap-4 rounded-full py-2 pl-5 pr-2">
          <a href="#top" className="flex items-center gap-2.5" aria-label={`${brand.name} home`}>
            <Aperture weight="bold" className="h-5 w-5 text-[var(--accent)]" />
            <span className="font-display text-[15px] font-medium tracking-tight text-[var(--fg)]">
              Lens <span className="text-[var(--accent)]">&amp;</span> Legacy
            </span>
          </a>
          <div className="hidden items-center gap-1 lg:flex">
            {nav.map((n) => (
              <a
                key={n.label}
                href={n.href}
                className="rounded-full px-4 py-2 text-sm text-[var(--muted)] transition-colors duration-300 hover:text-[var(--fg)]"
              >
                {n.label}
              </a>
            ))}
          </div>
          <Cta href="#contact" icon={false} className="!py-2.5 !pl-5 !text-[13px]">
            {CTA_PRIMARY}
          </Cta>
        </nav>
      </header>

      <main>
        {/* ── hero ──────────────────────────────────────────── */}
        <section ref={ref} className="relative min-h-[100dvh] w-full overflow-hidden">
          <div aria-hidden className="texture pointer-events-none absolute inset-0 z-0 opacity-60" />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 z-0 h-80 bg-gradient-to-b from-white/[0.05] to-transparent"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0"
            style={{
              background:
                'radial-gradient(closest-side at 50% 44%, transparent 48%, var(--bg) 100%)',
            }}
          />

          {/* lit 3D camera */}
          <div className="pointer-events-none absolute inset-0 z-0 md:translate-x-[22%]">
            <Suspense fallback={null}>
              <CameraCanvas />
            </Suspense>
          </div>

          {/* readouts */}
          <div className="pointer-events-none absolute right-5 top-[54%] z-10 hidden -translate-y-1/2 flex-col gap-6 xl:flex">
            {SPEC.map((s, i) => (
              <Reveal key={s.k} delay={1 + i * 0.1} className="flex items-center gap-3">
                <span className="h-px w-6 bg-[var(--line-strong)]" />
                <span className="text-[10px] tracking-[0.22em] text-[var(--faint)]">{s.k}</span>
                <span className="font-display text-lg text-[var(--fg)]">{s.v}</span>
              </Reveal>
            ))}
          </div>

          <motion.div
            style={{ y, opacity }}
            className="relative z-10 mx-auto flex min-h-[100dvh] max-w-[1440px] flex-col justify-end px-5 pb-10 pt-28 md:px-10 md:pb-14"
          >
            <Reveal delay={0.1}>
              <span className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] tracking-[0.16em] text-[var(--muted)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                {hero.eyebrow}
              </span>
            </Reveal>

            <MaskText
              as="h1"
              lines={hero.headline}
              delay={0.25}
              className="mt-6 max-w-[13ch] font-display text-[clamp(2.5rem,6vw,5.2rem)] font-medium leading-[0.94] tracking-[-0.03em] text-[var(--fg)] text-edge"
            />

            <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <Reveal delay={0.6}>
                <p className="max-w-[40ch] text-[15px] leading-relaxed text-[var(--muted)] md:text-base">
                  {hero.sub}
                </p>
              </Reveal>
              <Reveal delay={0.72}>
                <div className="flex flex-wrap items-center gap-3">
                  <Cta href="#contact" variant="primary" magnetic>
                    {CTA_PRIMARY}
                  </Cta>
                  <Cta href="#gallery" variant="ghost">
                    {CTA_WORK}
                  </Cta>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.85}>
              <dl className="glass mt-12 flex flex-wrap items-center gap-x-10 gap-y-4 rounded-2xl px-6 py-4">
                {hero.meta.map((m) => (
                  <div key={m.k} className="flex items-baseline gap-3">
                    <dt className="text-[10px] tracking-[0.22em] text-[var(--faint)]">{m.k}</dt>
                    <dd className="text-[13px] text-[var(--muted)]">{m.v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </motion.div>
        </section>

        <Marquee items={marqueeWords} />

        {/* ── what we do ────────────────────────────────────── */}
        <Categories
          id="services"
          eyebrow="What we do"
          title="Three things we do properly."
          intro="Sport, weddings and every occasion in between, covered end to end by one crew, in photo, film and live events."
        />

        {/* ── gallery ───────────────────────────────────────── */}
        <Gallery
          id="gallery"
          items={gallery}
          eyebrow="Gallery"
          title="Selected work, shot to be kept."
          intro="A few frames from matchdays, weddings and events. Open any one to see it full size."
          columns={3}
          action={
            <Cta href="#contact" variant="ghost" arrow="right">
              {CTA_WORK}
            </Cta>
          }
        />

        {/* ── studio + figures ──────────────────────────────── */}
        <section id="studio" className="relative px-5 pb-28 md:px-10 md:pb-40">
          <div aria-hidden className="texture pointer-events-none absolute inset-0 opacity-40" />
          <div className="relative mx-auto grid max-w-[1440px] grid-cols-1 gap-14 md:grid-cols-12">
            <div className="md:col-span-6">
              <MaskText
                as="h2"
                lines={[studio.headline]}
                className="font-display text-[clamp(1.9rem,3.6vw,3.1rem)] font-medium leading-[1.05] tracking-[-0.02em] text-[var(--fg)]"
              />
              <Reveal delay={0.15}>
                <p className="mt-8 max-w-[52ch] text-[15px] leading-relaxed text-[var(--muted)]">
                  {studio.body}
                </p>
              </Reveal>
              <Reveal delay={0.25}>
                <p className="mt-6 font-display text-[15px] text-[var(--accent)]">
                  {studio.signature}
                </p>
              </Reveal>
            </div>
            <div className="md:col-span-5 md:col-start-8">
              <div className="grid grid-cols-2 gap-5">
                {studio.stats.map((s, i) => (
                  <Reveal key={s.label} delay={i * 0.06}>
                    <div className="glass rounded-2xl p-5">
                      <div className="font-display text-[clamp(2rem,3.6vw,2.8rem)] font-medium leading-none text-[var(--fg)]">
                        {s.value}
                      </div>
                      <div className="mt-3 text-[12px] leading-snug text-[var(--muted)]">
                        {s.label}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── testimonial ───────────────────────────────────── */}
        <section className="relative px-5 pb-28 md:px-10 md:pb-40">
          <div className="relative mx-auto max-w-[1000px] text-center">
            <Reveal>
              <p className="font-display text-[clamp(1.7rem,3.6vw,2.8rem)] font-medium leading-[1.16] tracking-[-0.02em] text-[var(--fg)]">
                “{testimonials[0].quote}”
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-8 text-[13px] text-[var(--muted)]">
                {testimonials[0].name} · {testimonials[0].role}, {testimonials[0].location}
              </p>
            </Reveal>
          </div>
        </section>

        {/* ── contact ───────────────────────────────────────── */}
        <section id="contact" className="relative px-5 pb-28 md:px-10 md:pb-40">
          <div aria-hidden className="texture pointer-events-none absolute inset-0 opacity-40" />
          <div className="relative mx-auto max-w-[1440px]">
            <div className="glass overflow-hidden rounded-[2.4rem] p-8 md:p-14">
              <div className="grid grid-cols-1 items-end gap-10 md:grid-cols-12">
                <div className="md:col-span-8">
                  <MaskText
                    as="h2"
                    lines={['Let’s make', 'the record.']}
                    className="font-display text-[clamp(2.4rem,6vw,4.8rem)] font-medium leading-[0.94] tracking-[-0.03em] text-[var(--fg)]"
                  />
                </div>
                <div className="md:col-span-4 md:text-right">
                  <Reveal delay={0.2}>
                    <a
                      href={`mailto:${brand.email}`}
                      className="inline-flex items-center gap-2 font-display text-[1.1rem] text-[var(--accent)] hover:underline"
                    >
                      {brand.email}
                    </a>
                    <p className="mt-2 text-[13px] text-[var(--faint)]">{brand.phone}</p>
                    <div className="mt-6 flex md:justify-end">
                      <Cta href={`mailto:${brand.email}`} variant="primary" magnetic>
                        {CTA_PRIMARY}
                      </Cta>
                    </div>
                  </Reveal>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── footer ──────────────────────────────────────────── */}
      <footer className="relative border-t border-[var(--line)] px-5 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid grid-cols-2 gap-10 md:grid-cols-12">
            <div className="col-span-2 md:col-span-6">
              <span className="font-display text-[clamp(1.8rem,4vw,3rem)] font-medium tracking-[-0.02em] text-[var(--fg)]">
                Lens <span className="text-[var(--accent)]">&amp;</span> Legacy
              </span>
              <p className="mt-4 max-w-[32ch] text-[13px] leading-relaxed text-[var(--muted)]">
                Photography, film and live events. {brand.locations.join(' · ')}.
              </p>
            </div>
            {footerLinks.map((col) => (
              <div key={col.heading} className="md:col-span-2">
                <h3 className="text-[11px] tracking-[0.16em] text-[var(--faint)]">{col.heading}</h3>
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
              </div>
            ))}
          </div>
          <div className="mt-14 flex flex-col gap-3 border-t border-[var(--line)] pt-6 text-[12px] text-[var(--faint)] md:flex-row md:items-center md:justify-between">
            <span>
              © {new Date().getFullYear()} {brand.name}. All rights reserved.
            </span>
            <a href="#top" className="inline-flex items-center gap-2 hover:text-[var(--muted)]">
              Back to top <ArrowUpRight weight="bold" className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </footer>
    </>
  )
}
