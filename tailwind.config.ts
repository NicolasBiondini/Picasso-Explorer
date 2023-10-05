const defaultTheme = require("tailwindcss/defaultTheme");

import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      purple: "#3f3cbb",
      midnight: "#121063",
      metal: "#565584",
      tahiti: "#3ab7bf",
      silver: "#ecebff",
      "bubble-gum": "#ff77e9",
      bermuda: "#78dcca",
      beige: "#F1E0D2",
      grey: "rgba(241, 224, 210, 0.6)",
      violet: "#8D85FD",
      orange: "#F18841",
      semiblack: "#141414",
      blacklight: "rgba(65, 65, 65, 0.53)",
      loworange: "rgba(242, 153, 74, 0.88)",
      lowviolet: "rgba(141, 133, 253, 0.58)",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontFamily: {
        crimson: ["var(--crimson-font)", ...defaultTheme.fontFamily.sans],
        mukta: ["var(--mukta-font)"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
