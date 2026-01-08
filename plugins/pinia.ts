// ~/plugins/pinia.ts
import { createPinia } from 'pinia';

export default defineNuxtPlugin(nuxtApp => {
  const pinia = createPinia();
  nuxtApp.vueApp.use(pinia);

  if (import.meta.dev) {
    console.log(
      '[pinia] installed on',
      import.meta.server ? 'server' : 'client'
    );
  }
});
