import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'motion/react'
import { ArrowUpRight } from '@phosphor-icons/react'

/**
 * Cursor layer:
 *  · a soft light pool that trails the pointer
 *  · a small cobalt dot that scales up over anything interactive
 *  · a glass label pill over elements with `data-cursor="…"`
 * The native cursor is never hidden.
 */
export default function CursorLayer() {
  const [label, setLabel] = useState<string | null>(null)
  const [interactive, setInteractive] = useState(false)

  const x = useMotionValue(-9999)
  const y = useMotionValue(-9999)
  const glowX = useSpring(x, { stiffness: 110, damping: 20, mass: 0.5 })
  const glowY = useSpring(y, { stiffness: 110, damping: 20, mass: 0.5 })
  const dotX = useSpring(x, { stiffness: 600, damping: 38, mass: 0.15 })
  const dotY = useSpring(y, { stiffness: 600, damping: 38, mass: 0.15 })

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      const el = (e.target as Element | null)?.closest?.('a, button, [data-cursor]') as HTMLElement | null
      const nextLabel = el?.dataset.cursor ?? null
      setLabel((prev) => (prev === nextLabel ? prev : nextLabel))
      setInteractive((prev) => (prev === !!el ? prev : !!el))
    }
    const onOut = (e: PointerEvent) => {
      if (!e.relatedTarget) {
        setLabel(null)
        setInteractive(false)
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
      <motion.div style={{ x: glowX, y: glowY }} className="absolute left-0 top-0">
        <div className="cursor-glow" />
      </motion.div>

      <motion.div style={{ x: dotX, y: dotY }} className="absolute left-0 top-0">
        <motion.div
          animate={{ scale: interactive ? 2.4 : 1, opacity: interactive ? 0.55 : 1 }}
          transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
          className="h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--accent)]"
        />
      </motion.div>

      <AnimatePresence>
        {label && (
          <motion.div
            style={{ x: dotX, y: dotY }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.24, ease: [0.32, 0.72, 0, 1] }}
            className="absolute left-0 top-0"
          >
            <div className="glass-blur ml-4 mt-4 flex items-center gap-2 rounded-full px-4 py-2 text-[12px] font-medium whitespace-nowrap text-[var(--fg)]">
              {label}
              <ArrowUpRight weight="bold" className="h-3.5 w-3.5 text-[var(--accent)]" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
