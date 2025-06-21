/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['*'],
  theme: {
    extend: {
      keyframes: {
        'bounce-corners': {
          '0%':   { transform: 'translate(0%, 0%)' },
          '25%':  { transform: 'translate(5%, 0%)' },
          '50%':  { transform: 'translate(5%, 5%)' },
          '75%':  { transform: 'translate(0%, 5%)' },
          '100%': { transform: 'translate(0%, 0%)' },
        }
      },
      animation: {
        'bounce-corners': 'bounce-corners 4s linear infinite',
      },
      boxShadow: {
        'yellow-glow': '0 4px 15px rgba(250, 204, 21, 0.6)', // yellow-400
      }
    },
  },
  plugins: [],
}

