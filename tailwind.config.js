const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}', // Adjust paths as needed
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
