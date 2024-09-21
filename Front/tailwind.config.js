/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      keyframes: {
        refine: {
          "10%": {
            right: "1.5rem",
          },
          "0%": {
            right: "0.5rem",
          },
        },
      },
      animation: {
        "refine-slide": "refine 2s infinite",
      },
    },
  },
  plugins: [],
};