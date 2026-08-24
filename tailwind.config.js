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
          DEFAULT: '#0A0A0C',
          alt: '#131316',
          darker: '#060608',
        },
        surface: {
          panel: '#F4F3F0',
          'panel-dim': '#EBE9E4',
          'dark-card': '#1C1C20',
          'dark-card-hover': '#25252B',
          'dark-border': 'rgba(255, 255, 255, 0.08)',
        },
        flag: {
          DEFAULT: '#FF5A1F',
          hover: '#FF733E',
          dim: '#7A3218',
          glow: 'rgba(255, 90, 31, 0.35)',
        },
        state: {
          solved: '#4ADE80',
          'solved-dim': 'rgba(74, 222, 128, 0.15)',
          revealed: '#FBBF24',
          'revealed-dim': 'rgba(251, 191, 36, 0.15)',
          locked: '#F04438',
          'locked-dim': 'rgba(240, 68, 56, 0.15)',
        },
        txt: {
          'on-dark': '#F4F3F0',
          'on-light': '#131316',
          muted: '#8A8A92',
          subtle: '#63636E',
        }
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        'device': '32px',
        'device-inner': '24px',
        'pill': '9999px',
      },
      boxShadow: {
        'device': '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.1)',
        'panel-card': '0 10px 30px -5px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05)',
        'orange-glow': '0 0 25px -3px rgba(255, 90, 31, 0.45)',
        'orange-glow-sm': '0 0 12px -1px rgba(255, 90, 31, 0.35)',
        'terminal': '0 20px 40px -15px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 90, 31, 0.18)',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      },
      animation: {
        blink: 'blink 1s step-start infinite',
        pulseGlow: 'pulseGlow 3s ease-in-out infinite',
        float: 'float 4s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
