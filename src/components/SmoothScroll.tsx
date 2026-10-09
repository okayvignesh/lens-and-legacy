import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { setLenis } from '../lib/scroll'
import { useReducedMotion } from 'motion/react'

/**
 * Owns the page scroll. Lenis provides the inertia; GSAP's ticker drives it
 * and ScrollTrigger stays in sync so pinned/scrubbed scenes stay glued to
 * the real scroll position.
 */
export default function SmoothScroll() {
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce) return

    const lenis = new Lenis({
      duration: 1.15,
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    })

    lenis.on('scroll', ScrollTrigger.update)
    setLenis(lenis)

    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    // Anchor links route through Lenis.
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest('a[href^="#"]')
      if (!el) return
      const id = el.getAttribute('href')
      if (!id || id === '#') return
      const target = document.querySelector(id)
      if (!target) return
      e.preventDefault()
      lenis.scrollTo(target as HTMLElement, { offset: -40, duration: 1.4 })
    }
    document.addEventListener('click', onClick)

    return () => {
      document.removeEventListener('click', onClick)
      gsap.ticker.remove(raf)
      setLenis(null)
      lenis.destroy()
    }
  }, [reduce])

  return null
}
