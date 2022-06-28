module.exports = {
  env: {
    browser: true,
    es2021: true,
    "googleappsscript/googleappsscript": true,
  },
  extends: ["airbnb-base", "plugin:import/typescript", "prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "googleappsscript"],
  rules: {
    "@typescript-eslint/explicit-function-return-type": "warn",
    "import/extensions": "off",
  },
};
