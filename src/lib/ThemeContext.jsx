import { createContext, useContext, useEffect, useRef, useState } from 'react'

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(
    () => document.documentElement.getAttribute('data-theme') || 'dark',
  )
  const timer = useRef(null)

  useEffect(() => {
    const html = document.documentElement
    html.classList.add('theme-anim')
    html.setAttribute('data-theme', theme)
    try {
      localStorage.setItem('theme', theme)
    } catch {}
    clearTimeout(timer.current)
    timer.current = setTimeout(() => html.classList.remove('theme-anim'), 350)
    return () => clearTimeout(timer.current)
  }, [theme])

  const toggle = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  return <ThemeContext.Provider value={{ theme, setTheme, toggle }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  return useContext(ThemeContext)
}
