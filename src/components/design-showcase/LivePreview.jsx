// src/components/design-showcase/LivePreview.jsx

function hexToRgba(hex, alpha = 0.15) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

function isLight(hex) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return (r * 299 + g * 587 + b * 114) / 1000 > 128
}

const CARD_RADIUS = { flat: '4px', shadow: '12px', glass: '16px' }
const BTN_RADIUS = { sharp: '4px', rounded: '8px', pill: '9999px' }

const PRODUCTS = [
  {
    name: 'Premium Package',
    desc: 'Full-stack web application with modern design',
    price: '$2,499',
    icon: '🚀',
  },
  {
    name: 'Starter Plan',
    desc: 'Beautiful landing page to launch your brand',
    price: '$899',
    icon: '⚡',
  },
  {
    name: 'E-Commerce',
    desc: 'Online store with payment integration',
    price: '$3,299',
    icon: '🛒',
  },
]

export default function LivePreview({ settings }) {
  const {
    primaryColor,
    secondaryColor,
    backgroundColor,
    buttonColor,
    font,
    theme,
    cardStyle,
    buttonStyle,
  } = settings

  const isDark = theme === 'dark'
  const bgColor = isDark ? (backgroundColor.startsWith('#0') || backgroundColor.startsWith('#1') ? backgroundColor : '#0A1628') : backgroundColor
  const surfaceColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'
  const borderColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
  const textPrimary = isDark ? '#f1f5f9' : '#0f172a'
  const textSecondary = isDark ? 'rgba(241,245,249,0.55)' : 'rgba(15,23,42,0.55)'

  const cardStyles = {
    flat: {
      background: surfaceColor,
      boxShadow: 'none',
      border: `1px solid ${borderColor}`,
    },
    shadow: {
      background: isDark ? 'rgba(255,255,255,0.06)' : '#ffffff',
      boxShadow: isDark
        ? `0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px ${borderColor}`
        : '0 8px 32px rgba(0,0,0,0.12)',
      border: 'none',
    },
    glass: {
      background: hexToRgba(primaryColor, isDark ? 0.1 : 0.07),
      backdropFilter: 'blur(16px)',
      boxShadow: `0 8px 32px ${hexToRgba(primaryColor, 0.2)}`,
      border: `1px solid ${hexToRgba(primaryColor, 0.25)}`,
    },
  }

  const btnTextColor = isLight(buttonColor) ? '#0f172a' : '#ffffff'
  const cardRadius = CARD_RADIUS[cardStyle]
  const btnRadius = BTN_RADIUS[buttonStyle]

  const fontImport =
    font === 'Playfair Display'
      ? 'Playfair+Display:wght@400;600;700'
      : `${font.replace(' ', '+')}:wght@400;500;600;700`

  return (
    <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
      {/* Browser chrome */}
      <div className="bg-[#1a2332] px-4 py-2.5 flex items-center gap-2 border-b border-white/10">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400/70" />
          <div className="w-3 h-3 rounded-full bg-yellow-400/70" />
          <div className="w-3 h-3 rounded-full bg-green-400/70" />
        </div>
        <div className="flex-1 bg-white/10 rounded px-3 py-1 text-center">
          <span className="text-white/40 text-xs">kcbuild.com</span>
        </div>
      </div>

      {/* Website Preview */}
      <div
        style={{
          backgroundColor: bgColor,
          fontFamily: `'${font}', sans-serif`,
          minHeight: '520px',
        }}
      >
        {/* Load Google Font */}
        <style>{`@import url('https://fonts.googleapis.com/css2?family=${fontImport}&display=swap');`}</style>

        {/* Preview Navbar */}
        <div
          style={{
            background: isDark
              ? 'rgba(10,22,40,0.9)'
              : 'rgba(255,255,255,0.9)',
            backdropFilter: 'blur(12px)',
            borderBottom: `1px solid ${borderColor}`,
            padding: '12px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '6px',
                background: primaryColor,
              }}
            />
            <span
              style={{
                color: textPrimary,
                fontWeight: 700,
                fontSize: '14px',
              }}
            >
              KC Build
            </span>
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            {['Services', 'Portfolio', 'Contact'].map((item) => (
              <span
                key={item}
                style={{
                  color: textSecondary,
                  fontSize: '12px',
                  cursor: 'pointer',
                }}
              >
                {item}
              </span>
            ))}
          </div>
          <button
            style={{
              background: buttonColor,
              color: btnTextColor,
              padding: '6px 14px',
              borderRadius: btnRadius,
              fontSize: '11px',
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Get Started
          </button>
        </div>

        {/* Hero Section */}
        <div
          style={{
            padding: '36px 24px 28px',
            textAlign: 'center',
            background: isDark
              ? `radial-gradient(ellipse at top, ${hexToRgba(primaryColor, 0.15)} 0%, transparent 65%)`
              : `radial-gradient(ellipse at top, ${hexToRgba(primaryColor, 0.1)} 0%, transparent 65%)`,
          }}
        >
          <div
            style={{
              display: 'inline-block',
              background: hexToRgba(primaryColor, 0.15),
              border: `1px solid ${hexToRgba(primaryColor, 0.3)}`,
              borderRadius: '999px',
              padding: '3px 12px',
              marginBottom: '12px',
            }}
          >
            <span style={{ color: primaryColor, fontSize: '10px', fontWeight: 600 }}>
              ✦ Web Development Agency
            </span>
          </div>
          <h1
            style={{
              color: textPrimary,
              fontSize: '26px',
              fontWeight: 700,
              lineHeight: 1.2,
              marginBottom: '10px',
            }}
          >
            We Build{' '}
            <span style={{ color: primaryColor }}>Digital</span>{' '}
            Experiences
          </h1>
          <p
            style={{
              color: textSecondary,
              fontSize: '12px',
              marginBottom: '18px',
              maxWidth: '280px',
              margin: '0 auto 18px',
            }}
          >
            Modern websites that grow your business and wow your customers.
          </p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button
              style={{
                background: buttonColor,
                color: btnTextColor,
                padding: '9px 20px',
                borderRadius: btnRadius,
                fontSize: '12px',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                boxShadow: `0 4px 14px ${hexToRgba(buttonColor, 0.5)}`,
              }}
            >
              View Our Work
            </button>
            <button
              style={{
                background: 'transparent',
                color: textPrimary,
                padding: '9px 20px',
                borderRadius: btnRadius,
                fontSize: '12px',
                fontWeight: 500,
                border: `1px solid ${borderColor}`,
                cursor: 'pointer',
              }}
            >
              Learn More
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div style={{ padding: '0 20px 24px' }}>
          <p
            style={{
              color: textSecondary,
              fontSize: '10px',
              textAlign: 'center',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              marginBottom: '12px',
            }}
          >
            Our Services
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
            {PRODUCTS.map((p) => (
              <div
                key={p.name}
                style={{
                  ...cardStyles[cardStyle],
                  borderRadius: cardRadius,
                  padding: '14px',
                  transition: 'all 0.3s ease',
                }}
              >
                <div style={{ fontSize: '20px', marginBottom: '8px' }}>{p.icon}</div>
                <div
                  style={{
                    color: textPrimary,
                    fontWeight: 600,
                    fontSize: '12px',
                    marginBottom: '4px',
                  }}
                >
                  {p.name}
                </div>
                <div
                  style={{
                    color: textSecondary,
                    fontSize: '10px',
                    marginBottom: '10px',
                    lineHeight: 1.4,
                  }}
                >
                  {p.desc}
                </div>
                <div
                  style={{
                    color: primaryColor,
                    fontWeight: 700,
                    fontSize: '13px',
                    marginBottom: '8px',
                  }}
                >
                  {p.price}
                </div>
                <button
                  style={{
                    background: hexToRgba(buttonColor, 0.15),
                    color: primaryColor,
                    padding: '5px 10px',
                    borderRadius: btnRadius,
                    fontSize: '10px',
                    fontWeight: 600,
                    border: `1px solid ${hexToRgba(primaryColor, 0.3)}`,
                    cursor: 'pointer',
                    width: '100%',
                  }}
                >
                  Get Quote
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            background: isDark ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.05)',
            borderTop: `1px solid ${borderColor}`,
            padding: '12px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span style={{ color: textSecondary, fontSize: '10px' }}>
            © 2025 KC Build — All Rights Reserved
          </span>
          <div style={{ display: 'flex', gap: '12px' }}>
            {['Instagram', 'GitHub', 'WhatsApp'].map((s) => (
              <span key={s} style={{ color: primaryColor, fontSize: '10px', cursor: 'pointer' }}>
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
