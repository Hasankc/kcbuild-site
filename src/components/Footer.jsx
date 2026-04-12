import { motion } from 'framer-motion'
import { Instagram, Github, ExternalLink } from 'lucide-react'
import { useLang } from '../context/LanguageContext'

export default function Footer() {
  const { t, isRTL } = useLang()
  const f = t.footer

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  const navLinks = [
    { id: 'services', label: f.services },
    { id: 'portfolio', label: f.portfolio },
    { id: 'contact', label: f.contact },
  ]

  return (
    <footer className="relative bg-navy dark:bg-navy text-white overflow-hidden">
      {/* Top gradient divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-turquoise/50 to-transparent" />

      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 start-0 w-72 h-72 rounded-full bg-turquoise/5 blur-3xl" />
        <div className="absolute top-0 end-0 w-48 h-48 rounded-full bg-turquoise/4 blur-3xl" />
        {/* Grid dots */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle, #2DD4BF 1px, transparent 1px)',
            backgroundSize: '36px 36px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-10 mb-10 ${isRTL ? 'text-right' : 'text-left'}`}>
          {/* Col 1 — Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={isRTL ? 'text-right' : 'text-left'}
          >
            <div className={`flex items-center gap-2 mb-3 ${isRTL ? 'justify-end' : 'justify-start'}`} dir="ltr">
              <span className="text-2xl font-black text-turquoise leading-none">Kc</span>
              <span className="text-2xl font-black text-white leading-none">Build</span>
              <span className={isRTL ? 'w-1.5 h-1.5 rounded-full bg-turquoise me-0' : 'w-1.5 h-1.5 rounded-full bg-turquoise ms-2'} />
            </div>
            <p className={`text-sm text-white/50 leading-relaxed mb-4 max-w-[220px] ${isRTL ? 'text-right' : 'text-left'}`}>
              {f.tagline}
            </p>
            <p className={`text-xs text-white/30 ${isRTL ? 'text-right' : 'text-left'}`}>
              {f.madeIn}
            </p>
          </motion.div>

          {/* Col 2 — Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={isRTL ? 'text-right' : 'text-left'}
          >
            <h4 className="text-xs font-bold text-white/50 uppercase tracking-widest mb-4">
              {f.links}
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollTo(link.id)}
                    className="text-sm text-white/60 hover:text-turquoise transition-colors duration-200"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Col 3 — Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={isRTL ? 'text-right' : 'text-left'}
          >
            <h4 className="text-xs font-bold text-white/50 uppercase tracking-widest mb-4">
              {f.social}
            </h4>
            <div className="space-y-3">
              {/* Instagram */}
              <motion.a
                href="https://instagram.com/kcbuild.iq"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 4 }}
                className="flex items-center gap-3 group"
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center flex-shrink-0">
                  <Instagram size={16} className="text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white/80 group-hover:text-turquoise transition-colors">
                    @kcbuild.iq
                  </p>
                  <p className="text-xs text-white/35">Instagram</p>
                </div>
                <ExternalLink size={12} className="text-white/30 group-hover:text-turquoise transition-colors ms-auto" />
              </motion.a>

              {/* GitHub */}
              <motion.a
                href="https://github.com/Hasankc"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 4 }}
                className="flex items-center gap-3 group"
              >
                <div className="w-9 h-9 rounded-xl bg-[#24292e] flex items-center justify-center flex-shrink-0">
                  <Github size={16} className="text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white/80 group-hover:text-turquoise transition-colors">
                    @Hasankc
                  </p>
                  <p className="text-xs text-white/35">GitHub</p>
                </div>
                <ExternalLink size={12} className="text-white/30 group-hover:text-turquoise transition-colors ms-auto" />
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className={`border-t border-white/8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 ${isRTL ? 'text-right' : 'text-left'}`}>
          <p className="text-xs text-white/30">{f.rights}</p>
        </div>
      </div>
    </footer>
  )
}
