module.exports = {
  content: ["./*.{html,js,ts}"],
  darkMode: 'class',
  theme: {
    extends:{animation: {
        softBounce: 'softBounce 0.6s ease-in-out 1',
      },
      keyframes: {
        softBounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '20%': { transform: 'translateY(-8px)' }
        },
      },
    },
    screens: {
      'sm': '640px',
      //=> @media(min-width: 640px){...}
      'md' : '768px',
      //=> @media(min-width: 768px){...}
      'lg' : '1024px',
      //=> @media(min-width: 1024px){...}
      'xl' : '1280px',
      //=> @media(min-width: 1280px){...}
      '2xl' : '1536px'
      //=> @media(min-width: 1536px){...}
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio")
  ],
};
