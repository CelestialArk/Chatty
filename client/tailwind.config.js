/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      "rubik-medium": "Rubik-Medium",
      "rubik-light": "Rubik-Light",
      "rubik-regular": "Rubik-Regular",
    },
    extend: {
      colors: {
        primary: "#4d53f6",
      },
    },
  },
  plugins: [require("daisyui")],
};
