/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        blueDark: "#334488",
        blueMid: "#6677bb",
        blueLight: "#99aaee",

        blackVariant: "#000011",

        whiteVariant: "#ededed",

        buttonColor: "#169385",
      },

      fontFamily: {
        parkinsans: ["Parkinsans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
