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
        "mainbackground": "#fffafa",//メイン背景
        "outbackground": "#e6e6fa",//範囲外背景
        yellow: "#FFDD68",
        beige: "#FFE2B2",
        "beige-dark": "#FFB520",
        "pink-light":"#FFD9E4",
        "pink-dark":"#FF78A0"

        
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
      },
      animation: {
        "flow-right": "flowRight 60s linear infinite",
        "flow-left": "flowLeft 60s linear infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
