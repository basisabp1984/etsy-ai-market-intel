import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0f172a",
        muted: "#64748b",
        line: "#e2e8f0",
        brand: {
          50: "#eef6ff",
          100: "#d9ebff",
          500: "#2563eb",
          600: "#1d4ed8",
          900: "#172554"
        }
      },
      boxShadow: {
        soft: "0 18px 60px rgba(15, 23, 42, 0.09)",
        glow: "0 16px 40px rgba(37, 99, 235, 0.18)"
      }
    }
  },
  plugins: []
};

export default config;
