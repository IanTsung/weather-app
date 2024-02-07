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
      },
      backgroundImage: {
        'city-gradient-1': 'linear-gradient(152deg, #b0c8f7 1%, #6495f4 54%, #6495f4 96%)',
        'city-gradient-2': 'linear-gradient(152deg, #9dbbf5 1%, #6294f3 44%, #2f73f5 96%)',
        'city-gradient-3': 'linear-gradient(152deg, #9ca8e6 1%, #6176e7 54%, #6176e7 96%)',
        'city-gradient-4': 'linear-gradient(152deg, #9d99e0 1%, #746ddf 54%, #746ddf 96%)',
      }
    },
  },
  plugins: [],
}

