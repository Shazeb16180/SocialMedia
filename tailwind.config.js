/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      primary: "#755bb4",
      "background-transparent": "rgb(0,0,0,0.5)",
      ...colors,
    },
    extend: {},
  },
  plugins: [],
};
