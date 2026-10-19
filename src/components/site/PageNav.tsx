import { useState } from 'react'
import { useScroll, useMotionValueEvent } from 'motion/react'
import { Aperture, ArrowLeft } from '@phosphor-icons/react'
import type { PageData } from '../../data/pages'
import { brand, CTA_PRIMARY } from '../../data/site'
import Cta from '../ui/Cta'

/** Theme-aware nav for a vertical page. The wordmark and "All work" return home. */
export default function PageNav({ page, onHome }: { page: PageData; onHome: () => void }) {
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 30))

  return (
    <header className="fixed inset-x-0 top-0 z-40 flex justify-center px-4 pt-4 md:pt-5">
      <nav
        className={`flex w-full max-w-[1200px] items-center justify-between gap-4 rounded-full py-2 pl-4 pr-2 transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          scrolled ? 'glass-blur ring-1 ring-inset ring-[var(--line)]' : 'ring-1 ring-inset ring-transparent'
        }`}
      >
        <button
          type="button"
          onClick={onHome}
          className="flex items-center gap-2.5 text-left"
          aria-label={`${page.name}, back to all work`}
        >
          <Aperture weight="bold" className="h-5 w-5 text-[var(--accent)]" />
          <span className="flex flex-col leading-none">
            <span className="font-display text-[15px] font-semibold tracking-tight text-[var(--fg)]">
              {page.name}
            </span>
            <span className="mt-0.5 hidden text-[9px] uppercase tracking-[0.18em] text-[var(--faint)] sm:block">
              {brand.name}
            </span>
          </span>
        </button>

        <div className="hidden items-center gap-1 md:flex">
          {page.nav.map((n) => (
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
          <button
            type="button"
            onClick={onHome}
            className="hidden items-center gap-2 rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-[var(--muted)] ring-1 ring-inset ring-[var(--line)] transition-colors duration-300 hover:text-[var(--fg)] sm:flex"
          >
            <ArrowLeft weight="bold" className="h-3.5 w-3.5" /> All work
          </button>
          <Cta href="#contact" icon={false} className="!py-2.5 !pl-5 !text-[13px]">
            {CTA_PRIMARY}
          </Cta>
        </div>
      </nav>
    </header>
  )
}
