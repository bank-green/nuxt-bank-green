// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt(
	{
		rules: {
			'no-console': 'off',
			'vue/multi-word-component-names': 'off',
			'vue/no-v-html': 'off',
			'vue/require-default-prop': 'off',
		},
	},
);
