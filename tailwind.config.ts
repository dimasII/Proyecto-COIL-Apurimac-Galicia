import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        aetheris: {
          950: "#05090e",
          900: "#0c141f",
          800: "#03060a",
        },
        crema: {
          50: "#fffbf2",
          100: "#fef6e4",
          200: "#f8ead0",
          300: "#efdab4",
        },
        valle: {
          50: "#eef7f0",
          100: "#d7ecdd",
          500: "#1f7a4d",
          600: "#166539",
          700: "#124f2e",
        },
        laguna: {
          100: "#dff2f9",
          500: "#0e7aa5",
          600: "#0b6488",
        },
        maiz: {
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
        },
        andes: {
          50: "#faf7f0",
          100: "#f3ecdd",
          200: "#e6d7b8",
          300: "#d5bd8d",
          400: "#c2a166",
          500: "#a98548",
          600: "#87693a",
          700: "#6d5432",
          800: "#5b462d",
          900: "#4c3b28",
          950: "#1a1207",
        },
        noche: {
          800: "#1a1207",
          900: "#0f0a04",
          950: "#0a0703",
        },
        terracota: {
          50: "#fdf4ef",
          100: "#fae6d7",
          200: "#f4c9ae",
          300: "#eca37c",
          400: "#e07a4e",
          500: "#c65a32",
          600: "#a94528",
          700: "#873723",
          800: "#6e3021",
          900: "#5b2920",
        },
        verde: {
          andino: "#2d5a3d",
          claro: "#4a7c59",
          musgo: "#1e3d2a",
        },
        piedra: {
          50: "#f7f5f0",
          100: "#ede9df",
          200: "#d9d2c0",
          300: "#c2b89e",
        },
      },
      fontFamily: {
        display: ["'Syne'", "'Fraunces'", "Georgia", "serif"],
        sans: ["'Plus Jakarta Sans'", "'Inter'", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(26,18,7,.08), 0 8px 24px -12px rgba(26,18,7,.25)",
        "card-hover": "0 2px 4px rgba(26,18,7,.1), 0 16px 40px -16px rgba(26,18,7,.35)",
        andina: "0 10px 30px -10px rgba(198,90,50,.35)",
      },
      borderRadius: {
        andina: "1.25rem",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        leafFall: {
          "0%": { transform: "translateY(-10vh) translateX(-5vw) rotate(0deg) scale(0.5)", opacity: "0" },
          "10%": { opacity: "0.8" },
          "90%": { opacity: "0.8" },
          "100%": { transform: "translateY(110vh) translateX(25vw) rotate(720deg) scale(1)", opacity: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-400px 0" },
          "100%": { backgroundPosition: "400px 0" },
        },
      },
      animation: {
        "fade-up": "fade-up .45s ease both",
        "leaf-fall-slow": "leafFall 12s linear infinite",
        "leaf-fall-fast": "leafFall 7s linear infinite",
        shimmer: "shimmer 1.4s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
