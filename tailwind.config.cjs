/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      transitionTimingFunction: {
        principal: "cubic-bezier(0.7, 0, 0.3, 1)",
      },
      colors: {
        dark: "#141414",
        "second-dark": "#222222",
        light: "#ffffff",
        "second-light": "#f8f8f8",
        principal: "#7B61FF",
      },
    },
    fontFamily: {
      primary: ["Lato", ...defaultTheme.fontFamily.sans],
      secondary: ["Bitter", ...defaultTheme.fontFamily.serif],
    },
  },
  plugins: [],
};
