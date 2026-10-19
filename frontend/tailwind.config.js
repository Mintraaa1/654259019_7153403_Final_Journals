/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        sage: {
          burgundy: "#700028",
          navy: "#002B66",
          navyHover: "#001D47",
          bg: "#f8fafc",
        },
      },
    },
  },
  plugins: [],
};
