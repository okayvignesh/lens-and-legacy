import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { ArrowDown, ArrowRight, ArrowUpRight } from '@phosphor-icons/react'
import { pages } from '../data/pages'
import { brand } from '../data/site'
import PageNav from '../components/site/PageNav'
import PageFooter from '../components/site/PageFooter'
import Gallery from '../components/ui/Gallery'
import Cta from '../components/ui/Cta'
import { MaskText, Reveal } from '../components/ui/Reveal'
import { Bit, LensRing } from '../components/ui/Bits'

const CAPABILITIES = [
  'Matchday media',
  'Aerial',
  'Live stream',
  'Real-time',
  'Sponsors',
  'Operations',
  'Story',
]

const SERVICE_LAYOUT = [
  { span: 'md:col-span-7', kind: 'image', offset: '', ratio: 'aspect-[16/10]', boxed: false },
  {
    span: 'md:col-span-4 md:col-start-9',
    kind: 'text',
    offset: 'md:mt-14',
    ratio: '',
    boxed: false,
  },
  {
    span: 'md:col-span-4',
    kind: 'text',
    offset: 'md:pr-4',
    ratio: '',
    boxed: true,
  },
  {
    span: 'md:col-span-7 md:col-start-6',
    kind: 'image',
    offset: 'md:mt-4',
    ratio: 'aspect-[3/2]',
    boxed: false,
  },
  {
    span: 'md:col-span-5',
    kind: 'image',
    offset: '',
    ratio: 'aspect-[4/5]',
    boxed: false,
  },
  {
    span: 'md:col-span-6 md:col-start-7',
    kind: 'text',
    offset: 'md:pt-10',
    ratio: '',
    boxed: false,
  },
] as const

const APPROACH = [
  {
    title: 'The brief',
    body: 'Fixture list, venue, story. We scope the coverage around what actually happens on the day, not a template.',
  },
  {
    title: 'Crew & run-of-show',
    body: 'A crew sized to the ground, a shot list mapped to the schedule, and a backup for every position.',
  },
  {
    title: 'Matchday',
    body: 'Cameras, drone, stream and social move together, from warm-up to the final play.',
  },
  {
    title: 'Delivery',
    body: 'Same-day teasers, a 48-hour gallery, and the full season archive returned clean and in order.',
  },
]

/** A photo that drifts gently against the page as it scrolls. */
function DriftFigure({
  src,
  alt,
  className,
  imgClassName,
}: {
  src: string
  alt: string
  className?: string
  imgClassName?: string
}) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  return (
    <div ref={ref} className={`overflow-hidden ${className ?? ''}`}>
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        style={reduce ? undefined : { y, scale: 1.12 }}
        className={`h-full w-full object-cover ${imgClassName ?? ''}`}
      />
    </div>
  )
}

function CapabilityBand() {
  const reduce = useReducedMotion()

  const group = (key: string) => (
    <div key={key} className="flex shrink-0 items-center">
      {CAPABILITIES.map((item) => (
        <span key={`${key}-${item}`} className="flex items-center">
          <span className="px-5 font-display text-[clamp(1.25rem,2.6vw,1.9rem)] font-medium uppercase tracking-tight text-[var(--fg)]/85 md:px-8">
            {item}
          </span>
          <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-[var(--accent)]" aria-hidden />
        </span>
      ))}
    </div>
  )

  return (
    <section
      aria-label="Capabilities"
      className="relative overflow-hidden border-y border-[var(--line)] bg-[var(--surface)] py-5 md:py-6"
    >
      <div
        aria-hidden
        className="flex w-max animate-marquee will-change-transform"
        style={reduce ? { animation: 'none' } : undefined}
      >
        {group('a')}
        {group('b')}
      </div>
      <span className="sr-only">{CAPABILITIES.join(', ')}</span>
    </section>
  )
}

