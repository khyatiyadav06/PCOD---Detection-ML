module.exports = {
  darkMode: 'class', // 👈 Enables dark mode via a CSS class
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        babyPink: "#ffc0cb",
        softViolet: "#e0bbff",
      },
    },
  },
  plugins: [],
}
