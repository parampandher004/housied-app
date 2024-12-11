/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#b4bbf2", // primaryLight
          200: "#6874d3", // primary
          300: "#3240af", // primaryMid
          400: "#0c165f", // primaryDark
        },
        secondary: {
          100: "#c8b1f1", // secondayLight
          200: "#8863d2", // secondary
          300: "#582cad", // secondayMid
          400: "#28095e", // secondaryDark
        },
        tertiary: {
          100: "#acd9ef", // tertiaryLight
          200: "#5aa6cc", // tertiary
          300: "#2378a1", // tertiaryMid
          400: "#043c57", // tertiaryDark (corrected from "043cs7")
        },

        black: "#000011",

        white: "#ededed",
      },

      fontFamily: {
        ribeyeMarrow: ["Ribeye Marrow", "serif"],
        frederickaTheGreat: ["Fredericka the Great", "serif"],
        modak: ["Modak", "system-ui"],
        delius: ["Delius", "cursive"],
      },

      // fontFamily: {
      //   parkinsans: ["Parkinsans", "sans-serif"],
      // },
    },
  },
  plugins: [],
};
