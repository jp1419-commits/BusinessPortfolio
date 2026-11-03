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
        // Dark brand surfaces (page 2).
        navy: {
          700: '#0f2f5c',
          800: '#0b2447',
          900: '#071a33',
          950: '#050f1f',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      // Every page fills exactly one screen (see PageScrollService), so layouts also adapt to the
      // screen height.
      screens: {
        // Desktop-width but short screens (e.g. 1366×768 and 1536×864 laptops): page 2 tightens to still
        // fit on one screen.
        compact: { raw: '(min-width: 1024px) and (max-height: 760px)' },
        // Desktop-width and very short (e.g. laptops at 150% display scaling): pages tighten further.
        tight: { raw: '(min-width: 1024px) and (max-height: 640px)' },
        // Phones (narrower than `sm`): tighter versions of each page so it fits one screen. Used
        // as overrides next to the regular classes, which then stay as they are on bigger screens.
        // (The `max-*` variants are unavailable with object screens like these.)
        phone: { raw: '(max-width: 639.98px)' },
        // Phones and tablets with a short screen (e.g. iPhone SE, compact Androids): pages drop
        // secondary extras so they still fit.
        short: { raw: '(max-width: 1023.98px) and (max-height: 640px)' },
        // Touch-first devices (phones, tablets): e.g. "Swipe" instead of "Scroll".
        touch: { raw: '(hover: none) and (pointer: coarse)' },
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'scroll-cue': {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '70%': { transform: 'translateY(0.6rem)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '0' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(1)', opacity: '0.6' },
          '100%': { transform: 'scale(1.7)', opacity: '0' },
        },
        'swipe-cue': {
          '0%': { transform: 'translateY(0.5rem)', opacity: '0' },
          '35%': { opacity: '1' },
          '100%': { transform: 'translateY(-0.5rem)', opacity: '0' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'scroll-cue': 'scroll-cue 1.8s ease-in-out infinite',
        'swipe-cue': 'swipe-cue 1.8s ease-out infinite',
        'pulse-ring': 'pulse-ring 2.4s cubic-bezier(0, 0, 0.2, 1) infinite',
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
