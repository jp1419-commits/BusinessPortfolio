/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand azure from the Innovation Partner identity (logo + infographic).
        primary: {
          50: '#f0f7fe',
          100: '#ddeefc',
          200: '#c2e1fa',
          300: '#93cbf6',
          400: '#5aaeef',
          500: '#2491e6',
          600: '#0a74d1',
          700: '#085ead',
          800: '#0b4f8e',
          900: '#2f3c60ff',
          1000: '#333e5cff',
          1100: '#22293eff',
          1200: '#242833ff',
          1300: '#313236ff',
        },
        // Deep navy for headings and the brand wordmark.
        ink: '#0b1b36',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: ['./src/**/*.{html,ts}'],
//   theme: {
//     extend: {},
//   },
//   plugins: [require('@tailwindcss/forms')
// ,require('@tailwindcss/typography')
// ],
// };
