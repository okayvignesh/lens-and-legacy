import { useReducedMotion } from 'motion/react'

const hole = { background: 'color-mix(in oklab, var(--fg) 22%, transparent)' }

/**
 * A single running film-perforation edge along the very bottom.
 * No band, no frames, no blur: one row of small sprocket holes that drifts
 * slowly and fades out at both ends. A quiet material detail.
 */
export default function FilmStrip() {
  const reduce = useReducedMotion()
  const holes = Array.from({ length: 70 })

  const row = (key: string) => (
    <div key={key} className="flex shrink-0 items-center gap-8">
      {holes.map((_, i) => (
        <span key={`${key}-${i}`} className="h-[7px] w-3.5 shrink-0 rounded-[2px]" style={hole} />
      ))}
    </div>
  )

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 bottom-0 z-30 h-6"
      style={{
        maskImage: 'linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent)',
        WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent)',
      }}
    >
      <div
        className="flex h-full w-max animate-marquee items-center"
        style={reduce ? { animation: 'none' } : undefined}
      >
        {row('a')}
        {row('b')}
      </div>
    </div>
  )
}
