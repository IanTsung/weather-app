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
        'sunny': 'linear-gradient(152deg, #b0c8f7 1%, #528af7 54%, #528af7 96%)',
        'cloudy': 'linear-gradient(152deg, #9dbbf5 1%, #528af7 34%, #3b71d9 96%)',
        'rain': 'linear-gradient(152deg, #9ca8e6 1%, #6176e7 54%, #6176e7 96%)',
        'snow': 'linear-gradient(152deg, #9d99e0 1%, #746ddf 54%, #746ddf 96%)',
      }
    },
  },
  plugins: [],
}

