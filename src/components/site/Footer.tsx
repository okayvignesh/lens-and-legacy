import { ArrowUpRight } from '@phosphor-icons/react'
import { brand } from '../../data/site'

export default function Footer() {
  return (
    <footer className="border-t border-[var(--line)] px-5 pb-24 pt-12 md:px-10 md:pb-28 md:pt-16">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="font-display text-[clamp(1.6rem,3.4vw,2.6rem)] font-semibold tracking-[-0.02em] text-[var(--fg)]">
            Lens <span className="text-[var(--accent)]">&amp;</span> Legacy
          </span>
          <p className="mt-3 max-w-[40ch] text-[13px] leading-relaxed text-[var(--muted)]">
            {brand.tagline}. Photography, film and events.
          </p>
        </div>

        <div className="flex flex-col gap-2 text-[13px] text-[var(--muted)] md:items-end">
          <a href={`mailto:${brand.email}`} className="transition-colors hover:text-[var(--fg)]">
            {brand.email}
          </a>
          <a
            href={`tel:${brand.phone.replace(/[^+\d]/g, '')}`}
            className="transition-colors hover:text-[var(--fg)]"
          >
            {brand.phone}
          </a>
          <span className="text-[var(--faint)]">{brand.locations.join(' · ')}</span>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-[1200px] flex-col gap-3 border-t border-[var(--line)] pt-6 text-[12px] text-[var(--faint)] md:flex-row md:items-center md:justify-between">
        <span>
          © {new Date().getFullYear()} {brand.name}. All rights reserved.
        </span>
        <a href="#top" className="inline-flex items-center gap-2 transition-colors hover:text-[var(--muted)]">
          Back to top <ArrowUpRight weight="bold" className="h-3.5 w-3.5" />
        </a>
      </div>
    </footer>
  )
}
