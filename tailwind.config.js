/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Comic Neue", "sans-serif"],
        comic: ["Comic Neue", "cursive"],
      },
    },
  },
  plugins: [],
};
