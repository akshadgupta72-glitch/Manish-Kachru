import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      screens: {
        "mobile-s": "320px",
        "mobile-m": "375px",
        "mobile-l": "425px",
        tablet: "768px",
        laptop: "1024px",
        "laptop-l": "1440px"
      },
      colors: {
        ink: "#080808",
        bone: "#f7f3ee",
        paper: "#fbfaf8",
        mist: "#e7e1d8",
        rouge: "#8a1f2d",
        champagne: "#c6a76f",
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)"
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)"
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)"
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)"
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)"
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)"
        },
        destructive: {
          DEFAULT: "var(--destructive)"
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)"
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        hero: ["Canela", "var(--font-cormorant)", "Cormorant Garamond", "Georgia", "serif"],
        logo: ["var(--font-poppins)", "Poppins", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"]
      },
      letterSpacing: {
        editorial: "0.08em"
      },
      boxShadow: {
        soft: "0 24px 80px rgba(8, 8, 8, 0.08)"
      },
      keyframes: {
        ticker: {
          "0%": { transform: "translate3d(0, 0, 0)" },
          "100%": { transform: "translate3d(-33.333333%, 0, 0)" }
        }
      }
    }
  },
  plugins: []
};

export default config;
