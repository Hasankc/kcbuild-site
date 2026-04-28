import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLang } from '../context/LanguageContext'
import {
  Calendar, Send, CheckCircle, AlertCircle,
  User, Mail, MessageSquare, Phone, Loader2, ShieldCheck,
} from 'lucide-react'
import {
  sanitizeForm, validateForm, checkRateLimit,
  isHoneypotTriggered, logSecurityEvent,
} from '../utils/security'

const FORMSPREE_ID = 'mqewnqwe'

const FADE_UP = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1 } }),
}

export default function Booking() {
  const { lang } = useLang()
  const isRTL = lang === 'ar'

  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' })
  const [honeypot, setHoneypot] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const services = isRTL
    ? ['موقع ويب احترافي', 'تطبيق ويب متكامل', 'متجر إلكتروني', 'تصميم UI/UX', 'صيانة وتحديث', 'خدمة أخرى']
    : ['Professional Website', 'Full-Stack Web App', 'E-Commerce Store', 'UI/UX Design', 'Maintenance & Updates', 'Other']

  const handleChange = (e) => {
    const { name, value } = e.target
    setFieldErrors((prev) => ({ ...prev, [name]: null }))
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (isHoneypotTriggered(honeypot)) {
      logSecurityEvent('HONEYPOT_TRIGGERED')
      setStatus('success')
      return
    }

    const rate = checkRateLimit()
    if (!rate.allowed) {
      setStatus('ratelimit')
      setErrorMsg(
        isRTL
          ? `لقد أرسلت عدة رسائل. يرجى الانتظار ${rate.remaining} دقيقة.`
          : `Too many submissions. Please wait ${rate.remaining} minute(s).`
      )
      return
    }

    const clean = sanitizeForm(form)
    const errors = validateForm(clean)
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      setStatus('error')
      setErrorMsg(isRTL ? 'يرجى تصحيح الأخطاء أدناه' : 'Please fix the errors below')
      return
    }

    setStatus('loading')
    setErrorMsg('')
    setFieldErrors({})

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name: clean.name,
          email: clean.email,
          phone: clean.phone || 'Not provided',
          service: clean.service || 'Not specified',
          message: clean.message,
          _subject: `New enquiry from ${clean.name} — KC Build`,
        }),
      })

      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', phone: '', service: '', message: '' })
      } else {
        throw new Error(`HTTP ${res.status}`)
      }
    } catch (err) {
      logSecurityEvent('FORM_SUBMIT_ERROR', { status: err.message })
      setStatus('error')
      setErrorMsg(
        isRTL
          ? 'حدث خطأ. يرجى المحاولة مرة أخرى أو التواصل معنا عبر واتساب.'
          : 'Something went wrong. Please try again or contact us via WhatsApp.'
      )
    }
  }

  const inputClass = (field) =>
    `w-full ps-10 pe-4 py-3 rounded-xl border text-sm transition
     bg-gray-50 dark:bg-navy/50 text-navy dark:text-white placeholder-gray-400
     focus:outline-none focus:ring-2 focus:ring-turquoise/40 focus:border-turquoise
     ${fieldErrors[field] ? 'border-red-400 dark:border-red-500' : 'border-gray-200 dark:border-navy-border'}`

  return (
    <section id="contact" className="py-24 bg-offwhite dark:bg-navy" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={FADE_UP} className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-turquoise/10 text-turquoise text-sm font-semibold mb-4 border border-turquoise/20">
            {isRTL ? '📅 ابدأ مشروعك' : '📅 Start Your Project'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy dark:text-white mb-4">
            {isRTL ? 'تواصل معنا' : 'Get In Touch'}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            {isRTL
              ? 'أخبرنا عن مشروعك وسنتواصل معك خلال 24 ساعة'
              : "Tell us about your project and we'll get back to you within 24 hours"}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 items-start">

          {/* Left */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={FADE_UP} className="space-y-6">

            {/* Calendly card */}
            <div className="rounded-2xl border border-turquoise/20 bg-white dark:bg-navy-card p-8 shadow-lg">
              <div className="w-12 h-12 rounded-xl bg-turquoise/10 flex items-center justify-center mb-4">
                <Calendar className="text-turquoise" size={24} />
              </div>
              <h3 className="text-xl font-bold text-navy dark:text-white mb-2">
                {isRTL ? 'احجز اجتماعاً مجانياً' : 'Book a Free Call'}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                {isRTL
                  ? 'اختر وقتاً يناسبك لمناقشة مشروعك معنا مباشرة'
                  : 'Pick a time that works for you — we reply within 24 hours'}
              </p>
              <a
                href="https://calendly.com/hasankc"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="inline-flex items-center gap-2 px-6 py-3 bg-turquoise hover:bg-teal-500 text-white font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg shadow-turquoise/25"
              >
                <Calendar size={18} />
                {isRTL ? 'احجز الآن — مجاناً' : 'Book Now — Free'}
              </a>
            </div>

            {/* Contact info cards */}
            <div className="grid grid-cols-1 gap-3">
              {[
                {
                  icon: '📧',
                  label: isRTL ? 'البريد الإلكتروني' : 'Email',
                  value: 'kcbuild@yahoo.com',
                  href: 'mailto:kcbuild@yahoo.com',
                },
                {
                  icon: '📱',
                  label: 'WhatsApp',
                  value: '+358 45 113 9969',
                  href: 'https://wa.me/358451139969',
                },
                {
                  icon: '⏰',
                  label: isRTL ? 'وقت الرد' : 'Response Time',
                  value: isRTL ? 'خلال 24 ساعة' : 'Within 24 hours',
                  href: null,
                },
              ].map(({ icon, label, value, href }) => (
                <div key={label} className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-navy-card border border-gray-100 dark:border-navy-border hover:border-turquoise/30 transition-colors">
                  <span className="text-2xl">{icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-400 dark:text-gray-500">{label}</p>
                    {href ? (
                      <a href={href} target={href.startsWith('http') ? '_blank' : undefined}
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-navy dark:text-white hover:text-turquoise transition-colors truncate block">
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm font-semibold text-navy dark:text-white">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Security badge */}
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
              <ShieldCheck size={16} className="text-green-500 shrink-0" />
              <p className="text-xs text-green-700 dark:text-green-400">
                {isRTL
                  ? 'نموذج محمي ضد البريد العشوائي وهجمات الحقن'
                  : 'Form protected against spam, bots & injection attacks'}
              </p>
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={FADE_UP}>
            <div className="rounded-2xl border border-gray-100 dark:border-navy-border bg-white dark:bg-navy-card p-8 shadow-lg">
              <h3 className="text-xl font-bold text-navy dark:text-white mb-6">
                {isRTL ? 'أرسل لنا رسالة' : 'Send Us a Message'}
              </h3>

              {status === 'success' ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                  <CheckCircle className="text-turquoise mx-auto mb-4" size={56} />
                  <h4 className="text-xl font-bold text-navy dark:text-white mb-2">
                    {isRTL ? 'تم الإرسال بنجاح! 🎉' : 'Message Sent! 🎉'}
                  </h4>
                  <p className="text-gray-500 dark:text-gray-400 mb-6">
                    {isRTL ? 'سنتواصل معك خلال 24 ساعة' : "We'll get back to you within 24 hours"}
                  </p>
                  <button onClick={() => setStatus('idle')} className="text-turquoise hover:underline text-sm font-medium">
                    {isRTL ? 'إرسال رسالة أخرى' : 'Send another message'}
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>

                  {/* Honeypot */}
                  <div style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, overflow: 'hidden' }} aria-hidden="true">
                    <input type="text" name="website" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} tabIndex={-1} autoComplete="off" />
                  </div>

                  {/* Name */}
                  <div>
                    <div className="relative">
                      <User size={16} className="absolute top-3.5 start-3.5 text-gray-400" />
                      <input type="text" name="name" value={form.name} onChange={handleChange}
                        placeholder={isRTL ? 'الاسم الكامل *' : 'Full Name *'}
                        maxLength={100} autoComplete="name" className={inputClass('name')} />
                    </div>
                    {fieldErrors.name && <p className="text-red-500 text-xs mt-1 ps-1">{fieldErrors.name}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <div className="relative">
                      <Mail size={16} className="absolute top-3.5 start-3.5 text-gray-400" />
                      <input type="email" name="email" value={form.email} onChange={handleChange}
                        placeholder={isRTL ? 'البريد الإلكتروني *' : 'Email Address *'}
                        maxLength={254} autoComplete="email" className={inputClass('email')} />
                    </div>
                    {fieldErrors.email && <p className="text-red-500 text-xs mt-1 ps-1">{fieldErrors.email}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <div className="relative">
                      <Phone size={16} className="absolute top-3.5 start-3.5 text-gray-400" />
                      <input type="tel" name="phone" value={form.phone} onChange={handleChange}
                        placeholder={isRTL ? 'رقم الهاتف (اختياري)' : 'Phone Number (optional)'}
                        maxLength={20} autoComplete="tel" className={inputClass('phone')} />
                    </div>
                    {fieldErrors.phone && <p className="text-red-500 text-xs mt-1 ps-1">{fieldErrors.phone}</p>}
                  </div>

                  {/* Service */}
                  <select name="service" value={form.service} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-navy-border bg-gray-50 dark:bg-navy/50 text-navy dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-turquoise/40 focus:border-turquoise transition">
                    <option value="">{isRTL ? 'نوع الخدمة (اختياري)' : 'Service Type (optional)'}</option>
                    {services.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>

                  {/* Message */}
                  <div>
                    <div className="relative">
                      <MessageSquare size={16} className="absolute top-3.5 start-3.5 text-gray-400" />
                      <textarea name="message" value={form.message} onChange={handleChange}
                        placeholder={isRTL ? 'أخبرنا عن مشروعك... *' : 'Tell us about your project... *'}
                        rows={4} maxLength={2000}
                        className={`${inputClass('message')} resize-none`} />
                    </div>
                    <div className="flex justify-between mt-1 px-1">
                      {fieldErrors.message ? <p className="text-red-500 text-xs">{fieldErrors.message}</p> : <span />}
                      <p className="text-xs text-gray-400">{form.message.length}/2000</p>
                    </div>
                  </div>

                  {/* Error banner */}
                  {(status === 'error' || status === 'ratelimit') && (
                    <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 dark:bg-red-900/20 px-4 py-3 rounded-xl border border-red-200 dark:border-red-800">
                      <AlertCircle size={16} className="shrink-0" />
                      {errorMsg}
                    </div>
                  )}

                  {/* Submit */}
                  <button type="submit" disabled={status === 'loading'}
                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-turquoise hover:bg-teal-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-200 hover:scale-[1.02] shadow-lg shadow-turquoise/25">
                    {status === 'loading'
                      ? <><Loader2 size={18} className="animate-spin" />{isRTL ? 'جاري الإرسال...' : 'Sending...'}</>
                      : <><Send size={18} />{isRTL ? 'إرسال الرسالة' : 'Send Message'}</>}
                  </button>

                  <p className="text-xs text-gray-400 text-center">
                    🔒 {isRTL ? 'بياناتك محمية ولن تُشارك مع أطراف أخرى' : 'Your data is safe and will never be shared'}
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
      </section>
  )
}
