/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution")
const tsParser = require("@typescript-eslint/parser")
const jsParser = require("@babel/eslint-parser")

module.exports = {
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/eslint-config-typescript/recommended',
  ],
  rules: {
    'vue/multi-word-component-names': 'off',
  },
  parserOptions: {
    parser: {
      js: jsParser,
      ts: tsParser,
    },
    requireConfigFile: false,
    babelOptions: {
      plugins: [
        '@babel/plugin-syntax-import-assertions',
      ]
    }
  },
}
