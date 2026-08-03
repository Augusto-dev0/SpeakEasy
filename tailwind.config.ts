import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Azul suave (marca / confiança)
        sky: {
          50: "#f0f7ff",
          100: "#dcecff",
          200: "#b8d9ff",
          300: "#87bfff",
          400: "#4f9fff",
          500: "#2b7fff",
          600: "#1a63e0",
          700: "#164fb3",
          800: "#153f8a",
          900: "#0f2a5c",
        },
        // Verde menta (progresso / sucesso / energia)
        mint: {
          50: "#effcf6",
          100: "#d6f7e8",
          200: "#aeeed3",
          300: "#7ce0ba",
          400: "#4bcd9d",
          500: "#2bb283",
          600: "#1c8f69",
          700: "#187256",
          800: "#165b46",
          900: "#124a3a",
        },
        ink: {
          50: "#f6f7f9",
          100: "#eceef1",
          200: "#d5dae1",
          300: "#aab3c0",
          400: "#7c879a",
          500: "#5b6577",
          600: "#454e5e",
          700: "#333a47",
          800: "#20242e",
          900: "#14161c",
        },
      },
      fontFamily: {
        display: ["var(--font-baloo)", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      boxShadow: {
        soft: "0 8px 30px -12px rgba(20, 60, 120, 0.18)",
        softDark: "0 8px 30px -12px rgba(0, 0, 0, 0.5)",
      },
      keyframes: {
        wave: {
          "0%, 100%": { transform: "scaleY(0.4)" },
          "50%": { transform: "scaleY(1)" },
        },
        pulseRing: {
          "0%": { transform: "scale(0.9)", opacity: "0.7" },
          "70%": { transform: "scale(1.4)", opacity: "0" },
          "100%": { transform: "scale(1.4)", opacity: "0" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        wave: "wave 1.1s ease-in-out infinite",
        pulseRing: "pulseRing 1.8s ease-out infinite",
        floatSlow: "floatSlow 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
