import { useCallback, useEffect, useState } from 'react'
import { scrollToTop } from './scroll'

export type Route = 'doc' | 'aurora' | 'reel' | 'chrome' | 'nocturne' | 'atelier'

const VALID: Route[] = ['doc', 'aurora', 'reel', 'chrome', 'nocturne', 'atelier']

function read(): Route {
  if (typeof window === 'undefined') return 'aurora'
  const v = new URLSearchParams(window.location.search).get('v') as Route | null
  return v && VALID.includes(v) ? v : 'aurora'
}

/**
 * Tiny URL-driven router. The whole experience is one page; `?v=` picks the
 * art direction (or the design document). Keeps back/forward working without
 * pulling in a routing library.
 */
export function useVariant() {
  const [route, setRoute] = useState<Route>(read)

  useEffect(() => {
    const onPop = () => setRoute(read())
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const go = useCallback((next: Route, opts?: { keepScroll?: boolean }) => {
    const url = new URL(window.location.href)
    url.searchParams.set('v', next)
    window.history.pushState({}, '', url)
    setRoute(next)
    if (!opts?.keepScroll) scrollToTop()
  }, [])

  return { route, go }
}
