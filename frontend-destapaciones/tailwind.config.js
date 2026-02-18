/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          light: '#e0f2fe',
          DEFAULT: '#0284c7',
          dark: '#0c4a6e',
        }
      }
    },
  },
  plugins: [],
}