import { useEffect } from 'react'
import { motion } from 'motion/react'
import { themes } from '../lib/themes'
import type { Route } from '../lib/useVariant'

const ORDER: Route[] = ['aurora', 'reel', 'chrome', 'nocturne', 'atelier']

/**
 * Always-visible direction switcher, pinned bottom-centre.
 *  · click any pill, or
 *  · press 1-5 to jump to a direction, or ArrowLeft / ArrowRight to cycle.
 * Sits at 70% opacity so it never fights the page, and lifts to full on hover.
 */
export default function VariantSwitcher({
  current,
  onSelect,
}: {
  current: Route
  onSelect: (r: Route) => void
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null
      if (el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable)) return
      if (e.metaKey || e.ctrlKey || e.altKey) return

      const n = Number(e.key)
      if (n >= 1 && n <= themes.length) {
        onSelect(themes[n - 1].id as Route)
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        const i = Math.max(0, ORDER.indexOf(current))
        const next = (i + (e.key === 'ArrowRight' ? 1 : -1) + ORDER.length) % ORDER.length
        onSelect(ORDER[next])
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [current, onSelect])

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-3 z-50 flex justify-center px-3">
      <div className="glass-blur pointer-events-auto flex items-center gap-0.5 rounded-full p-1 opacity-70 transition-opacity duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:opacity-100 focus-within:opacity-100">
        <span className="hidden pl-2.5 pr-1.5 font-mono text-[10px] tracking-[0.14em] text-[var(--faint)] sm:inline">
          1-{themes.length}
        </span>

        {themes.map((t, i) => {
          const isActive = current === t.id
          return (
            <motion.button
              key={t.id}
              type="button"
              onClick={() => onSelect(t.id as Route)}
              title={`${i + 1} - ${t.name}`}
              aria-current={isActive ? 'true' : undefined}
              whileTap={{ scale: 0.94 }}
              className={`flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[11px] tracking-[0.08em] whitespace-nowrap transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                isActive
                  ? 'bg-[var(--accent)] text-[var(--accent-ink)]'
                  : 'text-[var(--muted)] hover:bg-[var(--fg)]/8 hover:text-[var(--fg)]'
              }`}
            >
              <span className="font-mono">{t.index}</span>
              <span className="hidden lg:inline">{t.name}</span>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
