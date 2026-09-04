import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-barlow)', 'system-ui', 'sans-serif'],
        body:    ['var(--font-inter)',   'system-ui', 'sans-serif'],
        script:  ['var(--font-script)',  'cursive'],
      },
      fontSize: {
        'hero':     ['clamp(2.8rem, 1.5rem + 5.5vw, 6rem)',   { lineHeight: '0.95', letterSpacing: '-0.02em'  }],
        'hero-sub': ['clamp(1rem, 0.75rem + 0.85vw, 1.2rem)', { lineHeight: '1.75', letterSpacing: '0.005em' }],
        'section':  ['clamp(2rem, 1rem + 4.5vw, 4rem)',       { lineHeight: '1.0',  letterSpacing: '-0.02em'  }],
        '8xl':  ['6rem',  { lineHeight: '1' }],
        '9xl':  ['8rem',  { lineHeight: '1' }],
        '10xl': ['10rem', { lineHeight: '1' }],
      },
      colors: {
        dark: {
          950: '#050505',
          900: '#0a0a0a',
          850: '#0f0f0f',
          800: '#141414',
          750: '#191919',
          700: '#1e1e1e',
          600: '#262626',
          500: '#333333',
          400: '#404040',
        },
        brand: {
          orange:         '#FF6A00',
          'orange-dark':  '#CC5500',
          'orange-light': '#FF8A3D',
          'orange-glow':  'rgba(255,106,0,0.4)',
          silver:         '#94a3b8',
        },
      },
      backgroundImage: {
        'card-gradient':   'linear-gradient(135deg, rgba(255,255,255,0.045) 0%, rgba(255,255,255,0.01) 100%)',
        'accent-gradient': 'linear-gradient(135deg, #FF8A3D, #FF6A00, #E85400)',
        'diagonal-cuts':   'repeating-linear-gradient(-55deg, transparent, transparent 20px, rgba(255,106,0,0.015) 20px, rgba(255,106,0,0.015) 22px)',
        'orange-gradient': 'linear-gradient(135deg, #FF6A00 0%, #CC5500 100%)',
      },
      boxShadow: {
        'glow-orange':    '0 0 30px rgba(255,106,0,0.35)',
        'glow-orange-lg': '0 0 60px rgba(255,106,0,0.5)',
        'card':           '0 4px 24px rgba(0,0,0,0.6)',
        'card-hover':     '0 8px 40px rgba(255,106,0,0.15)',
      },
      keyframes: {
        heroGradient: {
          '0%,100%': { backgroundPosition: '0% 50%' },
          '50%':     { backgroundPosition: '100% 50%' },
        },
        accentCycle: {
          '0%':   { backgroundPosition: '0% 50%' },
          '50%':  { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%':     { transform: 'translateY(-8px)' },
        },
        pulseOrange: {
          '0%,100%': { boxShadow: '0 0 20px rgba(255,106,0,0.3)' },
          '50%':     { boxShadow: '0 0 50px rgba(255,106,0,0.65)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        slideInLeft: {
          '0%':   { transform: 'translateX(-60px)', opacity: '0' },
          '100%': { transform: 'translateX(0)',      opacity: '1' },
        },
      },
      animation: {
        'hero-gradient': 'heroGradient 20s ease infinite',
        'accent-cycle':  'accentCycle 12s ease infinite',
        'marquee':       'marquee 38s linear infinite',
        'float':         'float 3.5s ease-in-out infinite',
        'pulse-orange':  'pulseOrange 2.5s ease-in-out infinite',
        'shimmer':       'shimmer 3s ease infinite',
        'slide-left':    'slideInLeft 0.6s cubic-bezier(0.25,0.46,0.45,0.94) forwards',
      },
    },
  },
  plugins: [],
}

export default config
