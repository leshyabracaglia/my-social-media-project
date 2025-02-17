/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  // presets: [require('nativewind/tailwind')],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', ...fontFamily.sans],
        vt323: ['VT323', ...fontFamily.sans],
        syneMono: ['SyneMono', ...fontFamily.sans],
        silkscreen: ['Silkscreen', ...fontFamily.sans],
        silkscreenBold: ['SilkscreenBold', ...fontFamily.sans],
      },
    },
  },
  plugins: [],
};
