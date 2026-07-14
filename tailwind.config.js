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
        primary: "#111111", // Dark editorial primary text
        secondary: "#F8F7F3", // Soft warm background
        accent: {
          DEFAULT: "#B68D40", // Premium Accent Gold
          light: "#C59F58",
          dark: "#96722E",
        },
        luxury: {
          bg: "#F8F7F3", // Soft warm cream
          card: "#FFFFFF", // Crisp white cards
          border: "#E4DED3", // Light beige dividers
          muted: "#6D6D6D", // Editorial secondary grey
          hover: "#EFECE6", // Secondary surface beige
        }
      },
      fontFamily: {
        syne: ["Syne", "sans-serif"],
        manrope: ["Manrope", "sans-serif"],
        playfair: ["Playfair Display", "serif"],
        cormorant: ["Cormorant Garamond", "serif"],
      },
      letterSpacing: {
        editorial: "0.1em",
        wide: "0.2em",
        widest: "0.3em",
      },
      boxShadow: {
        'premium': '0 20px 40px -20px rgba(182, 141, 64, 0.12), 0 5px 15px -5px rgba(0, 0, 0, 0.04)',
        'gold': '0 4px 20px -2px rgba(182, 141, 64, 0.18)',
        'glass': '0 8px 32px 0 rgba(182, 141, 64, 0.05)',
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
