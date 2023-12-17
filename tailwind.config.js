/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./projects/ngx-flow-ui/src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("flowbite/plugin")],
};
