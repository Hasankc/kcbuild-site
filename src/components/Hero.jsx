import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, ChevronDown, ArrowRight } from 'lucide-react'
import { useLang } from '../context/LanguageContext'

function useCountUp(target, duration = 2000) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          let current = 0
          const step = target / (duration / 16)
          const timer = setInterval(() => {
            current += step
            if (current >= target) {
              setCount(target)
              clearInterval(timer)
            } else {
              setCount(Math.floor(current))
            }
          }, 16)
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])

  return [count, ref]
}

function StatItem({ stat }) {
  const [count, ref] = useCountUp(stat.value)
  return (
    <div ref={ref} className="text-center px-6 sm:px-8">
      <div className="text-3xl sm:text-4xl font-black gradient-text tabular-nums">
        {count}{stat.suffix}
      </div>
      <div className="text-sm text-gray-500 dark:text-gray-400 mt-1 font-medium">{stat.label}</div>
    </div>
  )
}

function TechMarquee({ items }) {
  const doubled = [...items, ...items]
  return (
    <div className="marquee-wrapper py-3 border-y border-turquoise/15 dark:border-turquoise/10">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-2 mx-5 text-sm font-medium text-gray-500 dark:text-gray-400">
            <span className="w-1.5 h-1.5 rounded-full bg-turquoise/60 flex-shrink-0" />
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Hero() {
  const { t, isRTL } = useLang()
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  }

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-start md:justify-center pt-32 pb-24">
      {/* Background Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-[-80px] w-[420px] h-[420px] rounded-full bg-turquoise/8 dark:bg-turquoise/5 blur-3xl animate-float" />
        <div className="absolute bottom-1/4 left-[-100px] w-[350px] h-[350px] rounded-full bg-turquoise/6 dark:bg-turquoise/4 blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-turquoise/4 dark:bg-turquoise/3 blur-3xl animate-float-slow" />
        {/* Decorative grid dots */}
        <div
          className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(circle, #2DD4BF 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-28 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-turquoise/30 bg-turquoise/8 dark:bg-turquoise/10">
              <span className="w-2 h-2 rounded-full bg-turquoise animate-pulse-dot" />
              <span className="text-sm font-semibold text-turquoise-dark dark:text-turquoise">{t.hero.badge}</span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.div variants={itemVariants} className="mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight break-words whitespace-normal leading-relaxed sm:leading-relaxed md:leading-loose overflow-visible pb-2">
              <span className="text-gray-800 dark:text-white block">{t.hero.headline1}</span>
              <span className="gradient-text-animate block">{t.hero.headline2}</span>
            </h1>
          </motion.div>

          {/* Subheadline */}
          <motion.p
            variants={itemVariants}
            className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-500 dark:text-gray-400 leading-relaxed mb-16"
          >
            {t.hero.sub}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16"
          >
            <motion.button
              onClick={() => scrollTo('contact')}
              whileHover={{ scale: 1.04, boxShadow: '0 8px 30px rgba(45,212,191,0.35)' }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-5 py-3 sm:px-7 sm:py-3.5 bg-turquoise text-white font-bold rounded-2xl text-sm sm:text-base shadow-md hover:bg-turquoise-dark transition-colors w-full sm:w-auto justify-center"
            >
              <Calendar size={18} />
              {t.hero.cta1}
            </motion.button>

            <motion.button
              onClick={() => scrollTo('services')}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-5 py-3 sm:px-7 sm:py-3.5 border-2 border-turquoise text-turquoise-dark dark:text-turquoise font-bold rounded-2xl text-sm sm:text-base hover:bg-turquoise/8 transition-all w-full sm:w-auto justify-center"
            >
              {t.hero.cta2}
              <ArrowRight size={18} className={isRTL ? 'rotate-180' : ''} />
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div variants={itemVariants}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white/60 dark:bg-navy-card/60 backdrop-blur-sm rounded-2xl border border-turquoise/10 px-4 py-6 mt-16">
              {t.hero.stats.map((stat, i) => (
                <StatItem key={i} stat={stat} />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Tech Strip Marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="relative z-10 w-full mb-8"
      >
        <TechMarquee items={t.hero.techStrip} />
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-6 inset-x-0 flex flex-col items-center gap-1 text-gray-400"
      >
        <span className="text-xs font-medium">{t.hero.scrollHint}</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </motion.div>
    </section>
  )
}
