/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // backgroundColor: {

      // }
      dropShadow: {
        "2xl-light": "0 0 20px rgba(93, 144, 247, 0.1)",
      }
    },
  },
  plugins: [],
}