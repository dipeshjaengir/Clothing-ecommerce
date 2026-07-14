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
        primary: "#0B0B0B",
        secondary: "#F8F8F8",
        accent: {
          DEFAULT: "#C9A227", // Luxury Gold
          light: "#DFBA43",
          dark: "#A38018",
        },
        luxury: {
          bg: "#0B0B0B",
          card: "#161616",
          border: "#242424",
          muted: "#9A9A9A",
          hover: "#222222",
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
        'premium': '0 15px 40px -15px rgba(0, 0, 0, 0.9)',
        'gold': '0 4px 20px -2px rgba(201, 162, 39, 0.15)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.45)',
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
        shimmer: 'shimmer 1.8s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
