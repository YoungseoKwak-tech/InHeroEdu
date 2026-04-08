import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0effd",
          100: "#e2e0fb",
          200: "#c5c1f7",
          300: "#a8a2f3",
          400: "#8b83ef",
          500: "#7F77DD",
          600: "#6b63c9",
          700: "#574fb5",
          800: "#433ba1",
          900: "#2f278d",
        },
        surface: {
          DEFAULT: "#ffffff",
          dark: "#0f0f13",
        },
      },
      fontFamily: {
        sans: ["Inter", "Noto Sans KR", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
