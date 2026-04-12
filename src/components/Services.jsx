import { motion } from 'framer-motion'
import {
  ShoppingCart, Scissors, Building2, Code2, Utensils, Stethoscope,
} from 'lucide-react'
import { useLang } from '../context/LanguageContext'

const iconMap = { ShoppingCart, Scissors, Building2, Code2, Utensils, Stethoscope }

function SectionBadge({ text }) {
  return (
    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-turquoise/30 bg-turquoise/8 dark:bg-turquoise/10 mb-4">
      <span className="w-1.5 h-1.5 rounded-full bg-turquoise" />
      <span className="text-xs font-bold text-turquoise-dark dark:text-turquoise uppercase tracking-wider">{text}</span>
    </div>
  )
}

export default function Services() {
  const { t } = useLang()
  const s = t.services

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  }
  const cardVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  }

  return (
    <section id="services" className="py-24 relative">
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

        {/* Cards Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {s.items.map((item, i) => {
            const Icon = iconMap[item.icon]
            return (
              <motion.div key={i} variants={cardVariant}>
                <div className="glass-card p-6 h-full flex flex-col group cursor-default">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-turquoise/12 dark:bg-turquoise/15 flex items-center justify-center mb-4 group-hover:bg-turquoise/20 transition-colors">
                    {Icon && <Icon size={22} className="text-turquoise" />}
                  </div>
                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">{item.title}</h3>
                  {/* Description */}
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed flex-1">{item.desc}</p>
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {item.tags.map((tag, j) => (
                      <span
                        key={j}
                        className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-turquoise/10 text-turquoise-dark dark:text-turquoise border border-turquoise/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
