import { ArrowUpRight, ArrowRight } from '@phosphor-icons/react'
import { motion } from 'motion/react'
import { themes } from '../lib/themes'
import { brand, CTA_PRIMARY } from '../data/site'
import type { Route } from '../lib/useVariant'
import { MaskText, Reveal } from '../components/ui/Reveal'

function Meter({ value, accent }: { value: number; accent: string }) {
  return (
    <span className="flex items-center gap-1" aria-label={`Motion intensity ${value} of 10`}>
      {Array.from({ length: 10 }, (_, i) => (
        <span
          key={i}
          className="h-3 w-[3px] rounded-full"
          style={{ background: i < value ? accent : 'var(--line-strong)' }}
        />
      ))}
    </span>
  )
}

function DirectionCard({ index, onOpen }: { index: number; onOpen: (r: Route) => void }) {
  const t = themes[index]
  return (
    <Reveal delay={index * 0.08} y={34}>
      <button
        type="button"
        onClick={() => onOpen(t.id as Route)}
        className="group block w-full text-left"
      >
        <div className="overflow-hidden rounded-[1.6rem] border border-[var(--line)] bg-[var(--surface)] transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:border-[var(--line-strong)]">
          {/* preview */}
          <div className="relative aspect-[16/10] overflow-hidden">
            <img
              src={t.preview}
              alt={`${t.name} preview`}
              className="h-full w-full object-cover opacity-70 transition-transform duration-[1400ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.06]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)] via-[var(--surface)]/20 to-transparent" />
            <div className="absolute inset-x-5 bottom-4 flex items-end justify-between">
              <span className="font-mono text-[12px]" style={{ color: t.accent }}>
                {t.index}
              </span>
              <span className="flex items-center gap-2 text-[10px] tracking-[0.2em] text-white/70">
                OPEN
                <ArrowUpRight
                  weight="bold"
                  className="h-3.5 w-3.5 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </div>
          </div>

          <div className="p-6 md:p-7">
            <p className="text-[10px] tracking-[0.2em] text-[var(--faint)]">{t.kicker}</p>
            <h3 className="mt-2 font-display text-[1.7rem] font-medium tracking-tight text-[var(--fg)]">
              {t.name}
            </h3>
            <p className="mt-3 max-w-[44ch] text-[14px] leading-relaxed text-[var(--muted)]">
              {t.summary}
            </p>

            {/* palette */}
            <div className="mt-6 flex items-center gap-2">
              {t.palette.map((p) => (
                <span
                  key={p.name}
                  title={`${p.name} ${p.hex}`}
                  className="h-6 flex-1 rounded-[4px] ring-1 ring-inset ring-black/10"
                  style={{ background: p.hex }}
                />
              ))}
            </div>

            <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-[var(--line)] pt-5 text-[12px]">
              <div>
                <dt className="text-[var(--faint)]">Display</dt>
                <dd className="mt-1 text-[var(--fg)]">{t.type.display}</dd>
              </div>
              <div>
                <dt className="text-[var(--faint)]">Body</dt>
                <dd className="mt-1 text-[var(--fg)]">{t.type.body}</dd>
              </div>
              <div className="col-span-2 flex items-center justify-between">
                <dt className="text-[var(--faint)]">Motion</dt>
                <dd className="mt-1">
                  <Meter value={t.motion.intensity} accent={t.accent} />
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </button>
    </Reveal>
  )
}

