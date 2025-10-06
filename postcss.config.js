// postcss.config.js

module.exports = {
  plugins: {
    tailwindcss: {}, // <-- Change it back to this
    autoprefixer: {},
  },
};
// module.exports = {
//   plugins: [
//     require('@tailwindcss/postcss'),
//     require('autoprefixer'),
//   ],
// };