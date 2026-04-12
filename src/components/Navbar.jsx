import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Moon, Sun, Menu, X, Calendar } from 'lucide-react'
import { useLang } from '../context/LanguageContext'
import { useTheme } from '../context/ThemeContext'

const FlagIcon = ({ country }) => {
  if (country === 'ar') {
    return (
      <svg width="22" height="14" viewBox="0 0 22 14" className="shrink-0">
        <rect width="22" height="4.66" fill="#ce1126" />
        <rect y="4.66" width="22" height="4.68" fill="#fff" />
        <rect y="9.34" width="22" height="4.66" fill="#000" />
        <path d="M4.5 7.5h13" stroke="#009A49" strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="5.5" cy="6" r="0.7" fill="#009A49" />
        <circle cx="8.5" cy="6" r="0.7" fill="#009A49" />
        <circle cx="11.5" cy="6" r="0.7" fill="#009A49" />
        <circle cx="14.5" cy="6" r="0.7" fill="#009A49" />
      </svg>
    )
  }

  return (
    <svg width="22" height="14" viewBox="0 0 22 14" className="shrink-0">
      <rect width="22" height="14" fill="#012169" />
      <path d="M0 5.6h22M0 8.4h22M7 0l15 14M0 0l15 14" stroke="#fff" strokeWidth="3" />
      <path d="M0 6.6h22M0 7.4h22M8.5 0l13 14M0 0l13 14" stroke="#c8102e" strokeWidth="2" />
      <path d="M10.5 0v14M0 7h22" stroke="#fff" strokeWidth="4" />
      <path d="M10.5 0v14M0 7h22" stroke="#c8102e" strokeWidth="2" />
    </svg>
  )
}

export default function Navbar() {
  const { t, lang, toggleLang } = useLang()
  const { theme, toggleTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  const langButtonContent = lang === 'ar'
    ? (
      <>
        <FlagIcon country="ar" />
        <span className="ms-1">AR</span>
      </>
    ) : (
      <>
        <FlagIcon country="en" />
        <span className="ms-1">EN</span>
      </>
    )

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sectionIds = ['hero', 'services', 'portfolio', 'process', 'contact']
    const observers = sectionIds.map(id => {
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { threshold: 0.3 }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach(o => o?.disconnect())
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  const navItems = [
    { id: 'services', label: t.nav.services },
    { id: 'portfolio', label: t.nav.portfolio },
    { id: 'process', label: t.nav.process },
    { id: 'contact', label: t.nav.contact },
  ]

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/85 dark:bg-navy-card/90 backdrop-blur-md border-b border-turquoise/10 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => scrollTo('hero')}
            className="flex items-center gap-1 group"
            dir="ltr"
          >
            <span className="text-xl font-black text-turquoise tracking-tight leading-none">Kc</span>
            <span className="text-xl font-black text-gray-800 dark:text-white tracking-tight leading-none">Build</span>
            <span className="w-1.5 h-1.5 rounded-full bg-turquoise ms-1 animate-pulse-dot" />
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-7">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`text-sm font-medium relative transition-colors duration-200 ${
                  activeSection === item.id
                    ? 'text-turquoise'
                    : 'text-gray-600 dark:text-gray-300 hover:text-turquoise dark:hover:text-turquoise'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute -bottom-0.5 inset-x-0 h-0.5 bg-turquoise rounded-full"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Controls */}
          <div className="hidden md:flex items-center gap-2">
            {/* Language Toggle */}
            <button
              onClick={toggleLang}
              className="flex items-center gap-1 px-3 py-1.5 text-sm font-bold border border-turquoise text-turquoise rounded-full hover:bg-turquoise hover:text-white transition-all duration-200 whitespace-nowrap"
            >
              {langButtonContent}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 dark:border-navy-border hover:border-turquoise hover:text-turquoise dark:hover:border-turquoise transition-all duration-200"
              aria-label="Toggle theme"
            >
              {theme === 'dark'
                ? <Sun size={15} className="text-turquoise" />
                : <Moon size={15} className="text-gray-600" />}
            </button>

            {/* CTA Button */}
            <motion.button
              onClick={() => scrollTo('contact')}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-1.5 px-4 py-2 bg-turquoise text-white text-sm font-semibold rounded-xl hover:bg-turquoise-dark transition-colors duration-200 shadow-sm"
            >
              <Calendar size={14} />
              <span>{t.nav.bookBtn}</span>
            </motion.button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-navy-card2 transition-colors"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {menuOpen
                ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}><X size={20} /></motion.div>
                : <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}><Menu size={20} /></motion.div>
              }
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden bg-white/95 dark:bg-navy-card/95 backdrop-blur-md border-t border-gray-100 dark:border-navy-border"
          >
            <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-1">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.07 }}
                  onClick={() => scrollTo(item.id)}
                  className={`text-start py-3 px-3 rounded-lg text-sm font-medium transition-colors ${
                    activeSection === item.id
                      ? 'text-turquoise bg-turquoise/5'
                      : 'text-gray-700 dark:text-gray-200 hover:text-turquoise hover:bg-turquoise/5'
                  }`}
                >
                  {item.label}
                </motion.button>
              ))}
              <div className="flex items-center gap-2 pt-3 border-t border-gray-100 dark:border-navy-border mt-1">
                <button
                  onClick={toggleLang}
                  className="flex items-center gap-1 px-3 py-1.5 text-sm font-bold border border-turquoise text-turquoise rounded-full whitespace-nowrap"
                >
                  {langButtonContent}
                </button>
                <button onClick={toggleTheme} className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 dark:border-navy-border">
                  {theme === 'dark' ? <Sun size={15} className="text-turquoise" /> : <Moon size={15} />}
                </button>
                <button
                  onClick={() => scrollTo('contact')}
                  className="flex-1 py-2 bg-turquoise text-white text-sm font-semibold rounded-xl text-center"
                >
                  {t.nav.bookBtn}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
