/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontSize: {
        'xxxs': '0.4rem',
        'xxs': '0.55rem',
        ...defaultTheme.fontSize
      },
      fontFamily: {
        'sans': ['IBM Plex Sans', ...defaultTheme.fontFamily.sans],
        'serif': ['IBM Plex Serif', ...defaultTheme.fontFamily.serif],
        'mono': ['IBM Plex Mono', ...defaultTheme.fontFamily.mono],
      },
    }
  },
  plugins: [],
}
