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
          50: "#e8f8f2",
          100: "#d1f1e5",
          200: "#a3e3cb",
          300: "#75d5b1",
          400: "#47c797",
          500: "#1D9E75",
          600: "#1a8f69",
          700: "#16805c",
          800: "#127050",
          900: "#0e6144",
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
