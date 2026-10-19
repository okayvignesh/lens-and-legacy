import type { ReactNode } from 'react'

/** A floating decorative element. Thin, quiet, and pointer-transparent. */
export function Bit({
  children,
  className = '',
  delay = 0,
  duration = 9,
  opacity = 0.18,
}: {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  opacity?: number
}) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute ${className}`}
      style={{
        color: 'var(--fg)',
        opacity,
        animation: `float ${duration}s ease-in-out ${delay}s infinite`,
      }}
    >
      {children}
    </span>
  )
}

export function LensRing({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" aria-hidden>
      <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="1" />
      <circle cx="50" cy="50" r="24" stroke="currentColor" strokeWidth="1" opacity="0.55" />
      <path
        d="M50 4v14M50 82v14M4 50h14M82 50h14"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function FilmFrame({ className = '' }: { className?: string }) {
  const holes = [12, 30, 48, 66, 84, 102]
  return (
    <svg viewBox="0 0 120 80" className={className} fill="none" aria-hidden>
      <rect x="1" y="1" width="118" height="78" rx="7" stroke="currentColor" strokeWidth="1" />
      {holes.map((x) => (
        <rect key={`t${x}`} x={x} y="6" width="6" height="8" rx="1.5" fill="currentColor" opacity="0.5" />
      ))}
      {holes.map((x) => (
        <rect key={`b${x}`} x={x} y="66" width="6" height="8" rx="1.5" fill="currentColor" opacity="0.5" />
      ))}
      <rect x="14" y="22" width="92" height="36" rx="2" stroke="currentColor" strokeWidth="1" opacity="0.55" />
    </svg>
  )
}

export function ApertureMark({ className = '' }: { className?: string }) {
  const spokes = [0, 60, 120, 180, 240, 300]
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" aria-hidden>
      <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="1" />
      {spokes.map((a) => {
        const r = (a * Math.PI) / 180
        return (
          <line
            key={a}
            x1="50"
            y1="50"
            x2={50 + 42 * Math.cos(r)}
            y2={50 + 42 * Math.sin(r)}
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.6"
          />
        )
      })}
    </svg>
  )
}

export function Dot({ className = '' }: { className?: string }) {
  return <span className={`block h-1.5 w-1.5 rounded-full bg-[var(--accent)] ${className}`} aria-hidden />
}
