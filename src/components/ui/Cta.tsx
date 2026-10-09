import { useRef, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react'
import { ArrowUpRight, ArrowRight } from '@phosphor-icons/react'

type Variant = 'primary' | 'ghost' | 'outline'

/**
 * Theme-aware pill CTA. Colours resolve from the active direction's CSS
 * variables, so the same component reads correctly in every variant.
 * Optional `magnetic` adds pointer physics; `arrow="right"` swaps the glyph.
 */
export default function Cta({
  children,
  href,
  variant = 'primary',
  icon = true,
  arrow = 'up-right',
  magnetic = false,
  className = '',
  onClick,
  ariaLabel,
}: {
  children: ReactNode
  href?: string
  variant?: Variant
  icon?: boolean
  arrow?: 'up-right' | 'right'
  magnetic?: boolean
  className?: string
  onClick?: () => void
  ariaLabel?: string
}) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLAnchorElement>(null)

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 200, damping: 18, mass: 0.4 })
  const y = useSpring(my, { stiffness: 200, damping: 18, mass: 0.4 })
  const pull = magnetic && !reduce ? 0.28 : 0

  const palette: Record<Variant, string> = {
    primary: 'bg-[var(--accent)] text-[var(--accent-ink)] hover:brightness-110',
    ghost: 'text-[var(--fg)] ring-1 ring-inset ring-[var(--line-strong)] hover:bg-[var(--fg)]/5',
    outline: 'text-[var(--fg)] border border-[var(--line-strong)] hover:bg-[var(--fg)]/5',
  }
  const iconPalette: Record<Variant, string> = {
    primary: 'bg-[var(--accent-ink)]/12 text-[var(--accent-ink)]',
    ghost: 'bg-[var(--fg)]/8 text-[var(--fg)]',
    outline: 'bg-[var(--fg)]/8 text-[var(--fg)]',
  }

  const Glyph = arrow === 'right' ? ArrowRight : ArrowUpRight

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={onClick}
      aria-label={ariaLabel}
      style={magnetic && !reduce ? { x, y } : undefined}
      onPointerMove={(e) => {
        if (!pull || !ref.current) return
        const r = ref.current.getBoundingClientRect()
        mx.set((e.clientX - (r.left + r.width / 2)) * pull)
        my.set((e.clientY - (r.top + r.height / 2)) * pull)
      }}
      onPointerLeave={() => {
        mx.set(0)
        my.set(0)
      }}
      whileTap={{ scale: 0.97 }}
      className={`group relative inline-flex items-center gap-3 rounded-full py-2 pl-6 pr-2 text-sm font-medium tracking-tight transition-[color,background-color,filter] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] will-change-transform ${palette[variant]} ${className}`}
    >
      <span className="whitespace-nowrap">{children}</span>
      {icon && (
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-[3px] group-hover:-translate-y-[2px] ${iconPalette[variant]}`}
        >
          <Glyph weight="bold" className="h-4 w-4" />
        </span>
      )}
    </motion.a>
  )
}
