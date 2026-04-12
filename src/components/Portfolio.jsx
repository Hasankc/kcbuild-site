import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, ExternalLink } from 'lucide-react'
import { useLang } from '../context/LanguageContext'

function SectionBadge({ text }) {
  return (
    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-turquoise/30 bg-turquoise/8 dark:bg-turquoise/10 mb-4">
      <span className="w-1.5 h-1.5 rounded-full bg-turquoise" />
      <span className="text-xs font-bold text-turquoise-dark dark:text-turquoise uppercase tracking-wider">{text}</span>
    </div>
  )
}

export default function Portfolio() {
  const { t } = useLang()
  const p = t.portfolio
  const [activeFilter, setActiveFilter] = useState(p.filters[0])

  const filtered = activeFilter === p.filters[0]
    ? p.projects
    : p.projects.filter(proj => proj.category === activeFilter)

  return (
    <section id="portfolio" className="py-24 bg-white/40 dark:bg-navy-card/30 relative">
      <div className="section-divider mb-20" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-10"
        >
          <SectionBadge text={p.badge} />
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black gradient-text mb-4">{p.title}</h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-xl mx-auto">{p.sub}</p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {p.filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                activeFilter === filter
                  ? 'bg-turquoise text-white shadow-sm'
                  : 'border border-turquoise/25 text-gray-500 dark:text-gray-400 hover:border-turquoise hover:text-turquoise'
              }`}
            >
              {filter}
            </button>
          ))}
        </motion.div>

        {/* Cards Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((proj, i) => (
              <motion.div
                key={proj.title}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 }}
              >
                <div className="glass-card overflow-hidden h-full flex flex-col group">
                  {/* Card header gradient */}
                  <div className={`h-24 bg-gradient-to-br ${proj.color} flex items-center justify-center text-4xl relative overflow-hidden`}>
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_50%,white,transparent)]" />
                    <span className="relative z-10 drop-shadow-sm">{proj.icon}</span>
                    {/* Category badge */}
                    <span className="absolute top-3 end-3 px-2 py-0.5 text-xs font-bold bg-white/20 text-white rounded-full backdrop-blur-sm">
                      {proj.category}
                    </span>
                  </div>

                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">{proj.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4 flex-1">{proj.desc}</p>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {proj.tech.map((tag, j) => (
                        <span
                          key={j}
                          className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-turquoise/10 text-turquoise-dark dark:text-turquoise border border-turquoise/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                      <motion.a
                        href={proj.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 dark:border-navy-border text-sm font-semibold hover:border-turquoise hover:text-turquoise transition-all"
                      >
                        <Github size={15} />
                        {p.viewCode}
                      </motion.a>
                      {proj.live ? (
                        <motion.a
                          href={proj.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.97 }}
                          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-turquoise text-white text-sm font-semibold hover:bg-turquoise-dark transition-colors"
                        >
                          <ExternalLink size={15} />
                          {p.viewLive}
                        </motion.a>
                      ) : (
                        <span className="px-4 py-2 text-sm font-semibold text-gray-400 dark:text-gray-500 rounded-xl border border-dashed border-gray-200 dark:border-navy-border">
                          {p.comingSoon}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
