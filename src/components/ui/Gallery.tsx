import { useCallback, useEffect, useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { CaretLeft, CaretRight, X } from '@phosphor-icons/react'
import { Reveal } from './Reveal'
import { lockScroll } from '../../lib/scroll'

export type GalleryItem = { title: string; category: string; year: string; image: string }

/**
 * A proper gallery: a responsive masonry of images that opens into a keyboard
 * accessible lightbox. Colours resolve from the active direction's tokens, so
 * the same section reads correctly in every theme.
 */
export default function Gallery({
  items,
  id = 'gallery',
  eyebrow = 'Gallery',
  title = 'Selected frames',
  intro,
  action,
  columns = 3,
  className = '',
}: {
  items: GalleryItem[]
  id?: string
  eyebrow?: string
  title?: string
  intro?: string
  action?: ReactNode
  columns?: 2 | 3 | 4
  className?: string
}) {
  const [open, setOpen] = useState<number | null>(null)

  const close = useCallback(() => setOpen(null), [])
  const step = useCallback(
    (d: number) => setOpen((i) => (i === null ? i : (i + d + items.length) % items.length)),
    [items.length],
  )

  useEffect(() => {
    if (open === null) return
    lockScroll(true)
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      else if (e.key === 'ArrowRight') step(1)
      else if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      lockScroll(false)
    }
  }, [open, close, step])

  const cols =
    columns === 2
      ? 'sm:columns-2'
      : columns === 4
        ? 'sm:columns-2 lg:columns-4'
        : 'sm:columns-2 lg:columns-3'

  return (
    <>
      <section id={id} aria-label="Gallery" className={`px-5 py-24 md:px-10 md:py-36 ${className}`}>
        <div className="mx-auto max-w-[1440px]">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--accent)]">
                {eyebrow}
              </span>
              <h2 className="mt-4 max-w-[18ch] font-display text-[clamp(2rem,5vw,3.8rem)] font-medium leading-[1] tracking-[-0.03em] text-[var(--fg)]">
                {title}
              </h2>
            </div>
            <div className="flex flex-col items-start gap-5 md:items-end">
              {intro && (
                <p className="max-w-[36ch] text-[15px] leading-relaxed text-[var(--muted)] md:text-right">
                  {intro}
                </p>
              )}
              {action}
            </div>
          </div>

          {/* masonry */}
          <div className={`mt-12 columns-1 gap-4 ${cols}`}>
            {items.map((it, i) => (
              <Reveal key={`${it.title}-${i}`} delay={(i % 3) * 0.06} className="mb-4 break-inside-avoid">
                <button
                  type="button"
                  onClick={() => setOpen(i)}
                  data-cursor="View"
                  aria-label={`Open ${it.title}`}
                  className="group block w-full overflow-hidden rounded-2xl text-left ring-1 ring-inset ring-[var(--line)]"
                >
                  <span className="block overflow-hidden">
                    <img
                      src={it.image}
                      alt={`${it.title}, ${it.category}`}
                      loading="lazy"
                      className="w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.05]"
                    />
                  </span>
                  <span className="flex items-baseline justify-between gap-4 px-4 pt-4">
                    <span className="font-display text-[1.05rem] font-medium tracking-tight text-[var(--fg)]">
                      {it.title}
                    </span>
                    <span className="font-mono text-[11px] tabular-nums text-[var(--faint)]">
                      {it.year}
                    </span>
                  </span>
                  <span className="block px-4 pb-4 pt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--muted)]">
                    {it.category}
                  </span>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={items[open].title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={close}
            className="fixed inset-0 z-[70] flex flex-col items-center justify-center bg-black/85 p-4 backdrop-blur-xl md:p-10"
          >
            <motion.figure
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="flex w-full max-w-[1100px] flex-col"
            >
              <img
                src={items[open].image}
                alt={items[open].title}
                className="max-h-[74vh] w-full rounded-xl object-contain"
              />
              <figcaption className="mt-4 flex items-center justify-between gap-4">
                <span className="font-display text-[1.05rem] font-medium text-white">
                  {items[open].title}
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/60">
                  {items[open].category} · {items[open].year}
                </span>
              </figcaption>
            </motion.figure>

            <button
              type="button"
              aria-label="Previous image"
              onClick={(e) => {
                e.stopPropagation()
                step(-1)
              }}
              className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-inset ring-white/20 transition-colors hover:bg-white/20 md:left-6"
            >
              <CaretLeft weight="bold" className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={(e) => {
                e.stopPropagation()
                step(1)
              }}
              className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-inset ring-white/20 transition-colors hover:bg-white/20 md:right-6"
            >
              <CaretRight weight="bold" className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Close gallery"
              onClick={close}
              className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-inset ring-white/20 transition-colors hover:bg-white/20 md:right-6 md:top-6"
            >
              <X weight="bold" className="h-5 w-5" />
            </button>

            <span className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 font-mono text-[11px] tabular-nums text-white/60">
              {open + 1} / {items.length}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
