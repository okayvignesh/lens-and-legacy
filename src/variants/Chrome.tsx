import { Aperture, Plus } from '@phosphor-icons/react'
import {
  brand,
  nav,
  hero,
  studio,
  gallery,
  process,
  footerLinks,
  CTA_PRIMARY,
  CTA_WORK,
} from '../data/site'
import { MaskText, Reveal } from '../components/ui/Reveal'
import Cta from '../components/ui/Cta'
import Categories from '../components/ui/Categories'
import Gallery from '../components/ui/Gallery'
import { Stage } from '../components/three/Stage'
import { ChromeLens } from '../components/three/objects'

/* ─────────────────────────────────────────────────────────────
   03, Chrome Precision
   A cold, technical, precision-instrument landing page.
   All colour resolves from the active `theme-chrome` tokens.
   ───────────────────────────────────────────────────────────── */

const EASE = 'ease-[cubic-bezier(0.32,0.72,0,1)]'

const HERO_SPECS = [
  { k: 'ƒ/', v: '1.4' },
  { k: 'shutter', v: '1/250' },
  { k: 'iso', v: '400' },
]

export default function Chrome() {
  const year = new Date().getFullYear()

  return (
    <>
      <a
        href="#top"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-[var(--accent)] focus:px-4 focus:py-2 focus:text-sm focus:text-[var(--accent-ink)]"
      >
        Skip to content
      </a>

      {/* ── 01 · Top bar ─────────────────────────────────────── */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--line)] bg-[var(--bg)]/80 backdrop-blur-xl">
        <div className="relative mx-auto grid h-16 max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center gap-4 px-5 md:px-10">
          <a
            href="#top"
            className="flex items-center gap-2.5 justify-self-start"
            aria-label={`${brand.name} home`}
          >
            <Aperture weight="bold" className="h-5 w-5 text-[var(--accent)]" />
            <span className="font-display text-[15px] font-semibold tracking-tight text-[var(--fg)]">
              Lens <span className="text-[var(--accent)]">&amp;</span> Legacy
            </span>
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`group relative rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--muted)] transition-colors duration-300 hover:text-[var(--fg)]`}
              >
                {item.label}
                <span
                  className={`absolute inset-x-4 bottom-1 h-px origin-left scale-x-0 bg-[var(--accent)] transition-transform duration-500 ${EASE} group-hover:scale-x-100`}
                />
              </a>
            ))}
          </nav>

          <div className="justify-self-end">
            <Cta
              href="#contact"
              variant="primary"
              icon={false}
              className="!py-2 !pl-5 !pr-5 !text-[13px]"
            >
              {CTA_PRIMARY}
            </Cta>
          </div>
        </div>

        {/* machined accent tick */}
        <span
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 h-[2px] w-24 bg-[var(--accent)]"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute left-24 top-0 hidden h-[2px] w-6 bg-[var(--fg)]/25 md:block"
        />
      </header>

      <main>
        {/* ── 02 · Hero ──────────────────────────────────────── */}
        <section className="relative min-h-[100dvh] w-full overflow-hidden border-b border-[var(--line)] pt-24">
          {/* faint technical grid */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0 opacity-70"
            style={{
              backgroundImage:
                'linear-gradient(to right, var(--line) 1px, transparent 1px), linear-gradient(to bottom, var(--line) 1px, transparent 1px)',
              backgroundSize: '76px 76px',
              maskImage: 'radial-gradient(120% 90% at 50% 35%, #000 20%, transparent 82%)',
              WebkitMaskImage: 'radial-gradient(120% 90% at 50% 35%, #000 20%, transparent 82%)',
            }}
          />

          {/* the 3D lens, right half */}
          <div className="pointer-events-none absolute inset-y-0 right-0 z-0 w-full opacity-40 sm:opacity-70 lg:w-1/2 lg:opacity-100">
            <Stage
              tone="light"
              scale={1.15}
              object={({ progress, pointer }) => (
                <ChromeLens progress={progress} pointer={pointer} />
              )}
            />
          </div>

          {/* crosshair over the lens */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 z-[1] hidden w-1/2 lg:block"
          >
            <Plus
              weight="light"
              className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 text-[var(--faint)]"
            />
          </div>

          {/* mono spec readouts */}
          <div className="pointer-events-none absolute right-5 top-1/2 z-10 hidden -translate-y-1/2 flex-col gap-6 md:right-10 md:flex">
            {HERO_SPECS.map((spec, i) => (
              <Reveal
                key={spec.k}
                delay={0.9 + i * 0.1}
                className="flex items-center justify-end gap-3"
              >
                <span className="h-px w-8 bg-[var(--line-strong)]" />
                <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--faint)]">
                  {spec.k}
                </span>
                <span className="w-14 text-right font-mono text-sm text-[var(--fg)]">
                  {spec.v}
                </span>
              </Reveal>
            ))}
          </div>

          {/* copy */}
          <div className="relative z-10 mx-auto flex min-h-[calc(100dvh-6rem)] max-w-[1440px] flex-col justify-center px-5 py-16 md:px-10">
            <Reveal>
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--accent)]">
                {hero.eyebrow}
              </span>
            </Reveal>

            <MaskText
              as="h1"
              lines={hero.headline}
              delay={0.15}
              className="mt-6 max-w-[11ch] font-display text-[clamp(2.6rem,7vw,5.6rem)] font-semibold leading-[0.94] tracking-[-0.035em] text-[var(--fg)]"
            />

            <Reveal delay={0.5}>
              <p className="mt-8 max-w-[44ch] text-[15px] leading-relaxed text-[var(--muted)] md:text-base">
                {hero.sub}
              </p>
            </Reveal>

            <Reveal delay={0.65} className="mt-10 flex flex-wrap items-center gap-3">
              <Cta href="#contact" variant="primary" magnetic>
                {CTA_PRIMARY}
              </Cta>
              <Cta href="#gallery" variant="ghost">
                {CTA_WORK}
              </Cta>
            </Reveal>
          </div>
        </section>

        {/* ── 03 · Spec strip ────────────────────────────────── */}
        <section id="studio" aria-label="Studio at a glance">
          <div className="mx-auto max-w-[1440px] px-5 md:px-10">
            <dl className="grid grid-cols-2 gap-px bg-[var(--line)] md:grid-cols-4">
              {studio.stats.map((stat, i) => (
                <Reveal key={stat.label} delay={i * 0.06} className="bg-[var(--bg)]">
                  <div className="flex flex-col px-5 py-10 md:px-8 md:py-14">
                    <dt className="order-2 mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]">
                      {stat.label}
                    </dt>
                    <dd className="order-1 font-mono text-[clamp(2rem,4vw,3rem)] leading-none tracking-[-0.03em] text-[var(--fg)]">
                      {stat.value}
                    </dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>
        </section>

        {/* ── 04 · What we do ────────────────────────────────── */}
        <Categories
          id="services"
          eyebrow="What we do"
          title="Three things we do properly."
          intro="Sport, weddings and every occasion in between, covered end to end by one crew, in photo, film and live events."
          className="border-t border-[var(--line)]"
        />

        {/* ── 05 · Gallery ───────────────────────────────────── */}
        <Gallery
          id="gallery"
          items={gallery}
          eyebrow="Gallery"
          title="Every frame, filed."
          intro="The full archive, every commission, kept and open to explore."
          columns={3}
          action={
            <Cta href="#contact" variant="ghost" arrow="right">
              {CTA_WORK}
            </Cta>
          }
        />

        {/* ── 06 · Process ───────────────────────────────────── */}
        <section className="border-t border-[var(--line)] py-24 md:py-40">
          <div className="mx-auto max-w-[1440px] px-5 md:px-10">
            <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <div>
                <Reveal>
                  <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--accent)]">
                    [ Process ]
                  </span>
                </Reveal>
                <MaskText
                  as="h2"
                  lines={['From first call', 'to final cut.']}
                  delay={0.05}
                  className="mt-5 max-w-[16ch] font-display text-[clamp(2.1rem,5vw,4rem)] font-medium leading-[0.98] tracking-[-0.025em] text-[var(--fg)]"
                />
              </div>
              <Reveal delay={0.15} className="max-w-[36ch]">
                <p className="text-[15px] leading-relaxed text-[var(--muted)]">
                  A commission runs like a production, not a photoshoot, measured, sequenced and
                  documented at every stage.
                </p>
              </Reveal>
            </div>

            <div className="relative mt-16 grid gap-10 md:grid-cols-4 md:gap-8">
              <div
                aria-hidden
                className="absolute left-0 top-3 hidden h-px w-full bg-[var(--line)] md:block"
              />
              {process.map((step, i) => (
                <Reveal key={step.step} delay={i * 0.08} className="relative">
                  <span className="relative z-10 flex h-6 w-6 items-center justify-center rounded-full border border-[var(--line-strong)] bg-[var(--bg)] font-mono text-[10px] text-[var(--accent)]">
                    {step.step}
                  </span>
                  <h3 className="mt-6 font-display text-lg font-medium text-[var(--fg)]">
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-[34ch] text-sm leading-relaxed text-[var(--muted)]">
                    {step.body}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── 07 · Final CTA ─────────────────────────────────── */}
        <section id="contact" className="border-t border-[var(--line)] py-24 md:py-40">
          <div className="mx-auto flex max-w-[1440px] flex-col items-center px-5 text-center md:px-10">
            <Reveal>
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--accent)]">
                [ Start ]
              </span>
            </Reveal>
            <MaskText
              as="h2"
              lines={['Let’s keep the', 'evidence of it.']}
              delay={0.05}
              className="mt-6 max-w-[16ch] font-display text-[clamp(2.2rem,6vw,4.6rem)] font-semibold leading-[0.96] tracking-[-0.03em] text-[var(--fg)]"
            />
            <Reveal delay={0.2}>
              <p className="mt-7 max-w-[46ch] text-[15px] leading-relaxed text-[var(--muted)]">
                Tell us the date, the place and the feeling. We will take it from there.
              </p>
            </Reveal>
            <Reveal delay={0.35} className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Cta href={`mailto:${brand.email}`} variant="primary" magnetic>
                {CTA_PRIMARY}
              </Cta>
              <Cta href="#gallery" variant="ghost">
                {CTA_WORK}
              </Cta>
            </Reveal>
            <Reveal delay={0.5} className="mt-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--faint)]">
                {brand.email} · {brand.phone} · {brand.locations.join(' / ')}
              </p>
            </Reveal>
          </div>
        </section>
      </main>

      {/* ── Footer ───────────────────────────────────────────── */}
      <footer className="border-t border-[var(--line)] bg-[var(--surface)]">
        <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-10 md:py-20">
          <div className="grid grid-cols-2 gap-10 md:grid-cols-12">
            <div className="col-span-2 md:col-span-4">
              <a
                href="#top"
                className="flex items-center gap-2.5"
                aria-label={`${brand.name} home`}
              >
                <Aperture weight="bold" className="h-5 w-5 text-[var(--accent)]" />
                <span className="font-display text-[15px] font-semibold tracking-tight text-[var(--fg)]">
                  Lens <span className="text-[var(--accent)]">&amp;</span> Legacy
                </span>
              </a>
              <p className="mt-5 max-w-[30ch] text-sm leading-relaxed text-[var(--muted)]">
                {brand.tagline}. A studio keeping the evidence of a life well lived.
              </p>
              <a
                href={`mailto:${brand.email}`}
                className={`mt-5 inline-flex font-mono text-[12px] text-[var(--accent)] transition-colors duration-300 hover:text-[var(--fg)]`}
              >
                {brand.email}
              </a>
            </div>

            {footerLinks.map((col) => (
              <nav key={col.heading} aria-label={col.heading} className="md:col-span-2">
                <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--faint)]">
                  {col.heading}
                </h3>
                <ul className="mt-5 flex flex-col gap-3">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#top"
                        className="text-[14px] text-[var(--muted)] transition-colors duration-300 hover:text-[var(--fg)]"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}

            <div className="col-span-2 md:col-span-2">
              <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--faint)]">
                Contact
              </h3>
              <ul className="mt-5 flex flex-col gap-3 text-[14px] text-[var(--muted)]">
                <li>
                  <a
                    href={`tel:${brand.phone.replace(/[^+\d]/g, '')}`}
                    className="transition-colors duration-300 hover:text-[var(--fg)]"
                  >
                    {brand.phone}
                  </a>
                </li>
                <li>{brand.locations.join(' · ')}</li>
              </ul>
            </div>
          </div>

          <div className="mt-14 flex flex-col gap-3 border-t border-[var(--line)] pt-6 font-mono text-[11px] text-[var(--faint)] md:flex-row md:items-center md:justify-between">
            <span>
              © {year} {brand.name}. All rights reserved.
            </span>
            <span className="flex flex-wrap gap-6">
              <a href="#top" className="transition-colors duration-300 hover:text-[var(--fg)]">
                Privacy
              </a>
              <a href="#top" className="transition-colors duration-300 hover:text-[var(--fg)]">
                Terms
              </a>
              <span className="text-[var(--muted)]">Calibrated in Chrome // 03</span>
            </span>
          </div>
        </div>
      </footer>
    </>
  )
}
