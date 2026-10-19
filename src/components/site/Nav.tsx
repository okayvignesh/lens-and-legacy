import { useState } from 'react'
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from 'motion/react'
import { Aperture } from '@phosphor-icons/react'
import { brand, nav, CTA_PRIMARY } from '../../data/site'
import Cta from '../ui/Cta'
import ThemeToggle from '../ThemeToggle'

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 30))

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 flex justify-center px-4 pt-4 md:pt-5">
        <nav
          className={`flex w-full max-w-[1200px] items-center justify-between gap-4 rounded-full py-2 pl-5 pr-2 transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
            scrolled ? 'glass-blur ring-1 ring-inset ring-[var(--line)]' : 'ring-1 ring-inset ring-transparent'
          }`}
        >
          <a href="#top" className="flex items-center gap-2.5" aria-label={`${brand.name} home`}>
            <Aperture weight="bold" className="h-5 w-5 text-[var(--accent)]" />
            <span className="font-display text-[15px] font-semibold tracking-tight text-[var(--fg)]">
              Lens <span className="text-[var(--accent)]">&amp;</span> Legacy
            </span>
          </a>

          <div className="hidden items-center gap-1 lg:flex">
            {nav.map((n) => (
              <a
                key={n.label}
                href={n.href}
                className="rounded-full px-4 py-2 text-sm text-[var(--muted)] transition-colors duration-300 hover:text-[var(--fg)]"
              >
                {n.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <div className="hidden md:block">
              <Cta href="#contact" icon={false} className="!py-2.5 !pl-5 !text-[13px]">
                {CTA_PRIMARY}
              </Cta>
            </div>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              className="flex h-9 w-9 items-center justify-center rounded-full ring-1 ring-inset ring-[var(--line)] lg:hidden"
            >
              <span className="relative block h-3 w-4">
                <motion.span
                  animate={open ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                  className="absolute left-0 top-0 block h-px w-full bg-[var(--fg)]"
                />
                <motion.span
                  animate={open ? { opacity: 0 } : { opacity: 1 }}
                  className="absolute left-0 top-1.5 block h-px w-full bg-[var(--fg)]"
                />
                <motion.span
                  animate={open ? { rotate: -45, y: -1 } : { rotate: 0, y: 0 }}
                  className="absolute bottom-0 left-0 block h-px w-full bg-[var(--fg)]"
                />
              </span>
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col justify-center bg-[var(--bg)]/97 px-8 backdrop-blur-2xl lg:hidden"
          >
            <nav className="flex flex-col gap-2">
              {nav.map((n, i) => (
                <motion.a
                  key={n.label}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.05 }}
                  className="font-display text-4xl font-semibold text-[var(--fg)]"
                >
                  {n.label}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-8"
              >
                <Cta href="#contact" variant="primary">
                  {CTA_PRIMARY}
                </Cta>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
