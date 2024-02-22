/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        iconGray: '#969696',
        borderGray: '#E6E6E6',
        labelGray: '#666666',
        filterGray: '#C8C8C8',
        textBlue: '#002B56',
        darkGray: '#333333',
        cardGray: '#757575'

      },
      fontFamily: {
        sans: ['Helvetica Neue', 'sans-serif'],
        arial: ['Arial', 'sans-serif']
      },
      fontSize: {
        '1.5xl': '20px',
        '3.5xl': '32px',
        '3.75xl': '34px',
        '5.5xl': '54px'
      }
    },
  },
  plugins: [],
};
