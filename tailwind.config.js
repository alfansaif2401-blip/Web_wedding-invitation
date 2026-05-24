/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#D4AF37',
          light: '#FFE066',
          dark: '#9B7B1B',
        },
        crimson: {
          DEFAULT: '#8B0000',
          light: '#C8102E',
          dark: '#4A0000',
        },
        ivory: {
          DEFAULT: '#F5E6C8',
          dark: '#E8D5A3',
        },
      },
      fontFamily: {
        cormorant: ['Cormorant Garamond', 'Georgia', 'serif'],
        garamond: ['EB Garamond', 'Georgia', 'serif'],
        pinyon: ['Pinyon Script', 'cursive'],
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 8px 2px rgba(212,175,55,0.6)' },
          '50%': { boxShadow: '0 0 20px 8px rgba(212,175,55,0.9)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
};
