/** @type {import('tailwindcss').Config} */
module.exports = {
  
  content: ['./views/**/*.ejs',
  './public/**/*.js',
  'index.ejs'],
  media: false, // or 'media' or 'class'
  theme: {
    colors: {
      secondary: "#D3EAF5",
      black: "black",
      white: "white",
      green: "green",
      darkBlue: "#0D5297",
      lightBlue: "#178BC1",
      lighterBlue: "#21C5EC",
      lightGrey: "#d3d3d3",
      lightGreyer: "#e0e0e0",

    },
    fontFamily: {
      "pt-serif": ["PT Serif", "serif"],
      montserrat: ["Montserrat", "sans-serif"],
    },
    backgroundSize: {
      auto: "auto",
      cover: "cover",
      contain: "contain",
      "100%": "100%",
    },
    extend: {
      backgroundImage: {
        underline1: "url('./assets/Underline1.svg')",
        underline2: "url('./assets/Underline2.svg')",
        underline3: "url('./assets/Underline3.svg')",
        underline4: "url('./assets/Underline4.svg')",
        highlight3: "url('./assets/Highlight3.svg')",
      },
      keyframes: {
        shine: {
          "100%": { left: "125%" },
        },
        "fade-in-down": {
          "0%": {
            opacity: "0",
            transform: "translateY(-10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        shine: "shine ls",
        "fade-in-down": "fade-in-down 0.5s ease-out",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};



