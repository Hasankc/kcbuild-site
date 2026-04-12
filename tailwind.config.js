/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        offwhite: '#F5F2EB',
        turquoise: {
          DEFAULT: '#2DD4BF',
          light: '#CCFBF1',
          dark: '#0F766E',
          glow: 'rgba(45,212,191,0.15)',
        },
        navy: {
          DEFAULT: '#0A1628',
          card: '#0F1E2E',
          card2: '#162235',
          border: '#1E3045',
        },
      },
      fontFamily: {
        cairo: ['Cairo', 'sans-serif'],
        sora: ['Sora', 'sans-serif'],
      },
      animation: {
        float: 'float 7s ease-in-out infinite',
        'float-delayed': 'float 9s ease-in-out 2s infinite',
        'float-slow': 'float 11s ease-in-out 4s infinite',
        marquee: 'marquee 25s linear infinite',
        'pulse-dot': 'pulse-dot 2s ease-in-out infinite',
        'gradient-x': 'gradient-x 6s ease infinite',
        blink: 'blink 1s step-end infinite',
        'slide-up': 'slide-up 0.6s ease forwards',
        'fade-in': 'fade-in 0.8s ease forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-20px) rotate(1deg)' },
          '66%': { transform: 'translateY(-10px) rotate(-1deg)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        'pulse-dot': {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.5)', opacity: '0.5' },
        },
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
      backgroundSize: {
        '300%': '300%',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
