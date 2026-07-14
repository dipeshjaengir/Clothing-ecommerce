/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: "#000000",
        secondary: "#FFFFFF",
        accent: {
          DEFAULT: "#C9A227", // Luxury Gold
          light: "#DFBA43",
          dark: "#A38018",
        },
        luxury: {
          bg: "#080808",
          card: "#121212",
          border: "#1E1E1E",
          muted: "#8E8E93",
          hover: "#1A1A1A",
        }
      },
      fontFamily: {
        syne: ["Syne", "sans-serif"],
        manrope: ["Manrope", "sans-serif"],
      },
      letterSpacing: {
        editorial: "0.1em",
        wide: "0.2em",
        widest: "0.3em",
      },
      boxShadow: {
        'premium': '0 10px 30px -10px rgba(0, 0, 0, 0.7)',
        'gold': '0 4px 20px -2px rgba(201, 162, 39, 0.2)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      keyframes: {
        shimmer: {
          '100%': { transform: 'translateX(100%)' }
        }
      },
      animation: {
        shimmer: 'shimmer 1.6s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
