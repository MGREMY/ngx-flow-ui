/**
 * @format
 * @type {import('tailwindcss').Config}
 */

module.exports = {
  content: ['./projects/src/**/*.{html,ts}', './node_modules/flowbite/**/*.js'],
  theme: {
    extend: {},
  },
  plugins: [require('flowbite/plugin')],
};
