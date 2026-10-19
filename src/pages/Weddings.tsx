import { useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react'
import { ArrowUpRight, Star } from '@phosphor-icons/react'
import { pages } from '../data/pages'
import { brand } from '../data/site'
import PageNav from '../components/site/PageNav'
import PageFooter from '../components/site/PageFooter'
import Cta from '../components/ui/Cta'
import Gallery from '../components/ui/Gallery'
import { MaskText, Reveal } from '../components/ui/Reveal'
import { Bit, Dot, LensRing } from '../components/ui/Bits'

const EASE = [0.22, 1, 0.36, 1] as const

const MOMENTS = [
  {
    time: '06:30',
    title: 'Getting ready',
    copy: 'The house, the light, the last quiet hour before everyone wakes.',
  },
  {
    time: '10:00',
    title: 'The ceremony',
    copy: 'Vows, rituals, and the faces in the first three rows.',
  },
  {
    time: '17:15',
    title: 'Golden hour',
    copy: 'Twenty borrowed minutes of light, just the two of you.',
  },
  {
    time: '21:30',
    title: 'The last dance',
    copy: 'The floor thins, the song changes, and everyone remembers.',
  },
]

/** An image that drifts gently against the page as it passes. */
function ParallaxImage({
  src,
  alt,
  className = '',
  imgClassName = '',
  distance = 5,
  eager = false,
}: {
  src: string
  alt: string
  className?: string
  imgClassName?: string
  distance?: number
  eager?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [`-${distance}%`, `${distance}%`])

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        style={reduce ? undefined : { y, scale: 1.08 }}
        className={`h-full w-full object-cover ${imgClassName}`}
      />
    </div>
  )
}

