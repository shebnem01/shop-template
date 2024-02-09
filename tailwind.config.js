/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      color:{
        borderColor:"#EBF0ED",
        headerLight:"#18120F",
        labelLight:"#6B6B6B",
      }
    },
  },
  plugins: [],
}