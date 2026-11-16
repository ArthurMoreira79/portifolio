import { createContext, useContext, useEffect, useState } from 'react'
import pt from './pt.json'
import en from './en.json'

const dicts = { pt, en }
const I18nContext = createContext(null)

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      const saved = localStorage.getItem('lang')
      if (saved === 'pt' || saved === 'en') return saved
      return navigator.language?.toLowerCase().startsWith('en') ? 'en' : 'pt'
    } catch {
      return 'pt'
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('lang', lang)
    } catch {}
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en'
  }, [lang])

  return (
    <I18nContext.Provider value={{ lang, setLang, t: dicts[lang] }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  return useContext(I18nContext)
}
