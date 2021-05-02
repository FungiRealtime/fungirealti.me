const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  mode: "jit",
  purge: ["./app/**/*.tsx", "./app/**/*.jsx", "./app/**/*.js", "./app/**/*.ts"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        brand: "#f95858",
      },
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            maxWidth: "none",
            code: {
              fontWeight: "400",
              backgroundColor: theme("colors.gray.100"),
              padding: "0.1rem 0.25rem",
              color: theme("colors.brand"),
            },
            "code::before": {
              content: "",
            },
            "code::after": {
              content: "",
            },
            a: {
              color: theme("colors.brand"),
              textDecoration: "none",
            },
            "h2 > a": {
              fontWeight: "inherit",
              color: "inherit",
              textDecoration: "inherit",
            },
            "h3 > a": {
              fontWeight: "inherit",
              color: "inherit",
              textDecoration: "inherit",
            },
            "h4 > a": {
              fontWeight: "inherit",
              color: "inherit",
              textDecoration: "inherit",
            },
            "h5 > a": {
              fontWeight: "inherit",
              color: "inherit",
              textDecoration: "inherit",
            },
            "h6 > a": {
              fontWeight: "inherit",
              color: "inherit",
              textDecoration: "inherit",
            },
          },
        },
      }),
    },
  },
  variants: {},
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
