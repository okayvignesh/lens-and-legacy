import { useRef, useState, type ReactNode } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import {
  ArrowRight,
  ArrowUpRight,
  EnvelopeSimple,
  InstagramLogo,
  List,
  MapPin,
  Phone,
  Plus,
  Quotes,
  Star,
  X,
} from '@phosphor-icons/react'
import {
  brand,
  nav,
  hero,
  CTA_PRIMARY,
  CTA_WORK,
  studio,
  work,
  gallery,
  testimonials,
  faqs,
  footerLinks,
} from '../data/site'
import { MaskText, Reveal } from '../components/ui/Reveal'
import Cta from '../components/ui/Cta'
import Categories from '../components/ui/Categories'
import Gallery from '../components/ui/Gallery'

const EASE = [0.16, 1, 0.3, 1] as const
const SOFT = 'ease-[cubic-bezier(0.32,0.72,0,1)]'

/** The single warm-cream italic serif accent, used sparingly. */
const SERIF = { fontFamily: "'Boska', Georgia, serif" } as const

/**
 * Thin L-shaped crop / registration marks in each corner of a frame.
 * `tone="light"` draws them light (for dark imagery), `"dark"` for light grounds.
 */
function CropMarks({
  tone = 'light',
  className = '',
}: {
  tone?: 'light' | 'dark'
  className?: string
}) {
  const line = tone === 'light' ? 'border-white/55' : 'border-[var(--fg)]/35'
  const arm = `absolute h-4 w-4 md:h-6 md:w-6 ${line}`
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-4 z-20 md:inset-7 ${className}`}
    >
      <span className={`${arm} left-0 top-0 border-l border-t`} />
      <span className={`${arm} right-0 top-0 border-r border-t`} />
      <span className={`${arm} bottom-0 left-0 border-b border-l`} />
      <span className={`${arm} bottom-0 right-0 border-b border-r`} />
    </div>
  )
}

/** The large rounded outlined glyph that stands in for a letter in the headline. */
function HollowGlyph() {
  return (
    <svg
      viewBox="0 0 100 64"
      aria-hidden
      focusable="false"
      className="inline-block h-[0.64em] w-[0.98em] shrink-0"
    >
      <rect
        x="5"
        y="5"
        width="90"
        height="54"
        rx="27"
        fill="none"
        stroke="currentColor"
        strokeWidth="9"
      />
    </svg>
  )
}

/** Five stars for the rating block. */
function Stars({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-0.5 ${className}`} aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} weight="fill" className="h-3.5 w-3.5 text-[var(--fg)]" />
      ))}
    </span>
  )
}

/** Inverted pill for use on the near-black blocks, where a black pill would vanish. */
function InvertedCta({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className={`group inline-flex items-center gap-3 rounded-full bg-white py-2 pl-6 pr-2 text-sm font-medium tracking-tight text-[#0E0E0E] transition-transform duration-500 ${SOFT} hover:scale-[1.02]`}
    >
      <span className="whitespace-nowrap">{children}</span>
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0E0E0E]/10">
        <ArrowUpRight weight="bold" className="h-4 w-4" />
      </span>
    </a>
  )
}

