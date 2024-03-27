/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{jsx,js}', "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",],
  theme: {
    extend: {
      backgroundColor: {
        'button-1': '#2c6589',
      }
    },
  },
  plugins: [],
}

