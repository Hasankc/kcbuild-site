import { motion } from 'framer-motion'
import { Quote, Star } from 'lucide-react'
import { useLang } from '../context/LanguageContext'

function SectionBadge({ text }) {
  return (
    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-turquoise/30 bg-turquoise/8 dark:bg-turquoise/10 mb-4">
      <span className="w-1.5 h-1.5 rounded-full bg-turquoise" />
      <span className="text-xs font-bold text-turquoise-dark dark:text-turquoise uppercase tracking-wider">{text}</span>
    </div>
  )
}

export default function Testimonials() {
  const { t } = useLang()
  const tm = t.testimonials

  return (
    <section className="py-24 relative">
      <div className="section-divider mb-20" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <SectionBadge text={tm.badge} />
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black gradient-text mb-4">{tm.title}</h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-xl mx-auto">{tm.sub}</p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tm.items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="glass-card p-6 flex flex-col"
            >
              {/* Quote icon */}
              <Quote size={28} className="text-turquoise/25 dark:text-turquoise/20 mb-3 flex-shrink-0" />

              {/* Stars */}
              <div className="flex gap-1 mb-3">
                {Array.from({ length: item.rating }).map((_, j) => (
                  <Star key={j} size={14} className="text-turquoise fill-turquoise" />
                ))}
              </div>

              {/* Review text */}
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed italic flex-1 mb-5">
                "{item.text}"
              </p>

              {/* User */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-navy-border">
                <div className="w-10 h-10 rounded-full bg-turquoise/15 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-black text-turquoise-dark dark:text-turquoise">{item.avatar}</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800 dark:text-white leading-tight">{item.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{item.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
