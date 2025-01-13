/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1024px",
    },
    extend: {
      colors: {
        primaryColor: "#f7aa1d",
        primaryColorLight: "#1e3133",
        secondaryColor: "#121d1e",
        paragraphColor: "#888",
        whiteColor: "#d3d3d3",
        base_color: "#032C26",
        base_two: "#035145",
        base_text: "#0CC76D",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "1.5rem",
        },
      },
      animation: {
        slideIn: "slideIn 0.4s ease-out",
        slideOut: "slideOut 0.4s ease-in",
        pulse: "pulse 1.5s infinite",
      },
      keyframes: {
        slideIn: {
          "0%": {
            opacity: "0",
            transform: "translateY(-20px) scale(0.9)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0) scale(1)",
          },
        },
        slideOut: {
          "0%": {
            opacity: "1",
            transform: "translateY(0) scale(1)",
          },
          "100%": {
            opacity: "0",
            transform: "translateY(-20px) scale(0.9)",
          },
        },
        pulse: {
          "0%, 100%": {
            opacity: "1",
          },
          "50%": {
            opacity: "0.5",
          },
        },
      },
    },
  },
  plugins: [],
};
