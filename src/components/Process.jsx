import { motion } from 'framer-motion'
import { MessageSquare, PenTool, Code2, Rocket } from 'lucide-react'
import { useLang } from '../context/LanguageContext'

const iconMap = { MessageSquare, PenTool, Code2, Rocket }

function SectionBadge({ text }) {
  return (
    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-turquoise/30 bg-turquoise/8 dark:bg-turquoise/10 mb-4">
      <span className="w-1.5 h-1.5 rounded-full bg-turquoise" />
      <span className="text-xs font-bold text-turquoise-dark dark:text-turquoise uppercase tracking-wider">{text}</span>
    </div>
  )
}

export default function Process() {
  const { t } = useLang()
  const p = t.process

  return (
    <section id="process" className="pt-48 pb-24 bg-white/40 dark:bg-navy-card/30 relative">
      <div className="section-divider mb-20" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-24"
        >
          <SectionBadge text={p.badge} />
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black gradient-text mb-20 leading-loose">{p.title}</h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-xl mx-auto mt-4 mb-12">{p.sub}</p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connector Line (desktop) */}
          <div className="hidden lg:block absolute top-10 start-[12%] end-[12%] h-px border-t-2 border-dashed border-turquoise/30 dark:border-turquoise/20 z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 md:gap-6 relative z-10">
            {p.steps.map((step, i) => {
              const Icon = iconMap[step.icon]
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.14, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center md:items-center text-center"
                >
                  {/* Step number + icon circle */}
                  <div className="relative mb-5">
                    <div className="w-20 h-20 rounded-2xl bg-white dark:bg-navy-card border-2 border-turquoise/25 flex flex-col items-center justify-center shadow-sm group hover:border-turquoise hover:shadow-md hover:shadow-turquoise/15 transition-all duration-300">
                      {Icon && <Icon size={22} className="text-turquoise mb-1" />}
                      <span className="text-xs font-black gradient-text">{step.number}</span>
                    </div>
                  </div>

                  {/* Text */}
                  <h3 className="text-base font-bold text-gray-800 dark:text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{step.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
