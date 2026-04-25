import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, Copy, CheckCheck, Palette, ArrowLeft, Sparkles } from 'lucide-react'
import DesignControls from '../components/design-showcase/DesignControls'
import PresetButtons from '../components/design-showcase/PresetButtons'
import LivePreview from '../components/design-showcase/LivePreview'

const DEFAULT_SETTINGS = {
  primaryColor: '#2DD4BF',
  secondaryColor: '#0A1628',
  backgroundColor: '#F5F2EB',
  buttonColor: '#2DD4BF',
  font: 'Inter',
  theme: 'light',
  cardStyle: 'shadow',
  buttonStyle: 'rounded',
}

function Toast({ message, show }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="fixed bottom-6 right-6 z-50 bg-[#2DD4BF] text-[#0A1628] px-4 py-2 rounded-xl font-semibold text-sm shadow-2xl flex items-center gap-2"
        >
          <CheckCheck size={15} />
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function DesignShowcase({ onBack }) {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS)
  const [activePreset, setActivePreset] = useState(null)
  const [toast, setToast] = useState({ show: false, message: '' })
  const [controlsOpen, setControlsOpen] = useState(true)

  const showToast = (message) => {
    setToast({ show: true, message })
    setTimeout(() => setToast({ show: false, message: '' }), 2500)
  }

  const updateSetting = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
    setActivePreset(null)
  }

  const applyPreset = (name, presetSettings) => {
    setSettings((prev) => ({ ...prev, ...presetSettings }))
    setActivePreset(name)
    showToast(`"${name}" preset applied!`)
  }

  const handleExport = () => {
    const json = JSON.stringify(settings, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'kc-build-design.json'
    a.click()
    URL.revokeObjectURL(url)
    showToast('Design exported as JSON!')
  }

  const handleCopyClient = () => {
    const msg =
      `*Client Design Choice*\n\n` +
      `Primary Color: ${settings.primaryColor}\n` +
      `Secondary Color: ${settings.secondaryColor}\n` +
      `Background: ${settings.backgroundColor}\n` +
      `Font: ${settings.font}\n` +
      `Theme: ${settings.theme.charAt(0).toUpperCase() + settings.theme.slice(1)}\n` +
      `Card Style: ${settings.cardStyle.charAt(0).toUpperCase() + settings.cardStyle.slice(1)}\n` +
      `Button Style: ${settings.buttonStyle.charAt(0).toUpperCase() + settings.buttonStyle.slice(1)}`
    navigator.clipboard.writeText(msg).then(() => showToast('Copied! Paste into WhatsApp'))
  }

  const handleReset = () => {
    setSettings(DEFAULT_SETTINGS)
    setActivePreset(null)
    showToast('Reset to KC Build defaults')
  }

  return (
    <div className="min-h-screen bg-[#0A1628] text-white flex flex-col">
      <header className="sticky top-0 z-40 bg-[#0A1628]/95 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center justify-between px-4 md:px-6 py-3 gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 text-white/50 hover:text-[#2DD4BF] transition-colors text-sm shrink-0"
            >
              <ArrowLeft size={15} />
              <span className="hidden sm:inline">Back to Site</span>
            </button>
            <div className="w-px h-5 bg-white/10 hidden sm:block" />
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-[#2DD4BF]/15 border border-[#2DD4BF]/30 flex items-center justify-center shrink-0">
                <Palette size={14} className="text-[#2DD4BF]" />
              </div>
              <div className="min-w-0">
                <h1 className="text-sm font-bold leading-none truncate">Design Showcase</h1>
                <p className="text-[10px] text-white/40 leading-none mt-0.5 hidden sm:block">Live preview for clients</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button onClick={handleReset} className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs text-white/50 hover:text-white border border-white/10 rounded-lg hover:bg-white/5 transition-all">Reset</button>
            <button onClick={handleExport} className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white/70 border border-white/10 rounded-lg hover:bg-white/5 transition-all">
              <Download size={13} />Export JSON
            </button>
            <button onClick={handleCopyClient} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-[#2DD4BF] text-[#0A1628] rounded-lg hover:bg-[#26b8a5] transition-all">
              <Copy size={13} />
              <span className="hidden sm:inline">Copy for Client</span>
              <span className="sm:hidden">Copy</span>
            </button>
          </div>
        </div>
        <PresetButtons activePreset={activePreset} onSelect={applyPreset} />
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className={`shrink-0 border-r border-white/10 overflow-y-auto w-full md:w-72 lg:w-80 ${controlsOpen ? 'block' : 'hidden'} md:block`} style={{ background: 'rgba(255,255,255,0.02)' }}>
          <div className="p-5">
            <div className="flex items-center gap-2 mb-5">
              <Sparkles size={14} className="text-[#2DD4BF]" />
              <span className="text-xs text-[#2DD4BF] font-semibold uppercase tracking-widest">Design Controls</span>
            </div>
            <DesignControls settings={settings} onChange={updateSetting} />
            <div className="mt-6 space-y-2 md:hidden">
              <button onClick={handleExport} className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-medium border border-white/10 rounded-xl text-white/70 hover:bg-white/5">
                <Download size={15} /> Export JSON
              </button>
              <button onClick={handleReset} className="w-full flex items-center justify-center gap-2 py-2.5 text-sm text-white/40 hover:text-white/60 border border-white/10 rounded-xl">Reset to Defaults</button>
            </div>
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="flex items-center justify-between mb-4 md:hidden">
            <span className="text-xs text-white/40 uppercase tracking-widest">Live Preview</span>
            <button onClick={() => setControlsOpen((v) => !v)} className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-white/10 rounded-lg text-white/60 hover:bg-white/5">
              <Palette size={12} />{controlsOpen ? 'Hide Controls' : 'Show Controls'}
            </button>
          </div>
          <div className="hidden md:flex items-center gap-2 mb-4">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-xs text-white/30 uppercase tracking-widest px-3">Live Preview</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>
          <motion.div key={JSON.stringify(settings)} initial={{ opacity: 0.85, scale: 0.995 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.15 }}>
            <LivePreview settings={settings} />
          </motion.div>
          <div className="mt-5 p-4 bg-white/[0.03] border border-white/10 rounded-2xl">
            <p className="text-[10px] text-white/30 uppercase tracking-widest mb-3 font-medium">Current Configuration</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[{ label: 'Font', value: settings.font }, { label: 'Theme', value: settings.theme }, { label: 'Cards', value: settings.cardStyle }, { label: 'Buttons', value: settings.buttonStyle }].map(({ label, value }) => (
                <div key={label}><p className="text-[10px] text-white/30 mb-0.5">{label}</p><p className="text-xs font-semibold text-white/80 capitalize">{value}</p></div>
              ))}
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {[{ label: 'Primary', color: settings.primaryColor }, { label: 'Secondary', color: settings.secondaryColor }, { label: 'Background', color: settings.backgroundColor }, { label: 'Button', color: settings.buttonColor }].map(({ label, color }) => (
                <div key={label} className="flex items-center gap-1.5">
                  <div className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: color }} />
                  <span className="text-[10px] text-white/40 font-mono">{color}</span>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
      <Toast message={toast.message} show={toast.show} />
    </div>
  )
}
