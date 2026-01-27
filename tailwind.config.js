/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-red': '#D32F2F',
        'navy-blue': '#002060',
        'light-gray': '#F5F5F5',
        'gray-text': '#4A4A4A',
        'light-text': '#757575',
        'dark-text': '#212121',
        'border-color': '#EEEEEE',
        'yellow-badge': '#FFD700',
      },
      boxShadow: {
        'sm': '0 2px 4px rgba(0,0,0,0.05)',
        'md': '0 4px 6px rgba(0,0,0,0.1)',
      }
    },
  },
  plugins: [],
}
