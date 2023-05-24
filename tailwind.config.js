/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/component/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [],
  theme: {
    extend: {
      animation: {
        'flip-vertical-right': 'flip-vertical-right 0.8s cubic-bezier(0.455, 0.030, 0.515, 0.955) both',
      },
      keyframes: {
        'flip-vertical-right': {
          '0%': {
            transform: 'rotateY(0)',
          },
          to: {
            transform: 'rotateY(360deg)',
          },
        },
      },
    },
  },
}
