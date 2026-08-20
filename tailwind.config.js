/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          light: '#EEF4F7',
          light2: '#E5EEF2',
        },
        navy: {
          DEFAULT: '#102A43',
          deep: '#0B1F33',
        },
        med: {
          DEFAULT: '#1677A8',
          50: '#E8F2F7',
          100: '#D2E5EE',
          200: '#A6CBD9',
          300: '#79B1CB',
          400: '#4D96BA',
          500: '#1677A8',
          600: '#126088',
          700: '#0E4A68',
          800: '#0A3548',
          900: '#061F30',
        },
        cyan: {
          DEFAULT: '#21C4D6',
          400: '#5DD7E3',
          600: '#1BA7B7',
        },
        ink: '#172B3A',
        muted: '#526777',
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      },
      boxShadow: {
        glass: '0 8px 32px rgba(16, 42, 67, 0.08)',
        'glass-lg': '0 20px 60px rgba(16, 42, 67, 0.14)',
        glow: '0 0 24px rgba(33, 196, 214, 0.25)',
        'glow-med': '0 0 24px rgba(22, 119, 168, 0.3)',
      },
      backdropBlur: {
        xs: '2px',
      },
      keyframes: {
        ringRotate: {
          '0%, 100%': { 'border-color': 'rgba(22,119,168,0.7)' },
          '50%': { 'border-color': 'rgba(33,196,214,0.85)' },
        },
        blobDrift: {
          '0%, 100%': { transform: 'translate(0,0) scale(1)' },
          '33%': { transform: 'translate(30px,-20px) scale(1.08)' },
          '66%': { transform: 'translate(-20px,20px) scale(0.96)' },
        },
      },
      animation: {
        ringRotate: 'ringRotate 4s ease-in-out infinite',
        blobDrift: 'blobDrift 18s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
