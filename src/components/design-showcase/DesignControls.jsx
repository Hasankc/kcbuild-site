import ColorPicker from './ColorPicker'

const FONTS = ['Inter', 'Poppins', 'Montserrat', 'Roboto', 'Playfair Display']

const Section = ({ title, children }) => (
  <div className="mb-6">
    <p className="text-xs text-[#2DD4BF] uppercase tracking-widest font-medium mb-3">{title}</p>
    <div className="space-y-3">{children}</div>
  </div>
)

const OptionGroup = ({ label, options, value, onChange }) => (
  <div>
    <p className="text-xs text-white/50 mb-2">{label}</p>
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`px-3 py-1.5 rounded text-xs font-medium border transition-all duration-200 ${
            value === opt.value
              ? 'bg-[#2DD4BF] border-[#2DD4BF] text-[#0A1628]'
              : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  </div>
)

export default function DesignControls({ settings, onChange }) {
  return (
    <div>
      <Section title="Colors">
        <ColorPicker label="Primary Color" value={settings.primaryColor} onChange={(v) => onChange('primaryColor', v)} />
        <ColorPicker label="Secondary Color" value={settings.secondaryColor} onChange={(v) => onChange('secondaryColor', v)} />
        <ColorPicker label="Background Color" value={settings.backgroundColor} onChange={(v) => onChange('backgroundColor', v)} />
        <ColorPicker label="Button Color" value={settings.buttonColor} onChange={(v) => onChange('buttonColor', v)} />
      </Section>
      <div className="h-px bg-white/10 my-5" />
      <Section title="Typography">
        <div className="grid grid-cols-1 gap-2">
          {FONTS.map((font) => (
            <button
              key={font}
              onClick={() => onChange('font', font)}
              style={{ fontFamily: font }}
              className={`px-3 py-2 rounded text-sm border transition-all duration-200 text-left ${
                settings.font === font
                  ? 'bg-[#2DD4BF] border-[#2DD4BF] text-[#0A1628] font-semibold'
                  : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'
              }`}
            >
              {font}
            </button>
          ))}
        </div>
      </Section>
      <div className="h-px bg-white/10 my-5" />
      <Section title="Theme & Style">
        <OptionGroup label="Theme" value={settings.theme} onChange={(v) => onChange('theme', v)}
          options={[{ value: 'light', label: 'Light' }, { value: 'dark', label: 'Dark' }]} />
        <OptionGroup label="Card Style" value={settings.cardStyle} onChange={(v) => onChange('cardStyle', v)}
          options={[{ value: 'flat', label: 'Flat' }, { value: 'shadow', label: 'Shadow' }, { value: 'glass', label: 'Glass' }]} />
        <OptionGroup label="Button Style" value={settings.buttonStyle} onChange={(v) => onChange('buttonStyle', v)}
          options={[{ value: 'sharp', label: 'Sharp' }, { value: 'rounded', label: 'Rounded' }, { value: 'pill', label: 'Pill' }]} />
      </Section>
    </div>
  )
}
