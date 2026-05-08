import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Moon, Sun, Menu, X, Calendar, Sparkles } from 'lucide-react'
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

export default function Navbar({ onNavigate }) {
  const { t, lang, toggleLang } = useLang()
  const { theme, toggleTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  const langButtonContent = lang === 'ar'
    ? (<><FlagIcon country="ar" /><span className="ms-1">AR</span></>)
    : (<><FlagIcon country="en" /><span className="ms-1">EN</span></>)

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
    const el = document.getElementById(id)
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 104
      window.scrollTo({ top, behavior: 'smooth' })
    }
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
          ? 'bg-white/90 dark:bg-navy-card/95 backdrop-blur-xl border-b border-turquoise/10 shadow-lg shadow-black/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* ── Logo ── */}
          <button
            onClick={() => scrollTo('hero')}
            className="flex items-center gap-2 group"
            dir="ltr"
          >
            {/* Icon mark */}
            <div className="w-8 h-8 rounded-lg bg-turquoise flex items-center justify-center shadow-md shadow-turquoise/30 group-hover:scale-110 transition-transform duration-200">
              <span className="text-white font-black text-sm leading-none">K</span>
            </div>
            {/* Wordmark */}
            <div className="flex items-baseline gap-0.5">
              <span className="text-lg font-black text-turquoise tracking-tight leading-none">KcAlish</span>
              <span className="text-lg font-black text-gray-800 dark:text-white tracking-tight leading-none ms-1">Solutions</span>
            </div>
            <span className="w-1.5 h-1.5 rounded-full bg-turquoise animate-pulse-dot hidden sm:block" />
          </button>

          {/* ── Desktop Nav Links ── */}
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

          {/* ── Desktop Controls ── */}
          <div className="hidden md:flex items-center gap-2">
            {/* Language */}
            <button
              onClick={toggleLang}
              className="flex items-center gap-1 px-3 py-1.5 text-sm font-bold border border-turquoise text-turquoise rounded-full hover:bg-turquoise hover:text-white transition-all duration-200 whitespace-nowrap"
            >
              {langButtonContent}
            </button>

            {/* Theme */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 dark:border-navy-border hover:border-turquoise hover:text-turquoise transition-all duration-200"
              aria-label="Toggle theme"
            >
              {theme === 'dark'
                ? <Sun size={15} className="text-turquoise" />
                : <Moon size={15} className="text-gray-600" />}
            </button>

            {/* Design Showcase */}
            <button
              onClick={() => onNavigate && onNavigate('showcase')}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold border border-turquoise/30 text-turquoise rounded-lg hover:bg-turquoise/10 transition-all duration-200"
            >
              <Sparkles size={14} />
              {lang === 'ar' ? 'عرض التصاميم' : 'Design Showcase'}
            </button>

            {/* CTA */}
            <motion.button
              onClick={() => scrollTo('contact')}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-1.5 px-4 py-2 bg-turquoise text-white text-sm font-semibold rounded-xl hover:bg-teal-500 transition-colors duration-200 shadow-md shadow-turquoise/25"
            >
              <Calendar size={14} />
              <span>{t.nav.bookBtn}</span>
            </motion.button>
          </div>

          {/* ── Mobile Hamburger ── */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-controls="mobile-menu"
            aria-expanded={menuOpen}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-100 dark:hover:bg-navy-card2 transition-colors"
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

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden bg-white/95 dark:bg-navy-card/95 backdrop-blur-xl border-t border-gray-100 dark:border-navy-border"
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
              <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-gray-100 dark:border-navy-border mt-1">
                <button onClick={toggleLang}
                  className="flex items-center justify-center gap-1 px-3 py-1.5 text-sm font-bold border border-turquoise text-turquoise rounded-full">
                  {langButtonContent}
                </button>
                <button onClick={toggleTheme}
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 dark:border-navy-border">
                  {theme === 'dark' ? <Sun size={15} className="text-turquoise" /> : <Moon size={15} />}
                </button>
                <button
                  onClick={() => { onNavigate && onNavigate('showcase'); setMenuOpen(false) }}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold border border-turquoise/30 text-turquoise rounded-lg">
                  <Sparkles size={13} />
                  {lang === 'ar' ? 'عرض التصاميم' : 'Showcase'}
                </button>
                <button
                  onClick={() => scrollTo('contact')}
                  className="flex-1 py-2 bg-turquoise text-white text-sm font-semibold rounded-xl text-center min-w-[100px]">
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
