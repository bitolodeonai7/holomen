/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
      },
      colors: {
        'neon-blue': '#00f3ff',
        'neon-purple': '#b300ff',
      },
    },
  },
  plugins: [],
};