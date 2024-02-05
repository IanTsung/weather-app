/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        'alimama' : ['AlimamaYuanTiVF-Square', 'Helvetica']
      }
    },
  },
  plugins: [],
}

