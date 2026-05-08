import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLang } from '../context/LanguageContext'
import { ExternalLink, ArrowRight, Star, Users, Zap, ShoppingBag, Globe, Code2 } from 'lucide-react'

const FADE_UP = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.55, delay: i * 0.1 } }),
}

const PROJECTS = [
  {
    id: 1,
    name: 'Melanin Nerd Selections',
    nameAr: 'ميلانين نيرد',
    category: 'E-Commerce',
    categoryAr: 'متجر إلكتروني',
    description: 'Premium skincare e-commerce platform built by KcAlish Solutions for a real client, serving customers across Iraq and the region. Features bilingual Arabic/English support, real-time inventory, Cloudinary image management, and a mobile-first luxury shopping experience.',
    descriptionAr: 'منصة تجارة إلكترونية متميزة للعناية بالبشرة، بُنيت بواسطة KcAlish Solutions لعميل حقيقي وتخدم عملاء في العراق والمنطقة.',
    tech: ['Next.js', 'Cloudinary', 'MongoDB', 'Arabic/English', 'Mobile First'],
    stats: [
      { icon: <Users size={14} />, label: 'Real Customers', labelAr: 'عملاء حقيقيون' },
      { icon: <Globe size={14} />, label: 'Bilingual', labelAr: 'ثنائي اللغة' },
      { icon: <ShoppingBag size={14} />, label: 'Live Store', labelAr: 'متجر نشط' },
    ],
    link: 'https://melanin-nerd-ruby.vercel.app/',
    color: '#c8956c',
    badge: '✦ Live Client Project',
    badgeAr: '✦ مشروع عميل حقيقي',
    featured: true,
    emoji: '🧴',
  },
  {
    id: 2,
    name: 'KcAlish Solutions Website',
    nameAr: 'موقع KcAlish Solutions',
    category: 'Agency Website',
    categoryAr: 'موقع وكالة',
    description: 'A high-performance bilingual web agency website with dark/light mode, smooth animations, RTL Arabic support, custom cursor, scroll progress, and an integrated booking system.',
    descriptionAr: 'موقع وكالة ويب عالي الأداء بدعم ثنائي اللغة، وضع داكن/فاتح، رسوم متحركة سلسة، ونظام حجز متكامل.',
    tech: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion', 'RTL Support'],
    stats: [
      { icon: <Zap size={14} />, label: '100 Performance', labelAr: 'أداء 100%' },
      { icon: <Globe size={14} />, label: 'Bilingual', labelAr: 'ثنائي اللغة' },
      { icon: <Star size={14} />, label: 'Modern UI', labelAr: 'واجهة عصرية' },
    ],
    link: 'https://kcbuild-site.vercel.app/',
    color: '#2DD4BF',
    badge: '✦ Our Own Website',
    badgeAr: '✦ موقعنا الخاص',
    featured: false,
    emoji: '🚀',
  },
  {
    id: 3,
    name: 'Full-Stack SaaS Dashboard',
    nameAr: 'لوحة تحكم SaaS',
    category: 'Web Application',
    categoryAr: 'تطبيق ويب',
    description: 'A modern SaaS analytics dashboard with real-time data visualization, user authentication, role-based access control, and a responsive admin panel built for scale.',
    descriptionAr: 'لوحة تحكم SaaS حديثة مع تصور البيانات الفوري، مصادقة المستخدم، والتحكم بالصلاحيات.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Chart.js', 'JWT Auth'],
    stats: [
      { icon: <Code2 size={14} />, label: 'Full Stack', labelAr: 'كامل المكدس' },
      { icon: <Zap size={14} />, label: 'Real-time', labelAr: 'فوري' },
      { icon: <Star size={14} />, label: 'Scalable', labelAr: 'قابل للتوسع' },
    ],
    link: null,
    color: '#7c3aed',
    badge: '✦ Available for Order',
    badgeAr: '✦ متاح للطلب',
    featured: false,
    emoji: '📊',
  },
  {
    id: 4,
    name: 'Luxury Real Estate Platform',
    nameAr: 'منصة عقارات فاخرة',
    category: 'Real Estate',
    categoryAr: 'عقارات',
    description: 'A premium property listing platform with advanced search, virtual tour integration, bilingual support, WhatsApp lead capture, and a powerful admin CMS.',
    descriptionAr: 'منصة عقارية فاخرة مع فلاتر بحث متقدمة، جولات افتراضية، وواتساب لالتقاط العملاء.',
    tech: ['Next.js', 'Sanity CMS', 'Google Maps', 'WhatsApp API', 'Arabic/English'],
    stats: [
      { icon: <Globe size={14} />, label: 'Bilingual', labelAr: 'ثنائي اللغة' },
      { icon: <Users size={14} />, label: 'Lead Gen', labelAr: 'جذب العملاء' },
      { icon: <Star size={14} />, label: 'Premium UI', labelAr: 'واجهة فاخرة' },
    ],
    link: null,
    color: '#d4af37',
    badge: '✦ Available for Order',
    badgeAr: '✦ متاح للطلب',
    featured: false,
    emoji: '🏡',
  },
]

