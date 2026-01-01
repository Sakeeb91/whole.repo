/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep Cosmic Gold Palette
        void: {
          DEFAULT: '#0a0a0f',
          deep: '#050508',
          cosmic: '#0d0d14',
          indigo: '#12101a',
        },
        gold: {
          dim: '#8b7355',
          muted: '#a08c5c',
          DEFAULT: '#c9a84c',
          bright: '#d4af37',
          pale: '#e8d5a3',
        },
        indigo: {
          deep: '#1a1625',
          cosmic: '#252040',
          mist: '#3d3560',
          glow: '#5c4f8a',
        },
        cream: {
          DEFAULT: '#f5f0e8',
          warm: '#faf6f0',
          soft: '#e8e4dc',
          muted: '#d4d0c8',
        },
      },
      fontFamily: {
        display: ['Marcellus', 'Georgia', 'serif'],
        body: ['Crimson Pro', 'Georgia', 'serif'],
        accent: ['Cormorant Garamond', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'float': 'float 8s ease-in-out infinite',
        'float-delayed': 'float 8s ease-in-out 3s infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'spin-slow': 'spin 90s linear infinite',
        'breathe': 'breathe 6s ease-in-out infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'emerge': 'emerge 1s ease-out forwards',
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'particle': 'particle 25s linear infinite',
        'glow': 'glow 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        breathe: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '0.6', transform: 'scale(1.02)' },
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
          '10%': { opacity: '0.6' },
          '90%': { opacity: '0.6' },
          '100%': { transform: 'translateY(-100vh) rotate(360deg)', opacity: '0' },
        },
        glow: {
          '0%, 100%': {
            textShadow: '0 0 30px rgba(201, 168, 76, 0.4), 0 0 60px rgba(201, 168, 76, 0.2)',
          },
          '50%': {
            textShadow: '0 0 40px rgba(201, 168, 76, 0.6), 0 0 80px rgba(201, 168, 76, 0.3)',
          },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
