import { ArrowUpRight } from '@phosphor-icons/react'
import type { PageData } from '../../data/pages'
import { brand } from '../../data/site'

const YEAR = new Date().getFullYear()

export default function PageFooter({ page, onHome }: { page: PageData; onHome: () => void }) {
  return (
    <footer className="border-t border-[var(--line)] px-5 pb-20 pt-12 md:px-10 md:pb-24 md:pt-16">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="font-display text-[clamp(1.8rem,3.6vw,2.8rem)] font-semibold tracking-[-0.02em] text-[var(--fg)]">
            {page.name}
          </span>
          <p className="mt-3 max-w-[46ch] text-[13px] leading-relaxed text-[var(--muted)]">
            {page.kicker}. A {brand.name} studio.
          </p>
        </div>
        <div className="flex flex-col gap-2 text-[13px] text-[var(--muted)] md:items-end">
          <a href={`mailto:${brand.email}`} className="transition-colors hover:text-[var(--fg)]">
            {brand.email}
          </a>
          <button
            type="button"
            onClick={onHome}
            className="inline-flex items-center gap-2 transition-colors hover:text-[var(--fg)]"
          >
            All work <ArrowUpRight weight="bold" className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
      <div className="mx-auto mt-12 flex max-w-[1200px] flex-col gap-3 border-t border-[var(--line)] pt-6 text-[12px] text-[var(--faint)] md:flex-row md:items-center md:justify-between">
        <span>
          © {YEAR} {brand.name}. All rights reserved.
        </span>
        <span>{page.name}</span>
      </div>
    </footer>
  )
}
