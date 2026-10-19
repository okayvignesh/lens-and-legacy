import { Suspense, lazy, useEffect } from 'react'
import SmoothScroll from './components/SmoothScroll'
import CursorLayer from './components/CursorLayer'
import FilmStrip from './components/site/FilmStrip'
import { usePage } from './lib/usePage'
import { pages } from './data/pages'
import Home from './pages/Home'
import { ScrollTrigger } from './lib/gsap'

const Sports = lazy(() => import('./pages/Sports'))
const Weddings = lazy(() => import('./pages/Weddings'))
const Events = lazy(() => import('./pages/Events'))

function Loading() {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center">
      <span className="relative flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-60" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
      </span>
    </div>
  )
}

export default function App() {
  const { page, go } = usePage()

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove('theme-sports', 'theme-weddings', 'theme-events')
    if (page !== 'home') root.classList.add(pages[page].theme)
  }, [page])

  useEffect(() => {
    let r2 = 0
    const r1 = requestAnimationFrame(() => {
      r2 = requestAnimationFrame(() => ScrollTrigger.refresh())
    })
    return () => {
      cancelAnimationFrame(r1)
      if (r2) cancelAnimationFrame(r2)
    }
  }, [page])

  return (
    <>
      <SmoothScroll />
      <div className="grain-overlay animate-grain" aria-hidden />

      <a
        href="#top"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-[var(--accent)] focus:px-4 focus:py-2 focus:text-sm focus:text-[var(--accent-ink)]"
      >
        Skip to content
      </a>

      <Suspense fallback={<Loading />}>
        {page === 'home' && <Home go={go} />}
        {page === 'sports' && <Sports onHome={() => go('home')} />}
        {page === 'weddings' && <Weddings onHome={() => go('home')} />}
        {page === 'events' && <Events onHome={() => go('home')} />}
      </Suspense>

      <FilmStrip />
      <CursorLayer />
    </>
  )
}