/** Top bar, name wordmark, role block, contact, Instagram and an unfolding menu. */
function TopBar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="absolute inset-x-0 top-0 z-40 text-white">
      <div className="mx-auto flex max-w-[1440px] items-start justify-between gap-4 px-5 py-5 md:px-10 md:py-7">
        <a
          href="#top"
          aria-label={`${brand.name} home`}
          className="font-display text-[14px] font-medium uppercase leading-none tracking-[0.14em] md:text-[17px]"
        >
          Lens <span className="text-[var(--accent-2)]">&amp;</span> Legacy
        </a>

        <div className="hidden items-start gap-10 md:flex">
          <div className="leading-relaxed">
            <p className="text-[12px] uppercase tracking-[0.16em]">Studio</p>
            <p className="text-[12px] text-white/70">(Based in {brand.locations.join(' · ')})</p>
          </div>
          <div className="text-[12px] text-white/70">
            <a
              href={`tel:${brand.phone.replace(/[^\d+]/g, '')}`}
              className={`inline-flex items-center gap-2 transition-colors duration-300 hover:text-white ${SOFT}`}
            >
              <Phone className="h-3.5 w-3.5" aria-hidden />
              {brand.phone}
            </a>
            <a
              href={`mailto:${brand.email}`}
              className={`mt-1.5 flex items-center gap-2 transition-colors duration-300 hover:text-white ${SOFT}`}
            >
              <EnvelopeSimple className="h-3.5 w-3.5" aria-hidden />
              {brand.email}
            </a>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <a
            href="#top"
            aria-label="Instagram"
            className={`hidden items-center gap-1.5 text-[13px] transition-colors duration-300 hover:text-white/70 sm:inline-flex ${SOFT}`}
          >
            <InstagramLogo className="h-4 w-4" aria-hidden />
            Instagram
            <ArrowUpRight weight="bold" className="h-3 w-3" aria-hidden />
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="atelier-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className={`flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white transition-colors duration-300 hover:bg-white/10 ${SOFT}`}
          >
            {open ? (
              <X weight="bold" className="h-4 w-4" />
            ) : (
              <List weight="bold" className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {open && (
        <motion.div
          id="atelier-menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="fixed inset-0 z-30 flex flex-col items-center justify-center gap-10 bg-[#0E0E0E]/95 px-6 text-center text-white"
        >
          <nav aria-label="Menu" className="flex flex-col items-center gap-6">
            {nav.map((n) => (
              <a
                key={n.label}
                href={n.href}
                onClick={() => setOpen(false)}
                className={`font-display text-[clamp(2rem,7vw,3.4rem)] font-medium leading-none tracking-[-0.02em] text-white/75 transition-colors duration-300 hover:text-white ${SOFT}`}
              >
                {n.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className={`font-display text-[clamp(2rem,7vw,3.4rem)] font-medium leading-none tracking-[-0.02em] text-white/75 transition-colors duration-300 hover:text-white ${SOFT}`}
            >
              Contact
            </a>
          </nav>
          <InvertedCta href={`mailto:${brand.email}`}>{CTA_PRIMARY}</InvertedCta>
        </motion.div>
      )}
    </header>
  )
}

/** Hero, one full-bleed portrait, crop marks, a spliced display headline + italic serif. */
function Hero() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '16%'])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12])

  return (
    <section
      ref={ref}
      aria-label="Introduction"
      className="relative min-h-[100dvh] w-full overflow-hidden bg-[#0E0E0E]"
    >
      <motion.img
        src={studio.image}
        alt="A Lens & Legacy photographer working in warm, low studio light"
        style={reduce ? undefined : { y, scale }}
        className="absolute inset-0 h-full w-full object-cover will-change-transform"
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, #0E0E0E 3%, rgba(14,14,14,0.55) 44%, rgba(14,14,14,0.35) 100%)',
        }}
      />
      <CropMarks tone="light" />

      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-[1440px] flex-col items-center justify-end px-5 pb-16 pt-32 text-center md:px-10 md:pb-24">
        <Reveal delay={0.1}>
          <span className="text-[11px] uppercase tracking-[0.44em] text-white/70">
            Art in focus
          </span>
        </Reveal>

        <Reveal delay={0.3}>
          <h1
            aria-label="Your story"
            className="mt-5 font-display text-[clamp(2.6rem,12vw,10.5rem)] font-medium uppercase leading-[0.86] tracking-[-0.03em] text-white text-edge"
          >
            <span aria-hidden>
              Y
              <HollowGlyph />
              UR STORY
            </span>
          </h1>
        </Reveal>

        <Reveal delay={0.5}>
          <p
            className="mt-1 text-[clamp(2.4rem,9vw,6.5rem)] leading-[0.95] text-[var(--accent-2)]"
            style={{ ...SERIF, fontStyle: 'italic' }}
          >
            Legacy
          </p>
        </Reveal>

        <Reveal delay={0.75}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[11px] uppercase tracking-[0.2em] text-white/70">
            {hero.meta.map((m) => (
              <span key={m.k} className="inline-flex items-baseline gap-2">
                <span className="text-white/80">{m.k}</span>
                {m.v}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/** Section 2, studio statement, rating testimonial and availability card. */
function Statement() {
  const headlineLines = studio.headline.split(/(?<=\.)\s+/)

  return (
    <section id="studio" className="bg-[var(--bg)] px-5 py-24 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1320px]">
        <div className="grid gap-y-10 md:grid-cols-12 md:gap-x-10">
          <div className="md:col-span-4">
            <Reveal>
              <p className="font-display text-[1.05rem] uppercase tracking-[0.02em] text-[var(--fg)]">
                {brand.name}
              </p>
              <p className="mt-1.5 text-[13px] text-[var(--muted)]">Photography · Film Studio</p>
            </Reveal>
          </div>

          <div className="md:col-span-8">
            <Reveal>
              <Quotes weight="fill" className="h-10 w-10 text-[var(--fg)]/15" aria-hidden />
            </Reveal>
            <MaskText
              as="h2"
              lines={headlineLines}
              delay={0.08}
              className="mt-7 font-display text-[clamp(1.9rem,4.6vw,4rem)] font-medium leading-[1.06] tracking-[-0.03em] text-[var(--fg)] text-edge"
            />
          </div>
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-12 md:gap-x-10">
          <div className="md:col-span-5">
            <Reveal>
              <p className="max-w-[46ch] text-[16px] leading-[1.9] text-[var(--muted)]">
                {studio.body}
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <figure className="mt-10 flex items-center gap-4 border-t border-[var(--line)] pt-6">
                <img
                  src="https://picsum.photos/seed/lens-legacy-client-ana/96/96"
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="h-12 w-12 shrink-0 rounded-full object-cover"
                />
                <figcaption>
                  <div className="flex items-center gap-2">
                    <Stars />
                    <span className="text-[13px] text-[var(--fg)]">
                      5.0 / 5 <span className="sr-only">out of 5</span>
                    </span>
                  </div>
                  <p className="mt-1 text-[13px] text-[var(--muted)]">
                    {testimonials[0].name} · {testimonials[0].role}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          </div>

          <div className="md:col-span-7">
            <Reveal delay={0.15}>
              <div className="relative overflow-hidden rounded-[1.75rem]">
                <img
                  src={work[4].image}
                  alt={`${work[4].title}, ${work[4].category}`}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[5/4] w-full object-cover"
                />
                <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-[var(--surface)] px-4 py-2 text-[12px] font-medium text-[var(--fg)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--fg)]" aria-hidden />
                  Available for work
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

/** Section 3, a monochrome portrait and a white invitation card. */
function FeaturePanels() {
  return (
    <section id="feature" className="bg-[var(--bg)] px-5 pb-24 md:px-10 md:pb-40">
      <div className="mx-auto grid max-w-[1320px] gap-6 md:grid-cols-2">
        <Reveal y={0}>
          <div className="group relative h-full overflow-hidden rounded-[1.75rem]">
            <img
              src={work[0].image}
              alt={`${work[0].title}, ${work[0].category}`}
              loading="lazy"
              decoding="async"
              className={`h-full min-h-[360px] w-full object-cover grayscale transition-transform duration-[900ms] ${SOFT} group-hover:scale-[1.03]`}
            />
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="flex h-full flex-col justify-between gap-12 rounded-[1.75rem] bg-[var(--surface)] p-8 md:p-12">
            <h2 className="max-w-[16ch] font-display text-[clamp(1.9rem,4vw,3rem)] font-medium leading-[1.06] tracking-[-0.02em] text-[var(--fg)]">
              Ready to capture your moments?
            </h2>
            <div className="flex flex-wrap items-center justify-between gap-6">
              <a href="#gallery" className="group inline-flex items-center gap-2 text-[14px] text-[var(--fg)]">
                <span className="border-b-2 border-[var(--fg)] pb-1">Check out our work</span>
                <ArrowUpRight
                  weight="bold"
                  aria-hidden
                  className={`h-4 w-4 transition-transform duration-500 ${SOFT} group-hover:-translate-y-0.5 group-hover:translate-x-0.5`}
                />
              </a>
              <a
                href="#gallery"
                aria-label="View selected work"
                className={`flex h-14 w-14 items-center justify-center rounded-full bg-[var(--accent)] text-[var(--accent-ink)] transition-transform duration-500 hover:scale-105 ${SOFT}`}
              >
                <ArrowRight weight="bold" className="h-5 w-5" aria-hidden />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/** The studio's numbers, set as a quiet editorial band. */
function StatsBand() {
  return (
    <section aria-label="Studio in numbers" className="bg-[var(--bg)] px-5 pb-24 md:px-10 md:pb-40">
      <div className="mx-auto grid max-w-[1320px] grid-cols-2 gap-x-8 gap-y-10 border-t border-[var(--line)] pt-10 md:grid-cols-4">
        {studio.stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.06}>
            <div>
              <div className="font-display text-[clamp(2rem,4vw,3.4rem)] leading-none tracking-[-0.02em] text-[var(--fg)]">
                {s.value}
              </div>
              <div className="mt-3 text-[12px] uppercase tracking-[0.16em] text-[var(--muted)]">
                {s.label}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/** Section 5, a centred promise above a horizontal gallery of photographs. */
function WhySection() {
  return (
    <section className="bg-[var(--bg)] py-24 md:py-40">
      <div className="mx-auto max-w-[760px] px-5 text-center md:px-10">
        <Reveal>
          <span className="text-[11px] uppercase tracking-[0.32em] text-[var(--muted)]">
            Why {brand.name}
          </span>
        </Reveal>
        <MaskText
          as="h2"
          lines={['Why choose us', 'for your story?']}
          delay={0.08}
          className="mt-6 font-display text-[clamp(2rem,5vw,4rem)] font-medium leading-[1.04] tracking-[-0.03em] text-[var(--fg)] text-edge"
        />
        <Reveal delay={0.15}>
          <p className="mx-auto mt-6 max-w-[54ch] text-[15px] leading-relaxed text-[var(--muted)]">
            Twelve years, three cities and a habit of arriving early. The numbers are only the
            shorthand for showing up, every single time.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-9 flex justify-center">
            <Cta href="#gallery" variant="ghost" arrow="right">
              {CTA_WORK}
            </Cta>
          </div>
        </Reveal>
      </div>

      <Reveal y={0}>
        <ul className="no-scrollbar mt-16 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 md:px-10">
          {work.map((p) => (
            <li key={p.title} className="w-[74vw] shrink-0 snap-start sm:w-[360px]">
              <div className="group relative overflow-hidden rounded-2xl">
                <img
                  src={p.image}
                  alt={`${p.title}, ${p.category}`}
                  loading="lazy"
                  decoding="async"
                  className={`aspect-[3/4] w-full object-cover transition-transform duration-[900ms] ${SOFT} group-hover:scale-[1.04]`}
                />
              </div>
              <div className="mt-3 flex items-baseline justify-between gap-3">
                <span className="text-[13px] text-[var(--fg)]">{p.title}</span>
                <span className="text-[11px] uppercase tracking-[0.14em] text-[var(--muted)]">
                  {p.year}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  )
}

function FaqItem({ q, a, id }: { q: string; a: string; id: string }) {
  const [open, setOpen] = useState(false)
  const reduce = useReducedMotion()

  return (
    <div className="border-b border-[var(--line)]">
      <h3>
        <button
          type="button"
          id={`${id}-button`}
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          onClick={() => setOpen((v) => !v)}
          className={`group flex w-full items-center justify-between gap-6 py-6 text-left ${SOFT}`}
        >
          <span
            className={`font-display text-[clamp(1.1rem,2vw,1.45rem)] leading-[1.3] transition-colors duration-500 ${SOFT} ${
              open ? 'text-[var(--fg)]' : 'text-[var(--fg)] group-hover:text-[var(--muted)]'
            }`}
          >
            {q}
          </span>
          <span
            aria-hidden
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--line-strong)] text-[var(--fg)] transition-transform duration-500 ${SOFT} ${
              open ? 'rotate-45' : 'rotate-0'
            }`}
          >
            <Plus weight="bold" className="h-4 w-4" />
          </span>
        </button>
      </h3>
      <motion.div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-button`}
        aria-hidden={!open}
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: reduce ? 0 : 0.6, ease: EASE }}
        className="overflow-hidden"
      >
        <p className="max-w-[62ch] pb-7 pr-4 text-[15px] leading-[1.85] text-[var(--muted)] md:pr-10">
          {a}
        </p>
      </motion.div>
    </div>
  )
}

function FaqSection() {
  return (
    <section className="bg-[var(--bg)] px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto grid max-w-[1320px] grid-cols-1 gap-10 md:grid-cols-12 md:gap-x-10">
        <div className="md:col-span-4">
          <Reveal>
            <span className="text-[11px] uppercase tracking-[0.28em] text-[var(--muted)]">
              Good to know
            </span>
          </Reveal>
          <MaskText
            as="h2"
            lines={['Questions,', 'answered.']}
            delay={0.08}
            className="mt-6 font-display text-[clamp(1.9rem,3.6vw,2.8rem)] font-medium leading-[1.08] tracking-[-0.03em] text-[var(--fg)] text-edge"
          />
        </div>
        <div className="md:col-span-8">
          {faqs.slice(0, 5).map((f, i) => (
            <FaqItem key={f.q} q={f.q} a={f.a} id={`atelier-faq-${i}`} />
          ))}
        </div>
      </div>
    </section>
  )
}

/** Closing invitation, set on the second near-black block. */
function ClosingCta() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#0E0E0E] px-5 py-28 text-center text-white md:px-10 md:py-40"
    >
      <CropMarks tone="light" />
      <div className="relative mx-auto max-w-[900px]">
        <Reveal>
          <span className="text-[11px] uppercase tracking-[0.44em] text-white/70">
            Art in focus
          </span>
        </Reveal>
        <MaskText
          as="h2"
          lines={['Let’s keep the', 'evidence.']}
          delay={0.08}
          className="mt-6 font-display text-[clamp(2.6rem,8vw,6rem)] font-medium leading-[0.96] tracking-[-0.03em] text-white text-edge"
        />
        <Reveal delay={0.25}>
          <p className="mx-auto mt-6 max-w-[46ch] text-[16px] leading-relaxed text-white/60">
            Tell us about the day, the people and the light. We’ll bring the rest.
          </p>
        </Reveal>
        <Reveal delay={0.4}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
            <InvertedCta href={`mailto:${brand.email}`}>{CTA_PRIMARY}</InvertedCta>
            <a
              href={`mailto:${brand.email}`}
              className={`inline-flex items-center gap-2 text-[14px] text-white/70 transition-colors duration-300 hover:text-white ${SOFT}`}
            >
              <EnvelopeSimple className="h-4 w-4" aria-hidden />
              {brand.email}
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
    <footer className="border-t border-[var(--line)] bg-[var(--bg)] px-5 py-16 md:px-10 md:py-20">
      <div className="mx-auto max-w-[1320px]">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <a
              href="#top"
              className="font-display text-[clamp(1.6rem,3vw,2.4rem)] font-medium uppercase leading-none tracking-[0.06em] text-[var(--fg)]"
            >
              Lens <span className="text-[var(--accent-2)]">&amp;</span> Legacy
            </a>
            <p className="mt-4 max-w-[34ch] text-[14px] leading-relaxed text-[var(--muted)]">
              {brand.tagline}. Studios in {brand.locations.join(', ')}.
            </p>
            <p className="mt-3 inline-flex items-center gap-2 text-[12px] text-[var(--faint)]">
              <MapPin className="h-4 w-4" aria-hidden />
              {brand.locations.join(' · ')}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-7">
            {footerLinks.map((col) => (
              <nav key={col.heading} aria-label={col.heading}>
                <h3 className="text-[11px] uppercase tracking-[0.18em] text-[var(--faint)]">
                  {col.heading}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a
                        href="#top"
                        className={`text-[14px] text-[var(--muted)] transition-colors duration-500 hover:text-[var(--fg)] ${SOFT}`}
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-[var(--line)] pt-6 text-[12px] text-[var(--faint)] md:flex-row md:items-center md:justify-between">
          <span>
            © {year} {brand.name}. All rights reserved.
          </span>
          <a
            href="#top"
            className={`inline-flex items-center gap-2 transition-colors duration-500 hover:text-[var(--muted)] ${SOFT}`}
          >
            Back to top
            <ArrowUpRight weight="bold" className="h-3.5 w-3.5" aria-hidden />
          </a>
        </div>
      </div>
    </footer>
  )
}

/** 06, Atelier. Personal editorial with crop-mark frames and a grotesk + italic-serif mix. */
export default function Atelier() {
  return (
    <>
      <TopBar />
      <main>
        <Hero />
        <Statement />
        <FeaturePanels />
        <StatsBand />
        <Categories
          id="services"
          eyebrow="What we do"
          title="Three things we do properly."
          intro="Sport, weddings and every occasion in between, covered end to end by one crew, in photo, film and live events."
        />
        <Gallery
          id="gallery"
          items={gallery}
          eyebrow="Gallery"
          title="Frames from the archive."
          intro="A wider look at the days we've been trusted with."
          columns={3}
          action={
            <Cta href="#contact" variant="ghost" arrow="right">
              {CTA_WORK}
            </Cta>
          }
        />
        <WhySection />
        <FaqSection />
        <ClosingCta />
      </main>
      <FooterBlock />
    </>
  )
}
