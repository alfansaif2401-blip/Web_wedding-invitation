import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        maroon: {
          DEFAULT: "#6B1226",
          dark: "#4A0D1A",
          light: "#8B1F35",
        },
        gold: {
          DEFAULT: "#C9A84C",
          light: "#E2C472",
          pale: "#F0DFA0",
          deep: "#A07830",
        },
        cream: {
          DEFAULT: "#F5ECD7",
          dark: "#EAD9BB",
          warm: "#FBF5E6",
        },
      },
      fontFamily: {
        display: ["'Cormorant Garamond'", "serif"],
        body: ["'EB Garamond'", "serif"],
        accent: ["'Cinzel Decorative'", "serif"],
        javanese: ["'Noto Serif'", "serif"],
      },
      animation: {
        "ken-burns": "kenBurns 20s ease-in-out infinite alternate",
        "float-slow": "floatSlow 6s ease-in-out infinite",
        "shimmer": "shimmer 3s ease-in-out infinite",
        "pulse-gold": "pulseGold 2s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
        "fade-up": "fadeUp 1.2s ease forwards",
        "draw-line": "drawLine 2s ease forwards",
      },
      keyframes: {
        kenBurns: {
          "0%": { transform: "scale(1) translate(0%, 0%)" },
          "50%": { transform: "scale(1.08) translate(-1%, -1%)" },
          "100%": { transform: "scale(1.12) translate(1%, -2%)" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        pulseGold: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(201,168,76,0.4)" },
          "50%": { boxShadow: "0 0 0 12px rgba(201,168,76,0)" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(40px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        drawLine: {
          from: { strokeDashoffset: "1000" },
          to: { strokeDashoffset: "0" },
        },
      },
      backgroundImage: {
        "batik-pattern": "url('/assets/batik.svg')",
        "gold-shimmer":
          "linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.4) 50%, transparent 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
