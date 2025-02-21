import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-quicksand)'],
      },
      colors: {
        primary: {
          blue: '#2563eb',
          purple: '#8b5cf6',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
