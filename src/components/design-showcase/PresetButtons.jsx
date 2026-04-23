// src/components/design-showcase/PresetButtons.jsx

const PRESETS = [
  {
    name: 'Modern Tech',
    emoji: '⚡',
    settings: {
      primaryColor: '#2563eb',
      secondaryColor: '#0ea5e9',
      backgroundColor: '#0f172a',
      buttonColor: '#2563eb',
      font: 'Inter',
      theme: 'dark',
      cardStyle: 'shadow',
      buttonStyle: 'rounded',
    },
  },
  {
    name: 'Luxury Brand',
    emoji: '👑',
    settings: {
      primaryColor: '#d4af37',
      secondaryColor: '#000000',
      backgroundColor: '#0a0a0a',
      buttonColor: '#d4af37',
      font: 'Playfair Display',
      theme: 'dark',
      cardStyle: 'glass',
      buttonStyle: 'sharp',
    },
  },
  {
    name: 'Soft Beauty',
    emoji: '🌸',
    settings: {
      primaryColor: '#f472b6',
      secondaryColor: '#f9a8d4',
      backgroundColor: '#fff7fb',
      buttonColor: '#f472b6',
      font: 'Poppins',
      theme: 'light',
      cardStyle: 'shadow',
      buttonStyle: 'pill',
    },
  },
  {
    name: 'Modern Minimal',
    emoji: '◻',
    settings: {
      primaryColor: '#111827',
      secondaryColor: '#6b7280',
      backgroundColor: '#f9fafb',
      buttonColor: '#111827',
      font: 'Inter',
      theme: 'light',
      cardStyle: 'flat',
      buttonStyle: 'sharp',
    },
  },
  {
    name: 'Dark Future',
    emoji: '🌿',
    settings: {
      primaryColor: '#22c55e',
      secondaryColor: '#4ade80',
      backgroundColor: '#030712',
      buttonColor: '#22c55e',
      font: 'Montserrat',
      theme: 'dark',
      cardStyle: 'glass',
      buttonStyle: 'rounded',
    },
  },
  {
    name: 'Creative Agency',
    emoji: '🎨',
    settings: {
      primaryColor: '#7c3aed',
      secondaryColor: '#a78bfa',
      backgroundColor: '#faf5ff',
      buttonColor: '#7c3aed',
      font: 'Poppins',
      theme: 'light',
      cardStyle: 'shadow',
      buttonStyle: 'pill',
    },
  },
]

export default function PresetButtons({ activePreset, onSelect }) {
  return (
    <div className="px-6 py-4 border-b border-white/10">
      <p className="text-xs text-white/40 uppercase tracking-widest mb-3 font-medium">
        Quick Presets
      </p>
      <div className="flex flex-wrap gap-2">
        {PRESETS.map((preset) => (
          <button
            key={preset.name}
            onClick={() => onSelect(preset.name, preset.settings)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 hover:scale-105 ${
              activePreset === preset.name
                ? 'bg-[#2DD4BF] border-[#2DD4BF] text-[#0A1628]'
                : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:border-white/20'
            }`}
          >
            <span>{preset.emoji}</span>
            <span>{preset.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
