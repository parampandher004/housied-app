/** @type {import('tailwindcss').Config} */
import plugin from "tailwindcss";
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
          400: "#043c57", // tertiaryDark
        },

        base: {
          100: "var(--base-100)",
          200: "var(--base-200)",
          300: "var(--base-300)",
          400: "var(--base-400)",
        },

        black: {
          background: "#000011",
          foreground: "#000000",
          border: "#373737",
          fill: "#484848",
        },

        white: {
          background: "#ededed",
          foreground: "#ffffff",
          border: "#e1e1e1",
          fill: "#d5d5d5",
        },
      },

      fontFamily: {
        ribeyeMarrow: ["Ribeye Marrow", "serif"],
        frederickaTheGreat: ["Fredericka the Great", "serif"],
        modak: ["Modak", "system-ui"],
        delius: ["Delius", "cursive"],
      },
    },
  },
  plugins: [
    function ({ addBase, theme }) {
      const colors = theme("colors");
      const cssVariables = Object.keys(colors).reduce((acc, key) => {
        const color = colors[key];
        if (typeof color === "object") {
          Object.keys(color).forEach((subKey) => {
            acc[`--${key}-${subKey}`] = color[subKey];
          });
        } else {
          acc[`--${key}`] = color;
        }
        return acc;
      }, {});

      addBase({
        ":root": cssVariables,
      });
    },
  ],
};
