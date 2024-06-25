/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        'vibes': ["'Vibes"],
      },
      backgroundImage: {
        'map': "url('/src/assets/map.jpg')",
      },
    },
    colors: {
      'primary': '#1EA896',
      'secondary': '#FF715B',
      gray: "#F7F7F7",
      darkGray: "#D7D7D7",
      white: "#FFF",
      lightWhite: "rgba(255,255,255, 0.3)",
    },
  },
  plugins: [],
}

