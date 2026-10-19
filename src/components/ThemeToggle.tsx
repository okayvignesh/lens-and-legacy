import { Moon, Sun } from '@phosphor-icons/react'
import { useTheme } from '../lib/theme'

/** Light is the default. Dark is an optional, remembered preference. */
export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      aria-label={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
      className="flex h-9 w-9 items-center justify-center rounded-full text-[var(--muted)] ring-1 ring-inset ring-[var(--line)] transition-colors duration-300 hover:text-[var(--fg)]"
    >
      {theme === 'light' ? (
        <Moon weight="bold" className="h-4 w-4" />
      ) : (
        <Sun weight="bold" className="h-4 w-4" />
      )}
    </button>
  )
}