export default function Portfolio() {
  const { lang } = useLang()
  const isRTL = lang === 'ar'

  return (
    <section id="portfolio" className="py-24 bg-white dark:bg-navy-card" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={FADE_UP} className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-turquoise/10 text-turquoise text-sm font-semibold mb-4 border border-turquoise/20">
            {isRTL ? '🏆 أعمالنا' : '🏆 Our Work'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy dark:text-white mb-4">
            {isRTL ? 'مشاريع حقيقية، نتائج حقيقية' : 'Real Projects, Real Results'}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            {isRTL
              ? 'من المتاجر الإلكترونية إلى التطبيقات المتكاملة — KcAlish Solutions تبني ما يُحدث فارقاً'
              : 'From e-commerce to full-stack apps — KcAlish Solutions builds things that make an impact'}
          </p>
        </motion.div>

        {/* Featured — Melanin Nerd */}
        {PROJECTS.filter(p => p.featured).map((project, i) => (
          <motion.div key={project.id} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={FADE_UP} className="mb-8">
            <div className="relative rounded-3xl overflow-hidden border border-white/10 group" style={{ background: 'linear-gradient(135deg, #1a0f08 0%, #0f0a04 100%)' }}>
              <div className="absolute top-5 start-5 z-10">
                <span className="px-3 py-1.5 rounded-full text-xs font-bold text-white" style={{ background: project.color }}>
                  {isRTL ? project.badgeAr : project.badge}
                </span>
              </div>
              <div className="grid md:grid-cols-2 gap-0 items-center">
                <div className="p-8 md:p-12">
                  <div className="flex items-center gap-3 mb-4 mt-6">
                    <span className="text-4xl">{project.emoji}</span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: project.color }}>
                        {isRTL ? project.categoryAr : project.category}
                      </p>
                      <h3 className="text-2xl md:text-3xl font-bold text-white">{isRTL ? project.nameAr : project.name}</h3>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed mb-6">{isRTL ? project.descriptionAr : project.description}</p>
                  <div className="flex flex-wrap gap-3 mb-6">
                    {project.stats.map((stat, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
                        style={{ background: `${project.color}20`, color: project.color, border: `1px solid ${project.color}40` }}>
                        {stat.icon}{isRTL ? stat.labelAr : stat.label}
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tech.map(t => (
                      <span key={t} className="px-2.5 py-1 rounded-lg text-xs bg-white/10 text-gray-300 border border-white/10">{t}</span>
                    ))}
                  </div>
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer nofollow"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-105 text-white"
                      style={{ background: project.color }}>
                      {isRTL ? 'زيارة الموقع' : 'Visit Live Site'}
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
                <div className="relative h-64 md:h-full min-h-[320px] overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center p-6">
                    <div className="w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10" style={{ background: '#fdf8f5' }}>
                      <div className="flex items-center gap-1.5 px-3 py-2 bg-gray-800">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                        <div className="flex-1 mx-2 bg-gray-700 rounded px-2 py-0.5 text-[10px] text-gray-400">melanin-nerd-ruby.vercel.app</div>
                      </div>
                      <div className="p-4" style={{ background: '#fdf8f5' }}>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full" style={{ background: project.color }} />
                            <span className="text-xs font-bold text-gray-800">Melanin Nerd</span>
                          </div>
                          <span className="text-[10px] text-gray-500">عربي</span>
                        </div>
                        <p className="text-[10px] text-gray-500 mb-3 text-center">Premium skincare selections</p>
                        <div className="grid grid-cols-3 gap-2">
                          {['🧴', '💆', '✨', '🌿', '💊', '🫧'].map((em, idx) => (
                            <div key={idx} className="aspect-square rounded-xl flex items-center justify-center text-xl"
                              style={{ background: `${project.color}20`, border: `1px solid ${project.color}30` }}>{em}</div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Other projects */}
        <div className="grid md:grid-cols-3 gap-6">
          {PROJECTS.filter(p => !p.featured).map((project, i) => (
            <motion.div key={project.id} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={FADE_UP}
              className="relative rounded-2xl overflow-hidden border border-gray-100 dark:border-navy-border bg-white dark:bg-navy group hover:border-turquoise/30 transition-all duration-300 hover:shadow-xl hover:shadow-turquoise/5">
              <div className="h-1 w-full" style={{ background: project.color }} />
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl">{project.emoji}</span>
                  <span className="text-[10px] px-2 py-1 rounded-full font-semibold"
                    style={{ background: `${project.color}15`, color: project.color }}>
                    {isRTL ? project.categoryAr : project.category}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-navy dark:text-white mb-2">{isRTL ? project.nameAr : project.name}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
                  {isRTL ? project.descriptionAr : project.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tech.slice(0, 3).map(t => (
                    <span key={t} className="px-2 py-0.5 rounded text-[10px] bg-gray-100 dark:bg-navy-card2 text-gray-500 dark:text-gray-400">{t}</span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className="px-2 py-0.5 rounded text-[10px] bg-gray-100 dark:bg-navy-card2 text-gray-400">+{project.tech.length - 3}</span>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold" style={{ color: project.color }}>{isRTL ? project.badgeAr : project.badge}</span>
                  {project.link ? (
                    <a href={project.link} target="_blank" rel="noopener noreferrer nofollow"
                      className="flex items-center gap-1 text-xs font-semibold hover:gap-2 transition-all" style={{ color: project.color }}>
                      {isRTL ? 'زيارة' : 'Visit'} <ExternalLink size={12} />
                    </a>
                  ) : (
                    <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                      className="flex items-center gap-1 text-xs font-semibold text-turquoise hover:gap-2 transition-all">
                      {isRTL ? 'اطلب الآن' : 'Order Now'} <ArrowRight size={12} />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={FADE_UP} className="text-center mt-14">
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            {isRTL ? 'هل تريد مشروعاً مشابهاً من KcAlish Solutions؟' : 'Want something like this built by KcAlish Solutions?'}
          </p>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2 px-8 py-3 bg-turquoise hover:bg-teal-500 text-white font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg shadow-turquoise/25">
            {isRTL ? 'ابدأ مشروعك الآن' : "Let's Build Yours"}
            <ArrowRight size={16} />
          </button>
        </motion.div>
      </div>
    </section>
  )
}
