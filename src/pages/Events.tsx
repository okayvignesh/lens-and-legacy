import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { pages } from '../data/pages'
import { brand, CTA_PRIMARY } from '../data/site'
import PageNav from '../components/site/PageNav'
import PageFooter from '../components/site/PageFooter'
import { MaskText, Reveal } from '../components/ui/Reveal'
import Cta from '../components/ui/Cta'
import Gallery from '../components/ui/Gallery'
import { Bit, Dot, LensRing } from '../components/ui/Bits'

const CARD_SPAN = [
  'md:col-span-1 lg:col-span-7',
  'md:col-span-1 lg:col-span-5',
  'md:col-span-1 lg:col-span-4',
  'md:col-span-1 lg:col-span-4',
  'md:col-span-1 lg:col-span-4',
  'md:col-span-2 lg:col-span-12',
]

const CARD_ASPECT = [
  'aspect-[16/10]',
  'aspect-[16/10]',
  'aspect-[4/3]',
  'aspect-[4/3]',
  'aspect-[4/3]',
  'aspect-[16/9] lg:aspect-[21/8]',
]

const STEPS = [
  {
    title: 'Brief',
    copy: 'A call, the date and the room. We listen for what the occasion actually needs, then put it in writing.',
  },
  {
    title: 'Plan & crew',
    copy: 'A run-of-show, a shot list and the right crew, agreed before the day so the room can simply happen.',
  },
  {
    title: 'Deliver',
    copy: 'A teaser inside 48 hours, the full set shortly after. Organised, backed up and yours to keep.',
  },
]

