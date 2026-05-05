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
        // ── Space design system ──────────────────────────────
        void: "#00000A",
        "deep-space": "#05050F",
        cosmos: "#0A0A1A",
        "nebula-purple": "#1A0A2E",
        "nebula-blue": "#0A1628",
        "star-white": "#FFFFFF",
        moon: "#E8E8F0",
        dust: "#8888AA",
        dim: "#444466",
        "signal-green": "#00FF88",
        plasma: "#7B61FF",
        corona: "#FFB800",
        "red-alert": "#FF3B3B",
        // ── Legacy primary → signal-green ───────────────────
        primary: {
          50:  "#e6fff3",
          100: "#ccffe7",
          200: "#99ffcf",
          300: "#66ffb7",
          400: "#33ff9f",
          500: "#00FF88",
          600: "#00e67a",
          700: "#00cc6b",
          800: "#00b35e",
          900: "#009950",
        },
        surface: {
          DEFAULT: "#ffffff",
          dark: "#0A0A1A",
        },
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        sans: ["'Inter'", "'Noto Sans KR'", "sans-serif"],
        mono: ["'JetBrains Mono'", "'Space Mono'", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      transitionTimingFunction: {
        cosmos: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
