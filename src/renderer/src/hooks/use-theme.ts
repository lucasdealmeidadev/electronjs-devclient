import { useEffect, useState } from 'react'

export type Theme = 'light' | 'dark' | 'system'

const STORAGE_KEY = 'devclient:theme'

function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'dark'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function resolveTheme(theme: Theme): 'light' | 'dark' {
  return theme === 'system' ? getSystemTheme() : theme
}

function applyTheme(theme: Theme): void {
  const resolved = resolveTheme(theme)
  const root = document.documentElement
  root.classList.toggle('dark', resolved === 'dark')
  root.style.colorScheme = resolved
}

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'system'
  const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null
  return stored === 'light' || stored === 'dark' || stored === 'system' ? stored : 'system'
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    applyTheme(theme)
    window.localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  useEffect(() => {
    if (theme !== 'system') return
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => applyTheme('system')
    media.addEventListener('change', handler)
    return () => media.removeEventListener('change', handler)
  }, [theme])

  function setTheme(next: Theme): void {
    setThemeState(next)
  }

  return { theme, resolvedTheme: resolveTheme(theme), setTheme }
}
