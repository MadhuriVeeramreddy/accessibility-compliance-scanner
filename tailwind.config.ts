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
        primary: {
          DEFAULT: "#4e18e2",
          50: "#f3f0ff",
          100: "#e9e3ff",
          200: "#d4c7ff",
          300: "#b5a0ff",
          400: "#8f6eff",
          500: "#4e18e2",
          600: "#3d0fc7",
          700: "#320ba0",
          800: "#2a0a84",
          900: "#250b6e",
        },
        'text-primary': '#21262C',
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },
      fontSize: {
        'hero-h1': ['80px', { lineHeight: '1.1', letterSpacing: '-0.05em' }],
        'hero-h2': ['60px', { lineHeight: '1.1', letterSpacing: '-0.05em' }],
        'hero-p': ['16px', { lineHeight: '1.5', letterSpacing: '-0.02em' }],
      },
      backgroundImage: {
        'dotted-pattern': 'radial-gradient(circle, currentColor 1px, transparent 1px)',
      },
      backgroundSize: {
        'dotted': '12px 12px',
      },
    },
  },
  plugins: [],
};
export default config;

