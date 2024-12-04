/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ch-chill-guy': '#295144',
        'option-bg': '#e5e7eb',
        'dark-grey': 'rgb(209 213 219)',
        'white': '#ffffff'
      },
      fontFamily: {
        poppins: ['Poppins', 'ui-sans-serif'],
        iBM: ['IBM Plex Mono', 'monospace']
      },
    },
  },
  plugins: [],
  // mode: 'jit',
}

