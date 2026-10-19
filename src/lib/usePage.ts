import { useCallback, useEffect, useState } from 'react'
import { scrollToTop } from './scroll'

export type PageKey = 'home' | 'sports' | 'weddings' | 'events'

const VALID: PageKey[] = ['home', 'sports', 'weddings', 'events']

function read(): PageKey {
  if (typeof window === 'undefined') return 'home'
  const p = new URLSearchParams(window.location.search).get('page') as PageKey | null
  return p && VALID.includes(p) ? p : 'home'
}

/** URL-driven routing: `?page=sports | weddings | events`, home by default. */
export function usePage() {
  const [page, setPage] = useState<PageKey>(read)

  useEffect(() => {
    const onPop = () => setPage(read())
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const go = useCallback((next: PageKey) => {
    const url = new URL(window.location.href)
    if (next === 'home') url.searchParams.delete('page')
    else url.searchParams.set('page', next)
    window.history.pushState({}, '', url)
    setPage(next)
    scrollToTop()
  }, [])

  return { page, go }
}
