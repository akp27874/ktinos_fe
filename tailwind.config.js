/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'deep-purple': '#6A1B9A',
        'health-green': '#2ECC71',
        'teal-wellness': '#1ABC9C',
        'soft-lavender': '#9B59B6',
        'light-bg': '#F5F6F7',
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'opensans': ['Open Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
