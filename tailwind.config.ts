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
        bg: "#08090A",
        surface: "#101113",
        elevated: "#16181A",
        border: "#26282B",
        accent: "#FF4D00",
        accentHover: "#FF6A26",
        gold: "#D8B45A",
        text: "#F3F0E9",
        muted: "#9C9991",
      },
      fontFamily: {
        display: ["var(--font-anton)", "Impact", "sans-serif"],
        label: ["var(--font-oswald)", "Arial Narrow", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-hero": [
          "clamp(3.4rem, 10.6vw, 9rem)",
          { lineHeight: "0.82", letterSpacing: "-0.025em" },
        ],
        "display-section": [
          "clamp(2.3rem, 5.6vw, 4.4rem)",
          { lineHeight: "0.9", letterSpacing: "-0.02em" },
        ],
        "display-sub": [
          "clamp(1.6rem, 3vw, 2.4rem)",
          { lineHeight: "0.95", letterSpacing: "-0.01em" },
        ],
      },
      letterSpacing: {
        label: "0.24em",
      },
      borderRadius: {
        sharp: "1px",
      },
      maxWidth: {
        edge: "1400px",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translate3d(0,0,0)" },
          "100%": { transform: "translate3d(-50%,0,0)" },
        },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
