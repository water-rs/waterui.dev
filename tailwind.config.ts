import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        water: {
          blue: "#0047FF",
          red: "#FF2937",
          yellow: "#FFC700",
          ivory: "#F4F0E8",
          black: "#050505"
        }
      },
      fontFamily: {
        grotesk: ["'Space Grotesk'", "sans-serif"]
      }
    }
  },
  plugins: []
} satisfies Config;
