// import { fileURLToPath } from 'node:url'
import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  // any custom Vitest config you require
  test: {
    include: ['**/*.spec.ts'],
    exclude: [
      '**/e2e'
    ],
    globals: true,
    environment: 'nuxt',
    environmentOptions: {
      nuxt: {
        mock: {
          intersectionObserver: true
        }
      }
    }
  }
})
