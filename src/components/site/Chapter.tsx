import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import type { Pillar } from '../../data/site'
import { MaskText, Reveal } from '../ui/Reveal'
import { Bit, LensRing, Dot } from '../ui/Bits'

/** One of the three pillars, as an editorial image-and-story chapter. */
export default function Chapter({ pillar, flip = false }: { pillar: Pillar; flip?: boolean }) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  return (
    <section
      id={pillar.id}
      ref={ref}
      className="relative border-t border-[var(--line)] px-5 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-12 md:grid-cols-12 md:items-center">
        <Reveal y={40} className={`relative md:col-span-5 ${flip ? 'md:order-2 md:col-start-8' : ''}`}>
          <Bit className="-left-7 -top-7 h-16 w-16" delay={0.2} duration={10}>
            <LensRing className="h-full w-full" />
          </Bit>
          <Bit className="-right-3 bottom-10" delay={1.3} duration={12} opacity={0.85}>
            <Dot className="h-2 w-2" />
          </Bit>
          <div className="relative overflow-hidden rounded-2xl ring-1 ring-[var(--line)]">
            <motion.img
              src={pillar.image}
              alt={`${pillar.title} by Lens & Legacy`}
              loading="lazy"
              style={reduce ? undefined : { y: imgY, scale: 1.08 }}
              className="aspect-[4/5] w-full object-cover"
            />
            <span className="absolute left-4 top-4 rounded-full bg-[var(--bg)]/85 px-3 py-1 font-mono text-[10px] tracking-[0.18em] text-[var(--muted)] backdrop-blur-sm">
              {pillar.index}
            </span>
          </div>
        </Reveal>

        <div className={`md:col-span-6 ${flip ? 'md:order-1 md:col-start-1' : 'md:col-start-7'}`}>
          <Reveal>
            <p className="font-mono text-[11px] uppercase leading-relaxed tracking-[0.16em] text-[var(--accent)]">
              {pillar.eyebrow}
            </p>
          </Reveal>

          <MaskText
            as="h2"
            lines={[pillar.title]}
            delay={0.05}
            className="mt-4 font-display text-[clamp(2.4rem,5.4vw,4.4rem)] font-semibold leading-[0.96] tracking-[-0.03em] text-[var(--fg)]"
          />

          <Reveal delay={0.12}>
            <p className="mt-6 max-w-[44ch] text-[clamp(1.1rem,1.9vw,1.35rem)] leading-[1.5] text-[var(--fg)]">
              {pillar.lead}
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-5 space-y-4">
              {pillar.body.map((p, i) => (
                <p key={i} className="max-w-[60ch] text-[15px] leading-relaxed text-[var(--muted)]">
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
