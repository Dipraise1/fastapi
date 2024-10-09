/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{html,js,jsx}",
    "./components/**/*.{html,js,jsx}",
    "./sections/**/*.{html,js,jsx}",
    "./styles/**/*.{js,jsx}",
  ],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        "primary-black": "#1A232E", // Keeping this dark black for primary background
        "secondary-white": "#c7c7c7", // Keeping this as a secondary white
        "solana-dark": "#130C24", // Dark theme background color inspired by Solana
        "solana-accent": "#9945FF", // Solana purple accent color
        "solana-blue": "#14F195",   // Solana turquoise accent color
        "solana-light": "#2E1E57",  // A lighter variation for backgrounds or sections
      },
      transitionTimingFunction: {
        "out-flex": "cubic-bezier(0.05, 0.6, 0.4, 0.9)",
      },
    },
  },
  plugins: [],
};
