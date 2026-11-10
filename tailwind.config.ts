import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0B0B0C",
        surface: "#151517",
        elevated: "#1E1E21",
        border: "#2A2A2E",
        accent: "#FF4D00",
        accentHover: "#FF6A26",
        gold: "#E8B923",
        text: "#F5F5F0",
        muted: "#9A9CA3",
      },
      fontFamily: {
        display: ["var(--font-anton)", "Impact", "sans-serif"],
        label: ["var(--font-oswald)", "Arial Narrow", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-hero": ["clamp(2.75rem, 9vw, 6rem)", { lineHeight: "0.92", letterSpacing: "-0.02em" }],
        "display-section": ["clamp(2rem, 5vw, 3rem)", { lineHeight: "0.98", letterSpacing: "-0.01em" }],
      },
      borderRadius: {
        sharp: "2px",
        card: "4px",
        panel: "6px",
      },
      boxShadow: {
        glow: "0 10px 40px -12px rgba(255, 77, 0, 0.55)",
        "glow-sm": "0 6px 24px -10px rgba(255, 77, 0, 0.6)",
        lift: "0 24px 60px -30px rgba(0, 0, 0, 0.9)",
      },
      backgroundImage: {
        "steel-lines":
          "repeating-linear-gradient(115deg, rgba(245,245,240,0.035) 0px, rgba(245,245,240,0.035) 1px, transparent 1px, transparent 14px)",
        "grid-lines":
          "linear-gradient(to right, rgba(245,245,240,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(245,245,240,0.04) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "72px 72px",
      },
      keyframes: {
        "pulse-dot": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.45", transform: "scale(0.8)" },
        },
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "pulse-dot": "pulse-dot 2.2s ease-in-out infinite",
        ticker: "ticker 34s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
