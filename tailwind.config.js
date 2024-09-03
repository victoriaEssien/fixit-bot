/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        primary: "#1A1A2E",
        secondary: "#16213E",
        highlight: "#0F3460",
        white: "#FFFFFF",
        warning: "E94560",
      },
    },
  },
  plugins: [],
}

