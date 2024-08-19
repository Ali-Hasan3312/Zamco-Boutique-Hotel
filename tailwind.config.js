/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-nav':'#282c2e',
        'custom-yellow' : '#f2bc24'
      },
      components: {
        '.hexagon': {
          'clip-path': 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
        },
      },
    },
  },
  plugins: [],
}

