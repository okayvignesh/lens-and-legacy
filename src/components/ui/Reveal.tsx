import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'

const EASE = [0.16, 1, 0.3, 1] as const

type RevealProps = {
  children: ReactNode
  className?: string
  /** seconds */
  delay?: number
  /** travel distance in px */
  y?: number
  as?: 'div' | 'li' | 'span' | 'section'
}

/** Gentle, heavy fade-up as an element enters the viewport. */
export function Reveal({ children, className, delay = 0, y = 26, as = 'div' }: RevealProps) {
  const reduce = useReducedMotion()
  const Comp = motion[as]

  return (
    <Comp
      className={className}
      initial={reduce ? false : { opacity: 0, y, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </Comp>
  )
}

type MaskTextProps = {
  lines: string[]
  className?: string
  /** seconds between lines */
  stagger?: number
  /** seconds before the first line */
  delay?: number
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'div'
}

/**
 * Display type that rises from behind a mask, line by line.
 * Each line needs its own overflow-hidden wrapper so descenders clip cleanly.
 */
export function MaskText({
  lines,
  className,
  stagger = 0.09,
  delay = 0,
  as = 'h2',
}: MaskTextProps) {
  const reduce = useReducedMotion()
  const Comp = motion[as]

  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.14em]">
          <motion.span
            className="block will-change-transform"
            variants={{
              hidden: reduce ? { y: 0 } : { y: '115%' },
              show: { y: '0%', transition: { duration: 1.05, ease: EASE } },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Comp>
  )
}
