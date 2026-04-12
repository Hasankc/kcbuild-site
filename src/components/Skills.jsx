import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Monitor, Server, Wrench } from 'lucide-react'
import { useLang } from '../context/LanguageContext'

const iconMap = { Monitor, Server, Wrench }

function SkillBar({ name, level }) {
  const [width, setWidth] = useState(0)
  const ref = useRef(null)
  const triggered = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true
          setTimeout(() => setWidth(level), 150)
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [level])

  return (
    <div ref={ref} className="mb-4 last:mb-0">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{name}</span>
        <span className="text-xs font-bold text-turquoise">{level}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-gray-100 dark:bg-navy-border overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-turquoise to-turquoise-dark transition-all duration-1000 ease-out"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  )
}

function SectionBadge({ text }) {
  return (
    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-turquoise/30 bg-turquoise/8 dark:bg-turquoise/10 mb-4">
      <span className="w-1.5 h-1.5 rounded-full bg-turquoise" />
      <span className="text-xs font-bold text-turquoise-dark dark:text-turquoise uppercase tracking-wider">{text}</span>
    </div>
  )
}

export default function Skills() {
  const { t } = useLang()
  const s = t.skills

  return (
    <section className="py-24 relative">
      <div className="section-divider mb-20" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <SectionBadge text={s.badge} />
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black gradient-text mb-4">{s.title}</h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-xl mx-auto">{s.sub}</p>
        </motion.div>

        {/* Skill Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {s.categories.map((cat, i) => {
            const Icon = iconMap[cat.icon]
            return (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="glass-card p-6"
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-turquoise/12 flex items-center justify-center">
                    {Icon && <Icon size={18} className="text-turquoise" />}
                  </div>
                  <h3 className="font-bold text-gray-800 dark:text-white">{cat.name}</h3>
                </div>

                {/* Skills */}
                <div>
                  {cat.skills.map((skill, j) => (
                    <SkillBar key={j} name={skill.name} level={skill.level} />
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