export default function Sports({ onHome }: { onHome: () => void }) {
  const page = pages.sports
  const heroRef = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroY = useTransform(scrollYProgress, [0, 1], ['-4%', '8%'])

  const mailto = `mailto:${brand.email}?subject=${encodeURIComponent('Sports coverage enquiry')}`

  return (
    <>
      <PageNav page={page} onHome={onHome} />

      <main id="top" className="relative">
        {/* ── Hero ─────────────────────────────────────────────── */}
        <section
          ref={heroRef}
          className="relative overflow-hidden px-5 pb-10 pt-28 md:px-10 md:pb-12 md:pt-32"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-32 top-4 h-[52vh] w-[52vh] rounded-full opacity-[0.06] blur-[100px]"
            style={{ background: 'var(--accent)' }}
          />

          <div className="relative mx-auto grid min-h-[calc(100dvh-11rem)] w-full max-w-[1440px] grid-cols-1 items-center gap-12 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-7">
              <Reveal>
                <span className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--muted)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" aria-hidden />
                  {page.hero.eyebrow}
                </span>
              </Reveal>

              <MaskText
                as="h1"
                lines={page.hero.headline}
                delay={0.1}
                className="mt-6 font-display font-medium uppercase leading-[0.84] tracking-[-0.03em] text-[var(--fg)] text-edge text-[clamp(3.4rem,9.4vw,8rem)] [&>span:last-child>span]:text-[var(--accent)]"
              />

              <Reveal delay={0.38}>
                <p className="mt-7 max-w-[46ch] text-[16px] leading-relaxed text-[var(--muted)] md:text-[17px]">
                  {page.hero.sub}
                </p>
              </Reveal>

              <Reveal delay={0.48}>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Cta href={mailto} variant="primary" magnetic>
                    Start a project
                  </Cta>
                  <Cta href="#work" variant="ghost" arrow="right">
                    See the work
                  </Cta>
                </div>
              </Reveal>

              <Reveal delay={0.56}>
                <dl className="mt-12 flex flex-wrap items-baseline gap-x-10 gap-y-4 border-t border-[var(--line)] pt-6">
                  {page.hero.meta.map((m) => (
                    <div key={m.k} className="flex items-baseline gap-2.5">
                      <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
                        {m.k}
                      </dt>
                      <dd className="font-display text-[1.1rem] font-medium leading-none text-[var(--fg)]">
                        {m.v}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>

            <div className="md:col-span-5">
              <Reveal delay={0.2} y={30}>
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.6rem] ring-1 ring-inset ring-[var(--line)]">
                  <motion.img
                    src={page.hero.image}
                    alt="Lens & Legacy sports coverage"
                    style={reduce ? undefined : { y: heroY, scale: 1.18 }}
                    className="h-full w-full object-cover will-change-transform"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/45 to-transparent"
                  />
                  <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3 rounded-full bg-[var(--surface)]/90 py-2 pl-4 pr-2 backdrop-blur-md">
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--fg)]">
                      On the ground · Kodagu
                    </span>
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent)] text-[var(--accent-ink)]">
                      <ArrowUpRight weight="bold" className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.34}>
                <div className="mt-4 flex items-center justify-between border-t border-[var(--line)] pt-4">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--faint)]">
                    01 / Matchday
                  </span>
                  <a
                    href="#story"
                    aria-label="Scroll to the story"
                    className="group inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted)] transition-colors hover:text-[var(--fg)]"
                  >
                    Scroll
                    <span className="relative block h-6 w-px overflow-hidden bg-[var(--line-strong)]">
                      <span className="absolute inset-x-0 top-0 block h-2.5 animate-scroll-hint bg-[var(--accent)]" />
                    </span>
                    <ArrowDown weight="bold" className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-y-0.5" />
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── Stat band ────────────────────────────────────────── */}
        <section aria-label="Sports at a glance" className="border-b border-[var(--line)] bg-[var(--surface)] px-5 md:px-10">
          <div className="mx-auto grid max-w-[1440px] grid-cols-2 md:grid-cols-4">
            {page.stats.map((s, i) => (
              <Reveal
                key={s.label}
                delay={i * 0.06}
                className={`border-t border-[var(--line)] py-8 md:border-l md:border-t-0 md:py-11 md:pl-8 ${
                  i === 0 ? 'md:border-l-0 md:pl-0' : ''
                }`}
              >
                <div className="font-display text-[clamp(2.6rem,5vw,4.2rem)] font-medium leading-none tracking-tight text-[var(--fg)]">
                  {s.value}
                </div>
                <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
                  {s.label}
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Intro ────────────────────────────────────────────── */}
        <section id="story" className="relative scroll-mt-24 px-5 py-24 md:px-10 md:py-32">
          <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-12 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-4">
              <Reveal>
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent)]">
                  The studio
                </span>
              </Reveal>

              <Reveal delay={0.08}>
                <div
                  aria-hidden
                  className="mt-2 font-display text-[clamp(6rem,12vw,10rem)] font-medium leading-[0.8] tracking-tight text-[var(--line-strong)]"
                >
                  01
                </div>
              </Reveal>

              <Reveal delay={0.16} className="mt-8 max-w-[260px]">
                <DriftFigure
                  src={page.services[0].image}
                  alt="Sports media day coverage by Lens & Legacy"
                  className="aspect-[4/5] rounded-2xl ring-1 ring-inset ring-[var(--line)]"
                />
                <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--faint)]">
                  Media day · Kodagu
                </p>
              </Reveal>
            </div>

            <div className="md:col-span-8">
              <MaskText
                as="h2"
                lines={[page.intro.lead]}
                className="max-w-[24ch] font-display text-[clamp(1.9rem,3.6vw,3.2rem)] font-medium uppercase leading-[1.02] tracking-tight text-[var(--fg)]"
              />

              <Reveal delay={0.14}>
                <div className="mt-9 max-w-[62ch] space-y-5 md:columns-2 md:max-w-none md:gap-10 md:space-y-0">
                  {page.intro.body.map((p, i) => (
                    <p
                      key={i}
                      className={`mb-5 break-inside-avoid text-[15px] leading-relaxed ${
                        i === 0 ? 'text-[var(--fg)]/85' : 'text-[var(--muted)]'
                      }`}
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.22}>
                <div className="mt-6 flex items-center gap-3 border-t border-[var(--line)] pt-5 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--faint)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" aria-hidden />
                  Grassroots to broadcast · Since 2019
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <CapabilityBand />

        {/* ── What we do ───────────────────────────────────────── */}
        <section id="services" className="relative scroll-mt-24 px-5 py-24 md:px-10 md:py-32">
          <div className="mx-auto max-w-[1440px]">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:items-end">
              <div className="md:col-span-8">
                <Reveal>
                  <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent)]">
                    What we do
                  </span>
                </Reveal>
                <MaskText
                  as="h2"
                  lines={['From the tunnel', 'to the final whistle.']}
                  className="mt-4 font-display text-[clamp(2rem,5.4vw,4.6rem)] font-medium uppercase leading-[0.9] tracking-tight text-[var(--fg)]"
                />
              </div>
              <Reveal delay={0.12} className="md:col-span-4">
                <p className="max-w-[36ch] text-[15px] leading-relaxed text-[var(--muted)] md:ml-auto md:text-right">
                  One crew across media, broadcast and operations, so nothing waits on a handover.
                </p>
              </Reveal>
            </div>

            <div className="mt-14 grid grid-cols-1 gap-x-6 gap-y-12 md:mt-20 md:grid-cols-12 md:gap-y-16">
              {page.services.map((s, i) => {
                const cfg = SERVICE_LAYOUT[i]
                const index = String(i + 1).padStart(2, '0')

                return (
                  <Reveal
                    key={s.title}
                    delay={(i % 3) * 0.06}
                    className={`${cfg.span} ${cfg.offset}`}
                  >
                    {cfg.kind === 'image' ? (
                      <article className="group">
                        <div className="relative overflow-hidden rounded-2xl ring-1 ring-inset ring-[var(--line)]">
                          <img
                            src={s.image}
                            alt={`${s.title} by Lens & Legacy`}
                            loading="lazy"
                            className={`w-full ${cfg.ratio} object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.045]`}
                          />
                          <span className="absolute left-4 top-4 rounded-full bg-[var(--bg)]/70 px-3 py-1 font-mono text-[10px] tracking-[0.18em] text-[var(--muted)] backdrop-blur-sm">
                            {index}
                          </span>
                        </div>

                        <div className="mt-5 flex items-start justify-between gap-5 border-t border-[var(--line)] pt-4">
                          <div>
                            <h3 className="font-display text-[clamp(1.8rem,3vw,2.7rem)] font-medium uppercase leading-[0.95] tracking-tight text-[var(--fg)] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1">
                              {s.title}
                            </h3>
                            <p className="mt-3 max-w-[40ch] text-[14px] leading-relaxed text-[var(--muted)]">
                              {s.blurb}
                            </p>
                          </div>
                          <ArrowUpRight
                            weight="bold"
                            className="mt-1 h-5 w-5 shrink-0 text-[var(--faint)] transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[var(--accent)]"
                          />
                        </div>
                      </article>
                    ) : (
                      <article
                        className={`group flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 ${
                          cfg.boxed
                            ? 'glass rounded-2xl p-6 md:min-h-[280px] md:p-7'
                            : 'border-t border-[var(--line)] pt-5'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <span className="font-mono text-[11px] tracking-[0.18em] text-[var(--accent)]">
                            {index}
                          </span>
                          <ArrowUpRight
                            weight="bold"
                            className="h-5 w-5 text-[var(--faint)] transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[var(--accent)]"
                          />
                        </div>

                        <div className="mt-9">
                          <h3 className="font-display text-[clamp(1.8rem,3vw,2.7rem)] font-medium uppercase leading-[0.95] tracking-tight text-[var(--fg)]">
                            {s.title}
                          </h3>
                          <p className="mt-3 max-w-[34ch] text-[14px] leading-relaxed text-[var(--muted)]">
                            {s.blurb}
                          </p>
                        </div>
                      </article>
                    )}
                  </Reveal>
                )
              })}
            </div>
          </div>
        </section>

        {/* ── Approach ─────────────────────────────────────────── */}
        <section
          id="approach"
          className="relative scroll-mt-24 border-t border-[var(--line)] px-5 py-24 md:px-10 md:py-32"
        >
          <div aria-hidden className="texture pointer-events-none absolute inset-0 opacity-30" />
          <Bit
            className="right-8 top-12 hidden h-20 w-20 lg:block"
            delay={0.5}
            duration={14}
            opacity={0.12}
          >
            <LensRing className="h-full w-full" />
          </Bit>

          <div className="relative mx-auto grid max-w-[1200px] grid-cols-1 gap-12 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-4">
              <div className="md:sticky md:top-28">
                <Reveal>
                  <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent)]">
                    Approach
                  </span>
                </Reveal>
                <MaskText
                  as="h2"
                  lines={['A calm', 'run of show.']}
                  className="mt-4 font-display text-[clamp(2.4rem,4.6vw,4rem)] font-medium uppercase leading-[0.9] tracking-tight text-[var(--fg)]"
                />
                <Reveal delay={0.12}>
                  <p className="mt-6 max-w-[32ch] text-[15px] leading-relaxed text-[var(--muted)]">
                    The best coverage is planned quietly and feels effortless on the day.
                  </p>
                </Reveal>
              </div>
            </div>

            <ol className="md:col-span-8">
              {APPROACH.map((step, i) => (
                <Reveal
                  as="li"
                  key={step.title}
                  delay={i * 0.06}
                  className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-3 border-t border-[var(--line)] py-7 md:grid-cols-[4rem_1fr] md:gap-x-8 md:py-9"
                >
                  <span className="font-mono text-[11px] tracking-[0.18em] text-[var(--accent)] md:pt-2">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-display text-[clamp(1.6rem,2.6vw,2.3rem)] font-medium uppercase leading-none tracking-tight text-[var(--fg)]">
                      {step.title}
                    </h3>
                    <p className="mt-3 max-w-[52ch] text-[15px] leading-relaxed text-[var(--muted)]">
                      {step.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* ── Gallery ──────────────────────────────────────────── */}
        <Gallery
          id="work"
          items={page.gallery}
          eyebrow="Gallery"
          title="From the touchline."
          intro="Matchdays, media days and the moments between."
          columns={3}
        />

        {/* ── Testimonial ──────────────────────────────────────── */}
        <section className="relative overflow-hidden border-t border-[var(--line)] bg-[var(--surface)] px-5 py-24 md:px-10 md:py-32">
          <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 md:grid-cols-12">
            <div className="md:col-span-3">
              <Reveal>
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent)]">
                  Kind words
                </span>
              </Reveal>
              <Reveal delay={0.08}>
                <div
                  aria-hidden
                  className="mt-3 font-display text-[clamp(4rem,8vw,7rem)] font-medium leading-[0.8] text-[var(--line-strong)]"
                >
                  “
                </div>
              </Reveal>
            </div>

            <figure className="md:col-span-9">
              <Reveal y={34}>
                <blockquote className="max-w-[24ch] font-display text-[clamp(1.7rem,3.8vw,3.1rem)] font-medium uppercase leading-[1.08] tracking-tight text-[var(--fg)] md:max-w-[28ch]">
                  {page.testimonial.quote}
                </blockquote>
              </Reveal>
              <Reveal delay={0.14}>
                <figcaption className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-[var(--line)] pt-5">
                  <span className="font-display text-[1.05rem] font-medium uppercase tracking-tight text-[var(--fg)]">
                    {page.testimonial.name}
                  </span>
                  <span className="h-1 w-1 rounded-full bg-[var(--accent)]" aria-hidden />
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
                    {page.testimonial.role}
                  </span>
                </figcaption>
              </Reveal>
            </figure>
          </div>
        </section>

        {/* ── Contact ──────────────────────────────────────────── */}
        <section
          id="contact"
          className="relative scroll-mt-24 overflow-hidden border-t border-[var(--line)] px-5 py-24 md:px-10 md:py-32"
        >
          <div aria-hidden className="texture pointer-events-none absolute inset-0 opacity-25" />
          <Bit
            className="left-1/2 top-1/2 hidden h-72 w-72 -translate-x-1/2 -translate-y-1/2 lg:block"
            delay={0.3}
            duration={18}
            opacity={0.06}
          >
            <LensRing className="h-full w-full" />
          </Bit>

          <div className="relative mx-auto max-w-[1000px] text-center">
            <Reveal>
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--accent)]">
                Next fixture
              </span>
            </Reveal>

            <MaskText
              as="h2"
              lines={page.cta.headline}
              className="mt-5 font-display text-[clamp(2.8rem,7.5vw,6rem)] font-medium uppercase leading-[0.88] tracking-tight text-[var(--fg)]"
            />

            <Reveal delay={0.16}>
              <p className="mx-auto mt-6 max-w-[52ch] text-[15px] leading-relaxed text-[var(--muted)] md:text-[16px]">
                {page.cta.sub}
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-9 flex flex-col items-center justify-center gap-5 sm:flex-row">
                <Cta href={mailto} variant="primary" magnetic>
                  Send the fixture list
                </Cta>
                <a
                  href={mailto}
                  className="group inline-flex items-center gap-2 text-[13px] text-[var(--muted)] transition-colors hover:text-[var(--fg)]"
                >
                  {brand.email}
                  <ArrowRight
                    weight="bold"
                    className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1"
                  />
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <PageFooter page={page} onHome={onHome} />
    </>
  )
}
