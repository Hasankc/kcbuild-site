import { useEffect, useState, useRef } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import { LanguageProvider } from './context/LanguageContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Portfolio from './components/Portfolio'
import Skills from './components/Skills'
import Process from './components/Process'
import Testimonials from './components/Testimonials'
import Booking from './components/Booking'
import Footer from './components/Footer'
import { ArrowUp } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import DesignShowcase from './pages/DesignShowcase'

// ─── Detect current "page" from URL hash ─────────────────────────────────────
function usePage() {
  const [page, setPage] = useState(
    () => window.location.hash === '#design-showcase' ? 'showcase' : 'home'
  )

  // Listen for hash changes (back/forward browser button)
  useEffect(() => {
    const onChange = () => {
      setPage(window.location.hash === '#design-showcase' ? 'showcase' : 'home')
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  const navigate = (target) => {
    if (target === 'showcase') {
      window.location.hash = 'design-showcase'
    } else {
      window.location.hash = ''
    }
    setPage(target)
    window.scrollTo(0, 0)
  }

  return { page, navigate }
}

// ─── Scroll to Top button ─────────────────────────────────────────────────────
function ScrollToTop() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 rtl:right-auto rtl:left-6 z-50 w-11 h-11 rounded-full bg-turquoise text-white flex items-center justify-center shadow-lg hover:bg-turquoise-dark transition-colors"
          aria-label="Back to top"
        >
          <ArrowUp size={18} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

// ─── Scroll Progress bar ──────────────────────────────────────────────────────
function ScrollProgress() {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? (scrolled / max) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <div
      className="scroll-progress"
      style={{ width: `${progress}%` }}
    />
  )
}

// ─── Custom Cursor ────────────────────────────────────────────────────────────
function CustomCursor() {
  const dot = useRef(null)
  const ring = useRef(null)
  useEffect(() => {
    const move = (e) => {
      if (dot.current) {
        dot.current.style.left = e.clientX + 'px'
        dot.current.style.top = e.clientY + 'px'
      }
      if (ring.current) {
        ring.current.style.left = e.clientX + 'px'
        ring.current.style.top = e.clientY + 'px'
      }
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])
  if (typeof window !== 'undefined' && window.innerWidth < 768) return null
  return (
    <>
      <div ref={dot} className="cursor-dot hidden md:block" />
      <div ref={ring} className="cursor-ring hidden md:block" />
    </>
  )
}

// ─── Main home page content ───────────────────────────────────────────────────
function AppContent({ onNavigate }) {
  return (
    <div className="min-h-screen pt-28 bg-offwhite dark:bg-navy text-gray-800 dark:text-gray-100 transition-colors duration-300 overflow-x-hidden">
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 rounded-md bg-white text-slate-900 px-3 py-2 shadow-sm dark:bg-navy-card dark:text-white"
      >
        Skip to content
      </a>
      <ScrollProgress />
      <CustomCursor />

      {/* Pass onNavigate so Navbar can add the Design Showcase link */}
      <Navbar onNavigate={onNavigate} />

      <div className="h-20" aria-hidden="true" />
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <Skills />
        <Process />
        <Testimonials />
        <Booking />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}

// ─── Root App ─────────────────────────────────────────────────────────────────
export default function App() {
  const { page, navigate } = usePage()

  return (
    <ThemeProvider>
      <LanguageProvider>
        {page === 'showcase' ? (
          <DesignShowcase onBack={() => navigate('home')} />
        ) : (
          <AppContent onNavigate={navigate} />
        )}
      </LanguageProvider>
    </ThemeProvider>
  )
}
