// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  { ignores: ['prismicio-types.d.ts', '**/slices/index.ts'] },
  {
    rules: {
      'no-console': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/no-v-html': 'off',
      'vue/require-default-prop': 'off',
      'vue/require-toggle-inside-transition': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@stylistic/max-statements-per-line': 'warn',
      '@stylistic/quotes': ['warn', 'single', { avoidEscape: true }],
    },
  },
)
