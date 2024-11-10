const config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "##4a4e69",
        secondary: "#9a8c98",
        variant1: "#c9ada7",
        variant2: "#22223b",
      },
    },
  },
  plugins: [],
};

module.exports = config;
