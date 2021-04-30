const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  purge: ["./app/**/*.tsx", "./app/**/*.jsx", "./app/**/*.js", "./app/**/*.ts"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",

      black: "#000",
      white: "#fff",

      amber: colors.amber,
      blue: colors.blue,
      cyan: colors.cyan,
      emerald: colors.emerald,
      fuchsia: colors.fuchsia,
      gray: colors.coolGray,
      green: colors.green,
      indigo: colors.indigo,
      "light-blue": colors.lightBlue,
      lime: colors.lime,
      orange: {
        ...colors.orange,
        1000: "#4a2008",
      },
      pink: {
        ...colors.pink,
        1000: "#460d25",
      },
      purple: colors.purple,
      red: colors.red,
      rose: colors.rose,
      teal: colors.teal,
      violet: colors.violet,
      yellow: colors.yellow,

      code: {
        punctuation: "#A1E8FF",
        tag: "#D58FFF",
        "attr-name": "#4BD0FB",
        "attr-value": "#A2F679",
        string: "#A2F679",
        highlight: "rgba(134, 239, 172, 0.25)",
      },
    },
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
