/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
        fontFamily: {
            sans: ['Inter', 'sans-serif'],
            mono: ['JetBrains Mono', 'monospace'],
            display: ['Inter Tight', 'sans-serif'],
        },
        colors: {
            'vlyx-black': '#050505',
            'vlyx-card': '#0f0f0f',
            'vlyx-border': 'rgba(255, 255, 255, 0.08)',
            'accent': '#6366f1',
        },
        animation: {
            'shine': 'shine 3s infinite linear',
            'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            'float': 'float 6s ease-in-out infinite',
            'blob': 'blob 10s infinite',
            'liquid': 'liquid 8s ease-in-out infinite',
            'spin-slow': 'spin 8s linear infinite',
            'typing': 'typing 1.5s infinite ease-in-out',
        },
        keyframes: {
            shine: {
                '0%': { left: '-100%' },
                '100%': { left: '100%' }
            },
            float: {
                '0%, 100%': { transform: 'translateY(0)' },
                '50%': { transform: 'translateY(-20px)' }
            },
            blob: {
                '0%': { transform: 'translate(0px, 0px) scale(1)' },
                '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
                '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
                '100%': { transform: 'translate(0px, 0px) scale(1)' },
            },
            liquid: {
                '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
                '50%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' }
            },
            typing: {
                '0%, 100%': { transform: 'translateY(0)' },
                '50%': { transform: 'translateY(-4px)' }
            }
        }
    }
  },
  plugins: [],
}