export default function DesignDoc({ onOpen }: { onOpen: (r: Route) => void }) {
  const rows: { label: string; get: (i: number) => string }[] = [
    { label: 'Family', get: (i) => themes[i].family },
    { label: 'Palette', get: (i) => themes[i].palette.map((p) => p.name).join(' · ') },
    { label: 'Display', get: (i) => themes[i].type.display },
    { label: 'Body', get: (i) => themes[i].type.body },
    { label: 'Mood', get: (i) => themes[i].mood.join(' · ') },
    { label: 'Signature moves', get: (i) => themes[i].signature.join(' · ') },
    { label: 'Motion', get: (i) => `${themes[i].motion.intensity}/10` },
  ]

  return (
    <div className="min-h-[100dvh] pb-28">
      {/* doc header */}
      <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[var(--bg)]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-5 py-4 md:px-10">
          <span className="font-display text-[15px] font-medium tracking-tight">
            Lens <span className="text-[var(--accent)]">&amp;</span> Legacy
          </span>
          <span className="text-[11px] tracking-[0.2em] text-[var(--faint)]">
            ART DIRECTION, {new Date().getFullYear()}
          </span>
        </div>
      </header>

      <main>
        {/* hero */}
        <section className="px-5 pb-16 pt-16 md:px-10 md:pb-24 md:pt-24">
          <div className="mx-auto max-w-[1440px]">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] tracking-[0.16em] text-[var(--muted)] ring-1 ring-inset ring-[var(--line)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                DESIGN DOCUMENT
              </span>
            </Reveal>
            <MaskText
              as="h1"
              lines={['Five ways to keep', 'a legacy.']}
              delay={0.1}
              className="mt-6 max-w-[16ch] font-display text-[clamp(2.8rem,8vw,6.6rem)] font-medium leading-[0.94] tracking-[-0.03em] text-[var(--fg)] text-edge"
            />
            <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-12">
              <Reveal delay={0.3} className="md:col-span-6">
                <p className="max-w-[52ch] text-[16px] leading-relaxed text-[var(--muted)]">
                  Five complete art directions for {brand.name}, same studio, same story, five
                  distinct visual languages. Each is a full, responsive landing page you can flip
                  between live using the control at the bottom of the screen.
                </p>
              </Reveal>
              <Reveal delay={0.4} className="md:col-span-5 md:col-start-8">
                <div className="flex items-center gap-3">
                  {themes.map((t) => (
                    <span
                      key={t.id}
                      className="h-8 w-8 rounded-full ring-1 ring-inset ring-black/10"
                      style={{ background: t.accent }}
                      title={t.name}
                    />
                  ))}
                  <span className="ml-2 text-[12px] text-[var(--faint)]">5 accents</span>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* directions */}
        <section id="directions" className="px-5 pb-8 md:px-10">
          <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
            {themes.map((_, i) => (
              <DirectionCard key={i} index={i} onOpen={onOpen} />
            ))}
          </div>
        </section>

        {/* comparison matrix */}
        <section className="px-5 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-[1440px]">
            <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] font-medium tracking-[-0.02em] text-[var(--fg)]">
              At a glance
            </h2>

            {/* desktop matrix */}
            <div className="mt-10 hidden md:block">
              <div className="grid grid-cols-[180px_repeat(4,1fr)] border-t border-[var(--line)]">
                <div className="border-b border-[var(--line)] py-4" />
                {themes.map((t) => (
                  <div key={t.id} className="border-b border-[var(--line)] py-4 pr-4">
                    <div className="font-mono text-[11px]" style={{ color: t.accent }}>
                      {t.index}
                    </div>
                    <div className="mt-1 font-display text-[1.1rem] font-medium text-[var(--fg)]">
                      {t.name}
                    </div>
                  </div>
                ))}
                {rows.map((row) => (
                  <div key={row.label} className="col-span-5 grid grid-cols-[180px_repeat(4,1fr)]">
                    <div className="border-b border-[var(--line)] py-4 pr-4 text-[12px] text-[var(--faint)]">
                      {row.label}
                    </div>
                    {themes.map((t, i) => (
                      <div
                        key={t.id}
                        className="border-b border-[var(--line)] py-4 pr-4 text-[13px] leading-relaxed text-[var(--muted)]"
                      >
                        {row.get(i)}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* mobile stack */}
            <div className="mt-8 flex flex-col gap-4 md:hidden">
              {themes.map((t, i) => (
                <div key={t.id} className="rounded-2xl border border-[var(--line)] p-5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px]" style={{ color: t.accent }}>
                      {t.index}
                    </span>
                    <span className="font-display text-[1.1rem] text-[var(--fg)]">{t.name}</span>
                  </div>
                  <dl className="mt-4 flex flex-col gap-2 text-[12px]">
                    {rows.map((row) => (
                      <div key={row.label} className="flex justify-between gap-4">
                        <dt className="text-[var(--faint)]">{row.label}</dt>
                        <dd className="max-w-[60%] text-right text-[var(--muted)]">{row.get(i)}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* shared system */}
        <section className="border-t border-[var(--line)] px-5 py-20 md:px-10 md:py-28">
          <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-10 md:grid-cols-3">
            {[
              {
                h: 'One system, five skins',
                b: 'Every direction shares the same content model, component primitives and motion rules. Only the theme tokens, palette, type, accent, and the composition change.',
              },
              {
                h: 'Motion is motivated',
                b: 'Scroll scenes use GSAP + ScrollTrigger; interface motion uses Motion. Everything animates on transform and opacity only, and collapses under prefers-reduced-motion.',
              },
              {
                h: 'Built to be handed over',
                b: 'All copy and imagery live in one file. Swap the placeholders for real content and the four directions keep working untouched.',
              },
            ].map((c, i) => (
              <Reveal key={c.h} delay={i * 0.08}>
                <h3 className="font-display text-[1.4rem] font-medium tracking-tight text-[var(--fg)]">
                  {c.h}
                </h3>
                <p className="mt-3 max-w-[42ch] text-[14px] leading-relaxed text-[var(--muted)]">
                  {c.b}
                </p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* closing */}
        <section className="px-5 pb-10 pt-8 md:px-10">
          <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-6 rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-8 md:flex-row md:items-center md:p-12">
            <div>
              <h2 className="font-display text-[clamp(1.6rem,3vw,2.4rem)] font-medium tracking-[-0.02em] text-[var(--fg)]">
                Pick a direction to explore
              </h2>
              <p className="mt-2 max-w-[46ch] text-[14px] text-[var(--muted)]">
                Or use the switcher at the bottom of every screen.
              </p>
            </div>
            <motion.button
              type="button"
              whileTap={{ scale: 0.98 }}
              onClick={() => onOpen('aurora')}
              className="group inline-flex shrink-0 items-center gap-3 rounded-full bg-[var(--accent)] py-2 pl-6 pr-2 text-sm font-medium text-[var(--accent-ink)]"
            >
              {CTA_PRIMARY.replace('project', 'direction')}
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--accent-ink)]/12 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-[3px] group-hover:-translate-y-[2px]">
                <ArrowRight weight="bold" className="h-4 w-4" />
              </span>
            </motion.button>
          </div>
        </section>
      </main>
    </div>
  )
}
