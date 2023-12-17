/**
 * @format
 * @type {import('tailwindcss').Config}
 */

module.exports = {
  content: [
    './node_modules/flowbite/**/*.js',
    './projects/ngx-flow-ui/**/*.{html,ts}',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('flowbite/plugin')],
};
