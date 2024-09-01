import { defineNuxtPlugin } from '#app'
import { DirectiveBinding, VNode } from 'vue'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('clickaway', {
    mounted (el: any, binding: DirectiveBinding<any>, _: VNode<any, any>) {
      el.clickOutsideEvent = (event: { target: any }) => {
        if (!(el === event.target || el.contains(event.target))) {
          binding.value(el, event)
        }
      }
      document.addEventListener('click', el.clickOutsideEvent)
    },
    unmounted (el) {
      document.removeEventListener('click', el.clickOutsideEvent)
    }
  })
})
