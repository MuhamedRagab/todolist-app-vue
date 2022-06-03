module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "plugin:prettier/recommended",
    "prettier",
  ],
  parserOptions: {
    parser: "@babel/eslint-parser",
    "prettier/prettier": [
      "error",
      { singleQuote: true, parser: "flow", endOfLine: "auto" },
    ],
    fileInfoOptions: {
      withNodeModules: true,
    },
    usePrettierrc: false,
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "prettier/prettier": "error",
    "arrow-body-style": "off",
    "prefer-arrow-callback": "off",
  },
};