export default function Weddings({ onHome }: { onHome: () => void }) {
  const page = pages.weddings
  const reduce = useReducedMotion()

  // Service index: a preview plate that follows the pointer on desktop.
  const listRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState<number | null>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 150, damping: 22, mass: 0.4 })
  const sy = useSpring(my, { stiffness: 150, damping: 22, mass: 0.4 })

  const place = (clientX: number, clientY: number, jump = false) => {
    const rect = listRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = clientX - rect.left
    const y = clientY - rect.top
    mx.set(x)
    my.set(y)
    if (jump) {
      sx.jump(x)
      sy.jump(y)
    }
  }

  const mailto = `mailto:${brand.email}?subject=Wedding%20enquiry`

  return (
    <>
      <PageNav page={page} onHome={onHome} />

      <main id="top" className="relative">
        {/* ── Hero ───────────────────────────────────────────── */}
        <section className="relative min-h-[100dvh] overflow-hidden px-5 pb-16 pt-28 md:px-10 md:pb-20 md:pt-32">
          <Bit
            className="right-8 top-28 hidden h-24 w-24 lg:block"
            delay={0.4}
            duration={14}
            opacity={0.12}
          >
            <LensRing className="h-full w-full" />
          </Bit>

          <div className="mx-auto grid min-h-[calc(100dvh-13rem)] max-w-[1280px] grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-10 lg:gap-16">
            <Reveal y={34} className="relative order-2 md:order-1 md:col-span-5">
              <ParallaxImage
                src={page.hero.image}
                alt="A bride and groom in soft afternoon light at a recent wedding"
                eager
                distance={4}
                className="h-[clamp(300px,48vh,440px)] rounded-[1.75rem] shadow-[0_36px_80px_-46px_rgba(27,24,21,0.45)] ring-1 ring-[var(--line)] md:h-[clamp(440px,66vh,680px)] md:rounded-[2rem]"
              />
              <span className="glass absolute bottom-4 left-4 rounded-full px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted)] md:bottom-5 md:left-5">
                Coorg · 2025
              </span>
              <Bit className="-right-3 top-8 hidden md:block" delay={0.6} duration={11} opacity={0.9}>
                <Dot className="h-2 w-2" />
              </Bit>
            </Reveal>

            <div className="order-1 md:order-2 md:col-span-6 md:col-start-7">
              <Reveal y={16}>
                <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--muted)]">
                  <Dot className="h-1.5 w-1.5" />
                  {page.hero.eyebrow}
                </p>
              </Reveal>

              <MaskText
                as="h1"
                lines={page.hero.headline}
                delay={0.12}
                stagger={0.12}
                className="text-edge mt-5 font-display text-[clamp(3rem,7.2vw,6.2rem)] font-normal leading-[1.03] tracking-[-0.035em] text-[var(--fg)]"
              />

              <Reveal delay={0.34}>
                <p className="mt-6 max-w-[40ch] text-[15px] leading-[1.75] text-[var(--muted)] md:text-[16px]">
                  {page.hero.sub}
                </p>
              </Reveal>

              <Reveal delay={0.44}>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Cta href="#contact">Check your date</Cta>
                  <Cta href="#work" variant="ghost" arrow="right">
                    See the gallery
                  </Cta>
                </div>
              </Reveal>

              <Reveal delay={0.54}>
                <div className="mt-8 flex items-center gap-3">
                  <span className="flex items-center gap-0.5 text-[var(--accent)]" aria-hidden>
                    {[0, 1, 2, 3, 4].map((i) => (
                      <Star key={i} weight="fill" className="h-3.5 w-3.5" />
                    ))}
                  </span>
                  <span className="text-[13px] text-[var(--muted)]">
                    <span className="font-medium text-[var(--fg)]">4.9 / 5</span> from 180+ couples
                  </span>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── The story ──────────────────────────────────────── */}
        <section
          id="story"
          className="relative scroll-mt-24 border-t border-[var(--line)] px-5 py-24 md:scroll-mt-28 md:px-10 md:py-32"
        >
          <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-12 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-7">
              <Reveal>
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
                  The studio
                </span>
              </Reveal>

              <Reveal delay={0.08}>
                <h2 className="text-edge mt-6 max-w-[23ch] font-display text-[clamp(1.65rem,3.2vw,2.65rem)] font-normal leading-[1.32] tracking-[-0.02em] text-[var(--fg)]">
                  {page.intro.lead}
                </h2>
              </Reveal>

              <div className="mt-9 max-w-[54ch] space-y-5">
                {page.intro.body.map((paragraph, i) => (
                  <Reveal key={i} delay={0.12 + i * 0.05}>
                    <p className="text-[15px] leading-[1.8] text-[var(--muted)]">{paragraph}</p>
                  </Reveal>
                ))}
              </div>
            </div>

            <div className="md:col-span-4 md:col-start-9">
              <Reveal y={34}>
                <ParallaxImage
                  src={page.gallery[4].image}
                  alt="A candid moment from the morning of a wedding, surrounded by family"
                  distance={5}
                  className="aspect-[4/5] rounded-2xl ring-1 ring-[var(--line)]"
                />
                <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--muted)]">
                  Her people · Coorg, 2025
                </p>

                <div className="mt-9 border-t border-[var(--line)] pt-6">
                  <p className="font-display text-[1.5rem] font-normal leading-snug tracking-[-0.01em] text-[var(--fg)]">
                    <span className="text-[var(--accent)]" aria-hidden>
                      —{' '}
                    </span>
                    The studio, Lens &amp; Legacy
                  </p>
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
                    Kodagu · Bengaluru · Goa
                  </p>
                </div>
              </Reveal>
            </div>
          </div>

          <div className="mx-auto mt-20 grid max-w-[1200px] grid-cols-2 gap-8 border-t border-[var(--line)] pt-10 md:grid-cols-4">
            {page.stats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.06}>
                <div>
                  <div className="font-display text-[clamp(1.8rem,3vw,2.6rem)] font-normal leading-none tracking-[-0.02em] text-[var(--fg)]">
                    {stat.value}
                  </div>
                  <div className="mt-2.5 text-[13px] text-[var(--muted)]">{stat.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── What we do ─────────────────────────────────────── */}
        <section
          id="services"
          className="relative scroll-mt-24 overflow-x-clip border-t border-[var(--line)] px-5 py-24 md:scroll-mt-28 md:px-10 md:py-32"
        >
          <div className="mx-auto max-w-[1200px]">
            <div className="grid gap-6 md:grid-cols-12 md:items-end">
              <div className="md:col-span-7">
                <Reveal>
                  <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
                    What we do
                  </span>
                </Reveal>
                <MaskText
                  lines={['Everything', 'the day asks for.']}
                  delay={0.06}
                  stagger={0.1}
                  className="text-edge mt-4 font-display text-[clamp(2.3rem,4.8vw,4rem)] font-normal leading-[1.07] tracking-[-0.03em] text-[var(--fg)]"
                />
              </div>
              <Reveal delay={0.16} className="md:col-span-4 md:col-start-9">
                <p className="max-w-[34ch] text-[14px] leading-[1.7] text-[var(--muted)] md:text-right">
                  Six ways we look after the day, from the first quiet hour to the last song.
                </p>
              </Reveal>
            </div>

            <div
              ref={listRef}
              className="relative mt-12 border-t border-[var(--line)]"
              onPointerMove={(e) => {
                if (e.pointerType === 'mouse') place(e.clientX, e.clientY)
              }}
              onPointerLeave={() => setActive(null)}
            >
              <AnimatePresence>
                {active !== null && (
                  <motion.div
                    key="preview"
                    aria-hidden
                    initial={{ opacity: 0, scale: reduce ? 1 : 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: reduce ? 1 : 0.95 }}
                    transition={{ duration: reduce ? 0 : 0.45, ease: EASE }}
                    style={{ x: sx, y: sy }}
                    className="pointer-events-none absolute left-0 top-0 z-20 hidden md:block"
                  >
                    <div className="-translate-x-1/2 -translate-y-1/2 rotate-[-2deg]">
                      <div className="relative aspect-[4/5] w-[218px] overflow-hidden rounded-2xl shadow-[0_30px_60px_-30px_rgba(27,24,21,0.45)] ring-1 ring-[var(--line)]">
                        <AnimatePresence mode="popLayout" initial={false}>
                          <motion.img
                            key={active}
                            src={page.services[active].image}
                            alt=""
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: reduce ? 0 : 0.3 }}
                            className="absolute inset-0 h-full w-full object-cover"
                          />
                        </AnimatePresence>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <ul>
                {page.services.map((service, i) => (
                  <li key={service.title} className="border-b border-[var(--line)]">
                    <a
                      href="#work"
                      data-cursor="View"
                      aria-label={`${service.title} — view it in the gallery`}
                      onPointerEnter={(e) => {
                        if (e.pointerType !== 'mouse') return
                        if (active === null) place(e.clientX, e.clientY, true)
                        setActive(i)
                      }}
                      className="group grid grid-cols-[2.2rem_1fr_auto] items-baseline gap-x-4 gap-y-2 py-7 md:grid-cols-[3.5rem_minmax(0,1fr)_minmax(0,18rem)_auto] md:gap-x-8 md:py-9"
                    >
                      <span className="font-mono text-[11px] tabular-nums tracking-[0.08em] text-[var(--muted)]">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="font-display text-[clamp(1.5rem,2.7vw,2.2rem)] font-normal leading-[1.1] tracking-[-0.025em] text-[var(--fg)] transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:text-[var(--accent)] group-focus-visible:text-[var(--accent)]">
                        {service.title}
                      </span>
                      <span className="col-start-2 row-start-2 text-[14px] leading-[1.65] text-[var(--muted)] md:col-span-1 md:col-start-3 md:row-start-1 md:max-w-[34ch]">
                        {service.blurb}
                      </span>
                      <ArrowUpRight
                        weight="bold"
                        className="col-start-3 row-start-1 h-4 w-4 -translate-x-1 text-[var(--muted)] opacity-0 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 md:col-start-4"
                        aria-hidden
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── The day, hour by hour ──────────────────────────── */}
        <section className="relative overflow-hidden border-y border-[var(--line)] bg-[var(--surface)] px-5 py-24 md:px-10 md:py-32">
          <div className="mx-auto max-w-[1200px]">
            <div className="grid gap-6 md:grid-cols-12 md:items-end">
              <div className="md:col-span-8">
                <Reveal>
                  <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
                    The day, hour by hour
                  </span>
                </Reveal>
                <MaskText
                  lines={['A day, unhurried.']}
                  delay={0.06}
                  className="text-edge mt-4 font-display text-[clamp(2.2rem,4.4vw,3.8rem)] font-normal leading-[1.08] tracking-[-0.03em] text-[var(--fg)]"
                />
              </div>
              <Reveal delay={0.16} className="md:col-span-4">
                <p className="max-w-[32ch] text-[14px] leading-[1.7] text-[var(--muted)] md:text-right">
                  No shot list taped to the wall. We follow the day and step in only when we are
                  needed.
                </p>
              </Reveal>
            </div>

            <div className="relative mt-14 md:mt-16">
              <span
                aria-hidden
                className="absolute bottom-2 left-[4px] top-2 w-px bg-[var(--line)] md:hidden"
              />
              <span
                aria-hidden
                className="absolute left-0 right-0 top-[5px] hidden h-px bg-[var(--line)] md:block"
              />

              <ol className="grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-6">
                {MOMENTS.map((moment, i) => (
                  <Reveal as="li" key={moment.title} delay={i * 0.08} className="relative pl-8 md:pl-0">
                    <span
                      aria-hidden
                      className="absolute left-0 top-1 h-2.5 w-2.5 rounded-full bg-[var(--accent)] ring-4 ring-[var(--surface)] md:top-0"
                    />
                    <span className="block pt-6 font-mono text-[11px] tabular-nums tracking-[0.16em] text-[var(--muted)] md:pt-7">
                      {moment.time}
                    </span>
                    <h3 className="mt-3 font-display text-[1.45rem] font-normal leading-tight tracking-[-0.02em] text-[var(--fg)]">
                      {moment.title}
                    </h3>
                    <p className="mt-2.5 max-w-[30ch] text-[14px] leading-[1.7] text-[var(--muted)]">
                      {moment.copy}
                    </p>
                  </Reveal>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* ── Gallery ────────────────────────────────────────── */}
        <Gallery
          id="work"
          items={page.gallery}
          eyebrow="Gallery"
          title="Moments we kept."
          intro="A few frames from recent weddings."
          columns={3}
        />

        {/* ── Testimonial ────────────────────────────────────── */}
        <section
          aria-labelledby="kind-words"
          className="relative overflow-hidden border-t border-[var(--line)] px-5 py-28 md:px-10 md:py-40"
        >
          <Bit
            className="left-8 top-16 hidden h-20 w-20 lg:block"
            delay={0.3}
            duration={15}
            opacity={0.1}
          >
            <LensRing className="h-full w-full" />
          </Bit>

          <figure className="mx-auto max-w-[1000px] text-center">
            <Reveal>
              <span
                id="kind-words"
                className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]"
              >
                Kind words
              </span>
            </Reveal>

            <Reveal delay={0.08}>
              <span
                aria-hidden
                className="pointer-events-none mt-6 block select-none font-display text-[7rem] leading-[0.4] text-[var(--accent)] opacity-[0.14]"
              >
                “
              </span>
            </Reveal>

            <Reveal delay={0.1}>
              <blockquote className="text-edge mx-auto mt-10 max-w-[26ch] font-display text-[clamp(1.75rem,4.1vw,3.15rem)] font-normal leading-[1.28] tracking-[-0.02em] text-[var(--fg)]">
                {page.testimonial.quote}
              </blockquote>
            </Reveal>

            <figcaption className="mt-9 text-[13px] text-[var(--muted)]">
              <Reveal delay={0.2}>
                <span>
                  <span className="font-medium text-[var(--fg)]">{page.testimonial.name}</span>
                  <span aria-hidden> · </span>
                  {page.testimonial.role}
                </span>
              </Reveal>
            </figcaption>
          </figure>
        </section>

        {/* ── Contact ────────────────────────────────────────── */}
        <section
          id="contact"
          className="scroll-mt-24 px-5 pb-24 pt-4 md:scroll-mt-28 md:px-10 md:pb-32 md:pt-8"
        >
          <div className="relative mx-auto max-w-[1200px] overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] px-6 py-20 text-center shadow-[0_40px_90px_-60px_rgba(27,24,21,0.4)] md:rounded-[2.5rem] md:px-16 md:py-28">
            <Bit
              className="right-8 top-8 hidden h-20 w-20 lg:block"
              delay={0.4}
              duration={13}
              opacity={0.14}
            >
              <LensRing className="h-full w-full" />
            </Bit>
            <Bit
              className="bottom-10 left-10 hidden h-2 w-2 lg:block"
              delay={0.9}
              duration={10}
              opacity={0.9}
            >
              <Dot className="h-2 w-2" />
            </Bit>

            <Reveal>
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
                Enquiries
              </span>
            </Reveal>

            <MaskText
              as="h2"
              lines={page.cta.headline}
              delay={0.08}
              stagger={0.1}
              className="text-edge mx-auto mt-5 font-display text-[clamp(2.4rem,5.8vw,4.8rem)] font-normal leading-[1.06] tracking-[-0.03em] text-[var(--fg)]"
            />

            <Reveal delay={0.22}>
              <p className="mx-auto mt-6 max-w-[46ch] text-[15px] leading-[1.75] text-[var(--muted)]">
                {page.cta.sub}
              </p>
            </Reveal>

            <Reveal delay={0.32}>
              <div className="mt-9 flex flex-col items-center gap-4">
                <Cta href={mailto} className="!py-3 !pl-7">
                  Check your date
                </Cta>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
                  We reply within two working days
                </span>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <PageFooter page={page} onHome={onHome} />
    </>
  )
}
