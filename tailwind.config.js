/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{html,ts,md}"],
  theme: {
    extend: {
      typography: {
        DEFAULT: {},
      },
    },
  },
  daisyui: {
    themes: ["light", "night"],
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
