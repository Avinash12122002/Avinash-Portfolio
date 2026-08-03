/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        dm: ['DM Sans', 'sans-serif'],
        fira: ['Fira Code', 'monospace'],
      },
      colors: {
        cyan: {
          DEFAULT: '#00d9f0',
          400: '#00d9f0',
          500: '#00bcd4',
          600: '#0097a7',
        },
        purple: {
          DEFAULT: '#8b5cf6',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
        },
        dark: {
          DEFAULT: '#030305',
          2: '#080810',
          3: '#0e0e18',
          4: '#12121f',
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease forwards',
        'fade-left': 'fadeLeft 0.7s ease forwards',
        'fade-right': 'fadeRight 0.7s ease forwards',
        float: 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
        shimmer: 'shimmer 2.5s linear infinite',
        blink: 'blink 1s step-end infinite',
        'spin-slow': 'spin 10s linear infinite',
        'border-glow': 'borderGlow 3s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeLeft: {
          '0%': { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeRight: {
          '0%': { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-18px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(0,217,240,0.2)' },
          '50%': { boxShadow: '0 0 40px rgba(0,217,240,0.5), 0 0 80px rgba(0,217,240,0.15)' },
        },
        shimmer: {
          from: { backgroundPosition: '200% center' },
          to: { backgroundPosition: '-200% center' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        borderGlow: {
          '0%, 100%': { borderColor: 'rgba(0,217,240,0.2)' },
          '50%': { borderColor: 'rgba(0,217,240,0.6)' },
        },
      },
      backgroundImage: {
        'grid-pattern': `linear-gradient(rgba(0,217,240,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,217,240,0.05) 1px, transparent 1px)`,
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      backgroundSize: {
        grid: '60px 60px',
      },
    },
  },
  plugins: [],
}