export default function Events({ onHome }: { onHome: () => void }) {
  const page = pages.events
  const reduce = useReducedMotion()
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 40])

  return (
    <>
      <PageNav page={page} onHome={onHome} />

      <main id="top" className="relative">
        {/* ── Hero ─────────────────────────────────────────────── */}
        <section
          ref={heroRef}
          className="relative flex min-h-[100dvh] items-center overflow-hidden px-5 pb-16 pt-28 md:px-10 md:pt-32"
        >
          <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-6">
              <Reveal>
                <p className="flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]">
                  <Dot />
                  {page.hero.eyebrow}
                </p>
              </Reveal>

              <div className="mt-5">
                <h1 className="sr-only">{page.hero.headline.join(' ')}</h1>
                <div aria-hidden>
                  <MaskText
                    as="div"
                    lines={[page.hero.headline[0]]}
                    delay={0.08}
                    className="font-display text-[clamp(2.3rem,5.6vw,4.8rem)] font-medium leading-[0.92] tracking-[-0.045em] text-[var(--fg)]"
                  />
                  <MaskText
                    as="div"
                    lines={[page.hero.headline[1]]}
                    delay={0.16}
                    className="font-display text-[clamp(2.3rem,5.6vw,4.8rem)] font-semibold leading-[0.92] tracking-[-0.045em] text-[var(--accent)]"
                  />
                </div>
              </div>

              <Reveal delay={0.34}>
                <p className="mt-6 max-w-[42ch] text-[16px] leading-relaxed text-[var(--muted)]">
                  {page.hero.sub}
                </p>
              </Reveal>

              <Reveal delay={0.44}>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Cta href="#contact" variant="primary" magnetic>
                    {CTA_PRIMARY}
                  </Cta>
                  <Cta href="#work" variant="ghost" arrow="right">
                    See the work
                  </Cta>
                </div>
              </Reveal>

              <Reveal delay={0.56}>
                <div className="mt-10 grid max-w-[27rem] grid-cols-3 gap-4 border-t border-[var(--line)] pt-5">
                  {page.hero.meta.map((m) => (
                    <div key={m.k}>
                      <div className="font-display text-[1.45rem] font-semibold leading-none tracking-[-0.02em] text-[var(--fg)]">
                        {m.v}
                      </div>
                      <div className="mt-2 font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--muted)]">
                        {m.k}
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            <Reveal y={34} delay={0.18} className="md:col-span-6">
              <div className="relative h-[44vh] min-h-[300px] overflow-hidden rounded-[1.35rem] bg-[var(--surface)] ring-1 ring-inset ring-[var(--line)] md:h-[66vh] lg:h-[70vh]">
                <motion.img
                  src={page.hero.image}
                  alt={`${page.name}, ${page.hero.eyebrow}`}
                  fetchPriority="high"
                  style={reduce ? undefined : { y: imageY }}
                  className="absolute inset-x-0 -top-[12%] h-[124%] w-full object-cover"
                />
                <span className="glass absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--fg)]">
                  <Dot />
                  Booking 2026
                </span>
              </div>
              <div className="mt-3 flex items-center justify-between gap-4 font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--muted)]">
                <span>Occasion coverage</span>
                <span>Stage &amp; room</span>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Intro ────────────────────────────────────────────── */}
        <section className="border-t border-[var(--line)] px-5 py-24 md:px-10 md:py-32">
          <div className="mx-auto max-w-[1200px]">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
              <div className="md:col-span-5">
                <Reveal>
                  <p className="flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--accent)]">
                    <Dot />
                    The brief
                  </p>
                </Reveal>
                <Reveal delay={0.08}>
                  <p className="mt-5 max-w-[24ch] font-display text-[clamp(1.6rem,2.8vw,2.3rem)] font-medium leading-[1.14] tracking-[-0.03em] text-[var(--fg)]">
                    {page.intro.lead}
                  </p>
                </Reveal>
              </div>

              <div className="md:col-span-6 md:col-start-7 md:border-l md:border-[var(--line)] md:pl-10">
                <Reveal delay={0.14}>
                  <div className="space-y-5">
                    {page.intro.body.map((paragraph, i) => (
                      <p
                        key={i}
                        className={`text-[15px] leading-[1.75] ${
                          i === 0 ? 'text-[var(--fg)]' : 'text-[var(--muted)]'
                        }`}
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </Reveal>
              </div>
            </div>

            <Reveal delay={0.1}>
              <div className="mt-16 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-[var(--line)] pt-8 md:mt-20 md:grid-cols-4">
                {page.stats.map((stat) => (
                  <div key={stat.label}>
                    <div className="font-display text-[clamp(1.9rem,3.2vw,2.5rem)] font-semibold leading-none tracking-[-0.03em] text-[var(--fg)]">
                      {stat.value}
                    </div>
                    <div className="mt-2 font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--muted)]">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Occasions ────────────────────────────────────────── */}
        <section
          id="services"
          aria-labelledby="occasions-title"
          className="border-t border-[var(--line)] px-5 py-24 md:px-10 md:py-32"
        >
          <div className="mx-auto max-w-[1200px]">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <Reveal>
                  <p className="flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--accent)]">
                    <Dot />
                    Occasions
                  </p>
                </Reveal>
                <Reveal delay={0.06}>
                  <h2
                    id="occasions-title"
                    className="mt-4 max-w-[15ch] font-display text-[clamp(2.1rem,5vw,3.8rem)] font-medium leading-[0.98] tracking-[-0.035em] text-[var(--fg)]"
                  >
                    Every kind of room.
                  </h2>
                </Reveal>
              </div>
              <Reveal delay={0.12}>
                <p className="max-w-[38ch] text-[15px] leading-relaxed text-[var(--muted)] md:text-right">
                  Six ways in, one standard of coverage. Each booking is planned around the room, the
                  run-of-show and the people in it.
                </p>
              </Reveal>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-12">
              {page.services.map((service, i) => {
                const wide = i === 5
                return (
                  <Reveal
                    key={service.title}
                    delay={(i % 3) * 0.06}
                    className={CARD_SPAN[i]}
                  >
                    <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-[var(--surface)] ring-1 ring-inset ring-[var(--line)] transition duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:ring-[var(--line-strong)] motion-safe:hover:-translate-y-1">
                      <div className="relative overflow-hidden">
                        <img
                          src={service.image}
                          alt={`${service.title} coverage by ${brand.name}`}
                          loading="lazy"
                          decoding="async"
                          className={`w-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.32,0.72,0,1)] motion-safe:group-hover:scale-[1.04] ${CARD_ASPECT[i]}`}
                        />
                        <span className="absolute left-4 top-4 rounded-full bg-[var(--bg)]/85 px-2.5 py-1 font-mono text-[10px] tabular-nums tracking-[0.16em] text-[var(--muted)] backdrop-blur-sm">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                      </div>

                      <div
                        className={`flex flex-1 flex-col p-5 md:p-6 ${
                          wide
                            ? 'lg:flex-row lg:items-start lg:justify-between lg:gap-16 lg:p-8'
                            : ''
                        }`}
                      >
                        <h3
                          className={`font-display font-semibold leading-[1.1] tracking-[-0.02em] text-[var(--fg)] ${
                            i === 0
                              ? 'text-[clamp(1.3rem,2vw,1.6rem)]'
                              : 'text-[1.15rem]'
                          }`}
                        >
                          {service.title}
                        </h3>
                        <p
                          className={`mt-2 max-w-[38ch] text-[14px] leading-relaxed text-[var(--muted)] ${
                            wide ? 'lg:mt-0 lg:max-w-[46ch]' : ''
                          }`}
                        >
                          {service.blurb}
                        </p>
                      </div>
                    </article>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </section>

        {/* ── How it runs ──────────────────────────────────────── */}
        <section
          id="approach"
          aria-labelledby="approach-title"
          className="border-t border-[var(--line)] px-5 py-24 md:px-10 md:py-32"
        >
          <div className="mx-auto max-w-[1200px]">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:items-end">
              <div className="md:col-span-7">
                <Reveal>
                  <p className="flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--accent)]">
                    <Dot />
                    Approach
                  </p>
                </Reveal>
                <Reveal delay={0.06}>
                  <h2
                    id="approach-title"
                    className="mt-4 font-display text-[clamp(2.1rem,5vw,3.8rem)] font-medium leading-[0.98] tracking-[-0.035em] text-[var(--fg)]"
                  >
                    How it runs.
                  </h2>
                </Reveal>
              </div>
              <Reveal delay={0.12} className="md:col-span-5">
                <p className="max-w-[40ch] text-[15px] leading-relaxed text-[var(--muted)] md:ml-auto md:text-right">
                  A clear sequence, agreed before the day, so nothing is left to the room.
                </p>
              </Reveal>
            </div>

            <div className="relative mt-14">
              <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-[var(--line)]" />
              <ol className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
                {STEPS.map((step, i) => (
                  <Reveal key={step.title} as="li" delay={i * 0.08} className="relative pt-8">
                    <span
                      aria-hidden
                      className="absolute -top-[3px] left-0 h-[7px] w-[7px] rounded-full bg-[var(--accent)]"
                    />
                    <span className="font-mono text-[10px] tabular-nums tracking-[0.18em] text-[var(--accent)]">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="mt-3 font-display text-[1.4rem] font-semibold tracking-[-0.02em] text-[var(--fg)]">
                      {step.title}
                    </h3>
                    <p className="mt-2.5 max-w-[34ch] text-[14px] leading-relaxed text-[var(--muted)]">
                      {step.copy}
                    </p>
                  </Reveal>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* ── Gallery ──────────────────────────────────────────── */}
        <Gallery
          id="work"
          items={page.gallery}
          eyebrow="Gallery"
          title="Rooms we have kept."
          intro="Corporate stages, campuses, podcasts and family milestones."
          columns={3}
          className="border-t border-[var(--line)]"
        />

        {/* ── Testimonial ──────────────────────────────────────── */}
        <section
          aria-labelledby="words-title"
          className="relative border-t border-[var(--line)] px-5 py-24 md:px-10 md:py-32"
        >
          <Bit
            className="right-8 top-10 hidden h-20 w-20 lg:block"
            delay={0.4}
            duration={13}
            opacity={0.1}
          >
            <LensRing className="h-full w-full" />
          </Bit>

          <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-8 md:grid-cols-12 md:gap-6">
            <div className="md:col-span-3">
              <h2
                id="words-title"
                className="flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--accent)]"
              >
                <Dot />
                Kind words
              </h2>
              <div aria-hidden className="mt-5 hidden h-px w-12 bg-[var(--line-strong)] md:block" />
            </div>

            <div className="md:col-span-8 md:col-start-5">
              <Reveal>
                <figure>
                  <blockquote>
                    <p className="font-display text-[clamp(1.65rem,3.4vw,2.9rem)] font-medium leading-[1.18] tracking-[-0.03em] text-[var(--fg)]">
                      “{page.testimonial.quote}”
                    </p>
                  </blockquote>
                  <figcaption className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px]">
                    <span className="font-medium text-[var(--fg)]">{page.testimonial.name}</span>
                    <span aria-hidden className="h-3 w-px bg-[var(--line-strong)]" />
                    <span className="text-[var(--muted)]">{page.testimonial.role}</span>
                  </figcaption>
                </figure>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── Contact CTA ──────────────────────────────────────── */}
        <section id="contact" className="px-5 pb-24 pt-4 md:px-10 md:pb-32 md:pt-6">
          <div className="mx-auto max-w-[1200px]">
            <div className="relative overflow-hidden rounded-[1.5rem] bg-[var(--surface)] px-6 py-14 ring-1 ring-inset ring-[var(--line)] md:px-14 md:py-20">
              <div aria-hidden className="texture-grid pointer-events-none absolute inset-0 opacity-60" />
              <Bit
                className="-right-6 -top-6 hidden h-40 w-40 lg:block"
                delay={0.2}
                duration={14}
                opacity={0.09}
              >
                <LensRing className="h-full w-full" />
              </Bit>

              <div className="relative grid grid-cols-1 gap-10 md:grid-cols-12 md:items-end md:gap-8">
                <div className="md:col-span-7">
                  <Reveal>
                    <p className="flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--accent)]">
                      <Dot />
                      Next occasion
                    </p>
                  </Reveal>
                  <MaskText
                    as="h2"
                    lines={page.cta.headline}
                    delay={0.08}
                    className="mt-5 font-display text-[clamp(2.1rem,5.4vw,4.6rem)] font-semibold leading-[0.94] tracking-[-0.04em] text-[var(--fg)]"
                  />
                </div>

                <div className="md:col-span-5">
                  <Reveal delay={0.16}>
                    <p className="max-w-[36ch] text-[15px] leading-relaxed text-[var(--muted)]">
                      {page.cta.sub}
                    </p>
                  </Reveal>
                  <Reveal delay={0.24}>
                    <div className="mt-7">
                      <Cta href={`mailto:${brand.email}`} variant="primary" magnetic>
                        {CTA_PRIMARY}
                      </Cta>
                    </div>
                  </Reveal>
                  <Reveal delay={0.3}>
                    <p className="mt-5 text-[12px] text-[var(--muted)]">
                      Or write to{' '}
                      <a
                        href={`mailto:${brand.email}`}
                        className="underline decoration-[var(--line-strong)] underline-offset-4 transition-colors hover:text-[var(--fg)]"
                      >
                        {brand.email}
                      </a>
                    </p>
                  </Reveal>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <PageFooter page={page} onHome={onHome} />
    </>
  )
}
