import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "480px",
      sm: "600px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {
      colors: {
        indigo: {
          50: "#eaf4fc",
          100: "#d5e9f8",
          200: "#b3d7f0",
          300: "#81bee4",
          400: "#4da2d9",
          500: "#0071ce",
          600: "#005da8",
          700: "#004f91",
          800: "#064477",
          900: "#0b365d",
          950: "#082642",
        },
      },
    },
  },
  plugins: [],
  darkMode: "class",
} satisfies Config;
