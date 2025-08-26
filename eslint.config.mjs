// @ts-check
import prettierPlugin from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  {
    ignores: ['prismicio-types.d.ts', '**/slices/index.ts'],
  },
  {
    plugins: {
      prettier: prettierPlugin, // Add Prettier plugin
    },
    rules: {
      'no-console': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/no-v-html': 'off',
      'vue/require-default-prop': 'off',
      'vue/require-toggle-inside-transition': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@stylistic/max-statements-per-line': ['error', { max: 2 }],
      '@stylistic/quotes': ['warn', 'single', { avoidEscape: true }],
      '@stylistic/brace-style': ['error', '1tbs', { allowSingleLine: true }],
      'prettier/prettier': ['error'], // Run Prettier as an ESLint rule
    },
  },
  prettierConfig // Extend eslint-config-prettier to disable conflicting rules
)
