import { lazy, Suspense, useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import { hero, CTA_PRIMARY, CTA_WORK } from '../../data/site'
import { MaskText, Reveal } from '../ui/Reveal'
import Cta from '../ui/Cta'
import { Bit, FilmFrame } from '../ui/Bits'

// The 3D rig is heavy; let the layout paint before three.js arrives.
const CameraStage = lazy(() => import('../World'))

export default function Hero() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 90])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section ref={ref} className="relative min-h-[100dvh] overflow-hidden pt-24 md:pt-24">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(58% 50% at 76% 42%, color-mix(in oklab, var(--accent) 10%, transparent), transparent 70%)',
          }}
        />
        <div className="texture absolute inset-0 opacity-40" />
      </div>

      <Bit className="left-6 top-28 hidden h-9 w-14 lg:block" delay={0.6} duration={12} opacity={0.14}>
        <FilmFrame className="h-full w-full" />
      </Bit>

      <div className="relative mx-auto grid min-h-[calc(100dvh-6rem)] max-w-[1200px] grid-cols-1 items-center gap-10 px-5 md:grid-cols-12 md:gap-6 md:px-10">
        <motion.div style={{ y, opacity }} className="md:col-span-6">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
              {hero.eyebrow}
            </span>
          </Reveal>

          <MaskText
            as="h1"
            lines={hero.headline}
            delay={0.12}
            className="mt-5 font-display text-[clamp(2.8rem,7.2vw,6rem)] font-semibold leading-[0.94] tracking-[-0.035em] text-[var(--fg)] text-edge"
          />

          <Reveal delay={0.4}>
            <p className="mt-7 max-w-[40ch] text-[16px] leading-relaxed text-[var(--muted)]">
              {hero.sub}
            </p>
          </Reveal>

          <Reveal delay={0.5}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Cta href="#contact" variant="primary" magnetic>
                {CTA_PRIMARY}
              </Cta>
              <Cta href="#gallery" variant="ghost" arrow="right">
                {CTA_WORK}
              </Cta>
            </div>
          </Reveal>

          <Reveal delay={0.62}>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-2 text-[12px]">
              {hero.meta.map((m) => (
                <span key={m.k} className="flex items-baseline gap-2">
                  <span className="uppercase tracking-[0.18em] text-[var(--faint)]">{m.k}</span>
                  <span className="text-[var(--muted)]">{m.v}</span>
                </span>
              ))}
            </div>
          </Reveal>
        </motion.div>

        <div className="relative h-[46vh] md:col-span-6 md:h-[76vh]">
          <Suspense fallback={null}>
            <CameraStage />
          </Suspense>
          <span className="pointer-events-none absolute bottom-2 left-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--faint)]">
            On set · Studio camera
          </span>
        </div>
      </div>
    </section>
  )
}
