// import { fileURLToPath } from 'node:url'
import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  // any custom Vitest config you require
  test: {
    include: ['**/*.spec.ts'],
    globals: true,
    environment: 'nuxt'
    // environmentOptions: {

    // }
  }
})
