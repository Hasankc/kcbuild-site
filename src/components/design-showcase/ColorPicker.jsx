// src/components/design-showcase/ColorPicker.jsx

export default function ColorPicker({ label, value, onChange }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-sm text-white/70 flex-1">{label}</span>
      <div className="flex items-center gap-2">
        <span className="text-xs font-mono text-white/40">{value}</span>
        <label className="relative cursor-pointer">
          <div
            className="w-8 h-8 rounded-lg border-2 border-white/20 shadow-lg cursor-pointer hover:scale-110 transition-transform"
            style={{ backgroundColor: value }}
          />
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
          />
        </label>
      </div>
    </div>
  )
}
