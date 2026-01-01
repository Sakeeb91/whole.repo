/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: {
          DEFAULT: '#0a0a0f',
          deep: '#050508',
          cosmic: '#12101a',
          nebula: '#1a1625',
        },
        gold: {
          dim: '#8b7355',
          DEFAULT: '#c9a84c',
          bright: '#d4af37',
          pale: '#e8d5a3',
        },
        ethereal: {
          lavender: '#a89ec9',
          mist: '#c4bde0',
          glow: '#d4cfe8',
        },
        cream: {
          DEFAULT: '#f5f0e8',
          warm: '#faf6f0',
          soft: '#e8e4dc',
        },
        // Psychedelic palette - wholesome rainbow vibes
        psyche: {
          rose: '#ff6b9d',
          coral: '#ff8a80',
          peach: '#ffab91',
          tangerine: '#ffcc80',
          lemon: '#fff59d',
          mint: '#a5d6a7',
          aqua: '#80deea',
          sky: '#90caf9',
          violet: '#b39ddb',
          orchid: '#ce93d8',
          magenta: '#f48fb1',
        },
        aurora: {
          pink: '#ff71ce',
          blue: '#01cdfe',
          green: '#05ffa1',
          yellow: '#fffb96',
          purple: '#b967ff',
        },
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
        body: ['Crimson Pro', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'spin-slow': 'spin 60s linear infinite',
        'breathe': 'breathe 8s ease-in-out infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'emerge': 'emerge 1s ease-out forwards',
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'particle': 'particle 20s linear infinite',
        // Psychedelic animations
        'rainbow-shift': 'rainbowShift 8s ease-in-out infinite',
        'aurora-flow': 'auroraFlow 12s ease-in-out infinite',
        'morph': 'morph 15s ease-in-out infinite',
        'kaleidoscope': 'kaleidoscope 20s linear infinite',
        'wave': 'wave 3s ease-in-out infinite',
        'color-pulse': 'colorPulse 4s ease-in-out infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'spiral': 'spiral 30s linear infinite',
        'blob': 'blob 7s ease-in-out infinite',
        'hue-rotate': 'hueRotate 10s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        breathe: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        emerge: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        particle: {
          '0%': { transform: 'translateY(100vh) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(-100vh) rotate(720deg)', opacity: '0' },
        },
        // Psychedelic keyframes
        rainbowShift: {
          '0%, 100%': { filter: 'hue-rotate(0deg)' },
          '50%': { filter: 'hue-rotate(180deg)' },
        },
        auroraFlow: {
          '0%, 100%': {
            backgroundPosition: '0% 50%',
            filter: 'hue-rotate(0deg) brightness(1)',
          },
          '25%': {
            backgroundPosition: '50% 100%',
            filter: 'hue-rotate(45deg) brightness(1.1)',
          },
          '50%': {
            backgroundPosition: '100% 50%',
            filter: 'hue-rotate(90deg) brightness(1.2)',
          },
          '75%': {
            backgroundPosition: '50% 0%',
            filter: 'hue-rotate(45deg) brightness(1.1)',
          },
        },
        morph: {
          '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '25%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
          '50%': { borderRadius: '50% 60% 30% 60% / 30% 60% 70% 40%' },
          '75%': { borderRadius: '60% 40% 60% 30% / 70% 30% 50% 60%' },
        },
        kaleidoscope: {
          '0%': { transform: 'rotate(0deg) scale(1)' },
          '25%': { transform: 'rotate(90deg) scale(1.1)' },
          '50%': { transform: 'rotate(180deg) scale(1)' },
          '75%': { transform: 'rotate(270deg) scale(1.1)' },
          '100%': { transform: 'rotate(360deg) scale(1)' },
        },
        wave: {
          '0%, 100%': { transform: 'translateY(0) scaleY(1)' },
          '50%': { transform: 'translateY(-10px) scaleY(1.05)' },
        },
        colorPulse: {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(255, 107, 157, 0.5), 0 0 40px rgba(1, 205, 254, 0.3)',
          },
          '33%': {
            boxShadow: '0 0 20px rgba(5, 255, 161, 0.5), 0 0 40px rgba(185, 103, 255, 0.3)',
          },
          '66%': {
            boxShadow: '0 0 20px rgba(1, 205, 254, 0.5), 0 0 40px rgba(255, 107, 157, 0.3)',
          },
        },
        glowPulse: {
          '0%, 100%': {
            textShadow: '0 0 20px rgba(255, 113, 206, 0.8), 0 0 40px rgba(1, 205, 254, 0.6), 0 0 60px rgba(5, 255, 161, 0.4)',
          },
          '50%': {
            textShadow: '0 0 30px rgba(185, 103, 255, 0.9), 0 0 60px rgba(255, 251, 150, 0.7), 0 0 90px rgba(255, 113, 206, 0.5)',
          },
        },
        spiral: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        blob: {
          '0%, 100%': {
            transform: 'translate(0, 0) scale(1)',
            borderRadius: '40% 60% 60% 40% / 60% 40% 60% 40%',
          },
          '25%': {
            transform: 'translate(20px, -30px) scale(1.1)',
            borderRadius: '60% 40% 40% 60% / 40% 60% 40% 60%',
          },
          '50%': {
            transform: 'translate(-20px, 20px) scale(0.95)',
            borderRadius: '40% 60% 70% 30% / 50% 50% 50% 50%',
          },
          '75%': {
            transform: 'translate(10px, 10px) scale(1.05)',
            borderRadius: '50% 50% 40% 60% / 60% 40% 60% 40%',
          },
        },
        hueRotate: {
          '0%': { filter: 'hue-rotate(0deg)' },
          '100%': { filter: 'hue-rotate(360deg)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
}
