import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "base-black": "#030303",
        mainbackground: "#fffafa", //メイン背景
        outbackground: "#e6e6fa", //範囲外背景
        "pink-light": "#FFD9E4",
        "pink-dark": "#FF78A0",
        "yellow-dark": "#FFB520",
        orange: "#FF470B",
      },
      keyframes: {
        flowRight: {
          "0%": { transform: "translateX(8%)" },
          "50%": { transform: "translateX(-430%)" },
          "100%": { transform: "translateX(8%)" },
        },
        flowLeft: {
          "0%": { transform: "translateX(-430%)" },
          "50%": { transform: "translateX(8%)" },
          "100%": { transform: "translateX(-430%)" },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(1000px)", opacity: "0" },
          to: { transform: "translateX(0)", opacity: "1" },
        },
        "fade-in-top": {
          "0%": { transform: "translateY(-50px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        "fade-in-right": {
          "0%": { transform: "translateX(-50px)", opacity: "0" },
          to: { transform: "translateX(0)", opacity: "1" },
        },
      },
      animation: {
        "flow-right": "flowRight 60s linear infinite",
        "flow-left": "flowLeft 60s linear infinite",
        "slide-in-right":
          "slide-in-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940)   both",
        "fade-in-top":
          "fade-in-top 3.3s cubic-bezier(0.390, 0.575, 0.565, 1.000)   both",
        "fade-in-right":
          "fade-in-right 2.3s cubic-bezier(0.390, 0.575, 0.565, 1.000)   both",
      },
    },
  },
  plugins: [],
} satisfies Config;
