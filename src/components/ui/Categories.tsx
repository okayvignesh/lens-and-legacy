import { categories } from '../../data/site'
import { Reveal } from './Reveal'

/**
 * The studio's three core pillars, Sports, Weddings, Special Occasions.
 * Themed via CSS variables so it reads correctly in every direction.
 */
export default function Categories({
  id = 'services',
  eyebrow = 'What we do',
  title = 'Three things we do properly.',
  intro = 'Sport, weddings and every occasion in between, covered end to end by one crew, in photo, film and live events.',
  className = '',
}: {
  id?: string
  eyebrow?: string
  title?: string
  intro?: string
  className?: string
}) {
  return (
    <section id={id} aria-label="What we do" className={`px-5 py-24 md:px-10 md:py-36 ${className}`}>
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
          <p className="max-w-[38ch] text-[15px] leading-relaxed text-[var(--muted)] md:text-right">
            {intro}
          </p>
        </div>

        <div className="mt-12 border-t border-[var(--line)]">
          {categories.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08}>
              <article className="group grid grid-cols-1 items-center gap-8 border-b border-[var(--line)] py-10 md:grid-cols-12 md:gap-10 md:py-14">
                <div className="md:col-span-4">
                  <span className="font-mono text-[11px] text-[var(--accent)]">{c.index}</span>
                  <h3 className="mt-4 font-display text-[clamp(1.8rem,4vw,3rem)] font-medium leading-[1] tracking-[-0.02em] text-[var(--fg)]">
                    {c.title}
                  </h3>
                  <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--muted)]">
                    {c.kicker}
                  </p>
                </div>

                <div className="md:col-span-5">
                  <p className="max-w-[48ch] text-[15px] leading-relaxed text-[var(--muted)]">
                    {c.blurb}
                  </p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {c.items.map((it) => (
                      <li
                        key={it}
                        className="rounded-full px-3.5 py-1.5 text-[11px] text-[var(--muted)] ring-1 ring-inset ring-[var(--line)]"
                      >
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="md:col-span-3">
                  <div className="overflow-hidden rounded-2xl ring-1 ring-inset ring-[var(--line)]">
                    <img
                      src={c.image}
                      alt={`${c.title}, ${c.kicker}`}
                      loading="lazy"
                      className="aspect-[4/3] w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.05]"
                    />
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
