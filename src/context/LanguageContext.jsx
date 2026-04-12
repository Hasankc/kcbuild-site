import { createContext, useContext, useState, useEffect } from 'react'
import { ar } from '../translations/ar'
import { en } from '../translations/en'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('kcbuild-lang') || 'ar'
  })

  const t = lang === 'ar' ? ar : en
  const isRTL = lang === 'ar'

  useEffect(() => {
    const dir = isRTL ? 'rtl' : 'ltr'
    document.documentElement.dir = dir
    document.documentElement.lang = lang
    document.documentElement.style.fontFamily = isRTL
      ? "'Cairo', sans-serif"
      : "'Sora', sans-serif"
    localStorage.setItem('kcbuild-lang', lang)
  }, [lang, isRTL])

  const toggleLang = () => setLang(l => (l === 'ar' ? 'en' : 'ar'))

  return (
    <LanguageContext.Provider value={{ lang, t, isRTL, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLang = () => useContext(LanguageContext)
