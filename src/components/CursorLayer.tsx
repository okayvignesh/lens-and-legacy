import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'motion/react'
import { ArrowUpRight } from '@phosphor-icons/react'

/**
 * Global cursor layer.
 *  · a soft, theme-tinted light pool that follows the pointer (transform only)
 *  · a glass label pill that appears over any element with `data-cursor="…"`
 * The native cursor is never hidden, so keyboard/touch and accessibility stay intact.
 */
export default function CursorLayer() {
  const [label, setLabel] = useState<string | null>(null)

  const x = useMotionValue(-9999)
  const y = useMotionValue(-9999)
  const sx = useSpring(x, { stiffness: 160, damping: 22, mass: 0.35 })
  const sy = useSpring(y, { stiffness: 160, damping: 22, mass: 0.35 })

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      const el = (e.target as HTMLElement | null)?.closest?.('[data-cursor]') as HTMLElement | null
      const next = el?.dataset.cursor ?? null
      setLabel((prev) => (prev === next ? prev : next))
    }
    const onOut = (e: PointerEvent) => {
      if (!e.relatedTarget) {
        setLabel(null)
        x.set(-9999)
        y.set(-9999)
      }
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerout', onOut)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerout', onOut)
    }
  }, [x, y])

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[55] hidden [@media(pointer:fine)]:block">
      <motion.div style={{ x: sx, y: sy }} className="absolute left-0 top-0">
        <div className="cursor-glow" />
      </motion.div>

      <AnimatePresence>
        {label && (
          <motion.div
            style={{ x: sx, y: sy }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.26, ease: [0.32, 0.72, 0, 1] }}
            className="absolute left-0 top-0"
          >
            <div className="glass-blur ml-5 mt-5 flex items-center gap-2 rounded-full px-4 py-2 text-[12px] font-medium whitespace-nowrap text-[var(--fg)]">
              {label}
              <ArrowUpRight weight="bold" className="h-3.5 w-3.5 text-[var(--accent)]" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
