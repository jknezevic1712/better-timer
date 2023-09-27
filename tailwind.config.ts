import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FF5723",
        accent: "#181947",
      },
    },
  },
  plugins: [],
} satisfies Config;
