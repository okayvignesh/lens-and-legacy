import { useSyncExternalStore } from 'react'

export type Theme = 'light' | 'dark'

const listeners = new Set<() => void>()

export function getTheme(): Theme {
  if (typeof document === 'undefined') return 'light'
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
}

export function setTheme(theme: Theme) {
  if (theme === 'dark') document.documentElement.dataset.theme = 'dark'
  else delete document.documentElement.dataset.theme
  try {
    localStorage.setItem('theme', theme)
  } catch {
    /* ignore */
  }
  listeners.forEach((l) => l())
}

export function subscribeTheme(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

/** Reactive theme: light is the default, dark is opt-in and remembered. */
export function useTheme() {
  const theme = useSyncExternalStore(subscribeTheme, getTheme, () => 'light' as const)
  return { theme, setTheme }
}
