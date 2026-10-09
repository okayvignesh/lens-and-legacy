import { useReducedMotion } from 'motion/react'

/**
 * The page's single marquee. Breadth of capability, in one moving band.
 * Duplicates its children so the -50% keyframe loops seamlessly.
 */
export default function Marquee({ items }: { items: string[] }) {
  const reduce = useReducedMotion()
  const group = (key: string) => (
    <div key={key} className="flex shrink-0 items-center">
      {items.map((item, i) => (
        <span key={`${key}-${i}`} className="flex items-center">
          <span className="px-6 font-display text-[clamp(1.6rem,4vw,3rem)] font-medium tracking-tight text-[var(--fg)]/90 md:px-10">
            {item}
          </span>
          <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-[var(--accent)]" aria-hidden />
        </span>
      ))}
    </div>
  )

  return (
    <section
      aria-label="What we do"
      className="relative overflow-hidden border-y border-[var(--line)] bg-[var(--surface)] py-8 md:py-12"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[var(--surface)] to-transparent md:w-40" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[var(--surface)] to-transparent md:w-40" />
      <div
        className="flex w-max animate-marquee will-change-transform"
        style={reduce ? { animation: 'none' } : undefined}
      >
        {group('a')}
        {group('b')}
      </div>
    </section>
  )
}
