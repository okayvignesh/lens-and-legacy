import { brand, CTA_PRIMARY } from '../../data/site'
import { MaskText, Reveal } from '../ui/Reveal'
import Cta from '../ui/Cta'
import { Bit, ApertureMark } from '../ui/Bits'

export default function Contact() {
  return (
    <section id="contact" className="relative border-t border-[var(--line)] px-5 py-28 md:px-10 md:py-36">
      <Bit className="right-8 top-14 hidden h-24 w-24 lg:block" delay={0.6} duration={14} opacity={0.1}>
        <ApertureMark className="h-full w-full" />
      </Bit>
      <div className="mx-auto max-w-[1200px]">
        <MaskText
          as="h2"
          lines={['Let’s make', 'the record.']}
          className="font-display text-[clamp(2.6rem,7vw,5.6rem)] font-semibold leading-[0.94] tracking-[-0.035em] text-[var(--fg)]"
        />
        <Reveal delay={0.12}>
          <p className="mt-6 max-w-[46ch] text-[16px] leading-relaxed text-[var(--muted)]">
            Tell us the date, the place and the feeling. We’ll come back with availability, crew
            and a clear number.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Cta href={`mailto:${brand.email}`} variant="primary" magnetic>
              {CTA_PRIMARY}
            </Cta>
            <a
              href={`mailto:${brand.email}`}
              className="text-[15px] text-[var(--muted)] transition-colors hover:text-[var(--fg)]"
            >
              {brand.email}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
