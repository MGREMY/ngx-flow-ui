/**
 * @format
 * @type {import('tailwindcss').Config}
 */

module.exports = {
  content: ['**/*.{html,ts}', '../../node_modules/flowbite/**/*.js'],
  theme: {
    extend: {},
  },
  plugins: [require('flowbite/plugin')],
};
