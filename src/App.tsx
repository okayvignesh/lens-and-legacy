import { Suspense, lazy, useEffect } from 'react'
import { motion } from 'motion/react'
import SmoothScroll from './components/SmoothScroll'
import VariantSwitcher from './components/VariantSwitcher'
import CursorLayer from './components/CursorLayer'
import { useVariant, type Route } from './lib/useVariant'
import { themeById, type ThemeId } from './lib/themes'
import { ScrollTrigger } from './lib/gsap'

// Each direction (and the document) is its own chunk so three.js only loads
// for the direction you are actually viewing.
const Aurora = lazy(() => import('./variants/Aurora'))
const Reel = lazy(() => import('./variants/Reel'))
const Chrome = lazy(() => import('./variants/Chrome'))
const Nocturne = lazy(() => import('./variants/Nocturne'))
const Atelier = lazy(() => import('./variants/Atelier'))
const DesignDoc = lazy(() => import('./doc/DesignDoc'))

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

function renderRoute(route: Route, go: (r: Route) => void) {
  switch (route) {
    case 'aurora':
      return <Aurora />
    case 'reel':
      return <Reel />
    case 'chrome':
      return <Chrome />
    case 'nocturne':
      return <Nocturne />
    case 'atelier':
      return <Atelier />
    default:
      return <DesignDoc onOpen={go} />
  }
}

export default function App() {
  const { route, go } = useVariant()
  const isDoc = route === 'doc'
  const themeClass = isDoc ? '' : themeById(route as ThemeId).themeClass

  useEffect(() => {
    document.documentElement.className = themeClass
  }, [themeClass])

  // Re-measure pinned/scrubbed scenes once the new direction has mounted.
  useEffect(() => {
    let r2 = 0
    const r1 = requestAnimationFrame(() => {
      r2 = requestAnimationFrame(() => ScrollTrigger.refresh())
    })
    return () => {
      cancelAnimationFrame(r1)
      if (r2) cancelAnimationFrame(r2)
    }
  }, [route])

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

      <div id="top">
        <Suspense fallback={<Loading />}>
          <motion.div
            key={route}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
          >
            {renderRoute(route, go)}
          </motion.div>
        </Suspense>
      </div>

      <CursorLayer />
      <VariantSwitcher current={route} onSelect={go} />
    </>
  )
}
