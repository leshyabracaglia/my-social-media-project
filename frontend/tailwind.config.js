/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  // presets: [require('nativewind/tailwind')],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', ...fontFamily.sans],
      },
    },
    fontFamily: {
      openSans: ['"Open Sans"'],
    },
  },
  plugins: [],
};
