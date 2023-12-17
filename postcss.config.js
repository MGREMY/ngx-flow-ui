/**
 * @format
 */

module.exports = {
  plugins: {
    'postcss-import': {},
    'tailwindcss/nesting': {},
    'postcss-preset-env': {
      features: { 'nesting-rules': false },
    },
    tailwindcss: {},
    autoprefixer: {},
  },
};
