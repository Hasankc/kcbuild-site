import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Check, Send, Loader2, User, Mail, ChevronDown } from 'lucide-react'
import { useLang } from '../context/LanguageContext'

function SectionBadge({ text }) {
  return (
    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-turquoise/30 bg-turquoise/8 dark:bg-turquoise/10 mb-4">
      <span className="w-1.5 h-1.5 rounded-full bg-turquoise" />
      <span className="text-xs font-bold text-turquoise-dark dark:text-turquoise uppercase tracking-wider">{text}</span>
    </div>
  )
}

const inputClass = `
  w-full px-4 py-3 rounded-xl border bg-white/60 dark:bg-navy-card/50
  border-gray-200 dark:border-navy-border
  text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500
  text-sm font-medium
  focus:outline-none focus:border-turquoise focus:ring-2 focus:ring-turquoise/15
  transition-all duration-200
  appearance-none
`

const errorClass = 'border-red-400 dark:border-red-500 focus:border-red-400 focus:ring-red-400/15'

export default function Booking() {
  const { t, isRTL } = useLang()
  const b = t.booking

  const [form, setForm] = useState({
    name: '', email: '', projectType: '', budget: '', message: '',
  })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | success

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = b.errors.name
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = b.errors.email
    if (!form.message.trim()) errs.message = b.errors.message
    return errs
  }

  const handleChange = (field, value) => {
    setForm(f => ({ ...f, [field]: value }))
    if (errors[field]) setErrors(e => { const ne = { ...e }; delete ne[field]; return ne })
  }

  const handleSubmit = async () => {
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setStatus('sending')
    // Simulate async send — replace with EmailJS or Formspree
    await new Promise(r => setTimeout(r, 1500))
    setStatus('success')
    setForm({ name: '', email: '', projectType: '', budget: '', message: '' })
    setTimeout(() => setStatus('idle'), 5000)
  }

  return (
    <section id="contact" className="py-24 bg-white/40 dark:bg-navy-card/30 relative">
      <div className="section-divider mb-20" />

      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 start-0 w-80 h-80 rounded-full bg-turquoise/5 blur-3xl" />
        <div className="absolute top-0 end-0 w-60 h-60 rounded-full bg-turquoise/5 blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <SectionBadge text={b.badge} />
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black gradient-text mb-4">{b.title}</h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-xl mx-auto">{b.sub}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT — Calendly CTA */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 40 : -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="glass-card p-8 flex flex-col justify-between"
          >
            <div>
              {/* Calendar visual */}
              <div className="w-16 h-16 rounded-2xl bg-turquoise/12 flex items-center justify-center mb-6">
                <Calendar size={28} className="text-turquoise" />
              </div>
              <h3 className="text-2xl font-black text-gray-800 dark:text-white mb-3">{b.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6">{b.sub}</p>

              {/* Feature checklist */}
              <div className="flex flex-col gap-3 mb-8">
                {b.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-turquoise/15 flex items-center justify-center flex-shrink-0">
                      <Check size={11} className="text-turquoise" />
                    </div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Calendly button */}
            <motion.a
              href="https://calendly.com/kcbuild"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03, boxShadow: '0 12px 36px rgba(45,212,191,0.35)' }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-2 w-full py-3.5 bg-turquoise text-white font-bold rounded-2xl text-base shadow-md hover:bg-turquoise-dark transition-colors"
            >
              <Calendar size={18} />
              {b.calendlyBtn}
            </motion.a>
          </motion.div>

          {/* RIGHT — Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="glass-card p-8"
          >
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">{b.formTitle}</h3>

            <div className="space-y-4">
              {/* Name */}
              <div>
                <div className="relative">
                  <User size={15} className="absolute start-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder={b.fields.name}
                    value={form.name}
                    onChange={e => handleChange('name', e.target.value)}
                    className={`${inputClass} ps-10 ${errors.name ? errorClass : ''}`}
                  />
                </div>
                {errors.name && <p className="text-xs text-red-500 mt-1 ms-1">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <div className="relative">
                  <Mail size={15} className="absolute start-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    placeholder={b.fields.email}
                    value={form.email}
                    onChange={e => handleChange('email', e.target.value)}
                    className={`${inputClass} ps-10 ${errors.email ? errorClass : ''}`}
                  />
                </div>
                {errors.email && <p className="text-xs text-red-500 mt-1 ms-1">{errors.email}</p>}
              </div>

              {/* Project Type */}
              <div className="relative">
                <select
                  value={form.projectType}
                  onChange={e => handleChange('projectType', e.target.value)}
                  className={inputClass + ' pe-10 cursor-pointer'}
                >
                  <option value="">{b.fields.projectType}</option>
                  {b.projectTypes.map((opt, i) => (
                    <option key={i} value={opt}>{opt}</option>
                  ))}
                </select>
                <ChevronDown size={15} className="absolute end-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>

              {/* Budget */}
              <div className="relative">
                <select
                  value={form.budget}
                  onChange={e => handleChange('budget', e.target.value)}
                  className={inputClass + ' pe-10 cursor-pointer'}
                >
                  <option value="">{b.fields.budget}</option>
                  {b.budgetOptions.map((opt, i) => (
                    <option key={i} value={opt}>{opt}</option>
                  ))}
                </select>
                <ChevronDown size={15} className="absolute end-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>

              {/* Message */}
              <div>
                <textarea
                  rows={4}
                  placeholder={b.fields.message}
                  value={form.message}
                  onChange={e => handleChange('message', e.target.value)}
                  className={`${inputClass} resize-none ${errors.message ? errorClass : ''}`}
                />
                {errors.message && <p className="text-xs text-red-500 mt-1 ms-1">{errors.message}</p>}
              </div>

              {/* Submit */}
              <motion.button
                onClick={handleSubmit}
                disabled={status === 'sending' || status === 'success'}
                whileHover={status === 'idle' ? { scale: 1.03, boxShadow: '0 8px 24px rgba(45,212,191,0.3)' } : {}}
                whileTap={status === 'idle' ? { scale: 0.97 } : {}}
                className={`w-full py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
                  status === 'success'
                    ? 'bg-green-500 text-white'
                    : 'bg-turquoise text-white hover:bg-turquoise-dark disabled:opacity-70'
                }`}
              >
                <AnimatePresence mode="wait">
                  {status === 'idle' && (
                    <motion.span key="idle" className="flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <Send size={15} /> {b.fields.submit}
                    </motion.span>
                  )}
                  {status === 'sending' && (
                    <motion.span key="sending" className="flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <Loader2 size={15} className="animate-spin" /> {b.fields.sending}
                    </motion.span>
                  )}
                  {status === 'success' && (
                    <motion.span key="success" className="flex items-center gap-2" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                      <Check size={15} /> {b.successMsg}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
