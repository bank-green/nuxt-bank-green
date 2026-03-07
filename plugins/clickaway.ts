import type { DirectiveBinding, VNode } from 'vue';
import { defineNuxtPlugin } from '#app';

interface HTMLElementWithClickOutside extends HTMLElement {
  clickOutsideEvent?: (event: Event) => void;
}

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.directive('clickaway', {
    mounted(
      el: HTMLElementWithClickOutside,
      binding: DirectiveBinding,
      _: VNode
    ) {
      el.clickOutsideEvent = (event: Event) => {
        const target = event.target as Node;
        if (!(el === target || el.contains(target))) {
          binding.value(el, event);
        }
      };
      document.addEventListener('click', el.clickOutsideEvent);
    },
    unmounted(el: HTMLElementWithClickOutside) {
      if (el.clickOutsideEvent) {
        document.removeEventListener('click', el.clickOutsideEvent);
      }
    },
  });
});
