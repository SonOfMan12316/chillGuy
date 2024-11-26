/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      poppins: ['Poppins', 'ui-sans-serif'],
      iBM: ['IBM Plex Mono', 'monospace']
    },
    colors: {
      'ch-chill-guy': '#8F9A79',
    }
  },
  plugins: [],
  // mode: 'jit',
}

