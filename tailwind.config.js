/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0b0f0b',
        panel: '#111611',
        border: '#1f2a1f',
        matrix: '#00ff9c',
        matrixSoft: '#00c26e',
        purple: '#6d28d9',
        yellow: '#facc15',
        graySoft: '#9ca3af',
      },
    },
  },
  plugins: [],
}
