<script setup lang="ts">
/**
 * Mounts the slot when it is visible in viewport
 * Renders some whitespace with a placeholder width/height if not visibile
 */
const props = withDefaults(
  defineProps<{
    placeholderWidth?: number
    placeholderHeight?: number
    options?: any
  }>(),
  {
    options: () => ({}),
  },
)

const intersectionObserver = ref<IntersectionObserver | null>(null)
const root = ref<InstanceType<typeof HTMLElement> | null>(null)
const observer = ref<InstanceType<typeof HTMLElement> | null>(null)
const hasBeenInViewport = ref(false)
const isMounted = ref(false)

const styles = computed(() => {
  if (hasBeenInViewport.value) { return }
  return {
    width: props.placeholderWidth,
    height: props.placeholderHeight,
    opacity: 0,
  }
})

onMounted(() => {
  isMounted.value = true
  
  if (!('IntersectionObserver' in window)) {
    // no support for IntersectionObserver, just show right away, instead of loading polyfills
    hasBeenInViewport.value = true
    return
  }

  if (hasBeenInViewport.value) { return }

  // Use nextTick to ensure the DOM is fully updated
  nextTick(() => {
    if (observer.value) {
      intersectionObserver.value = new window.IntersectionObserver(
        (entries) => {
          const image = entries[0]
          if (image.intersectionRatio > 0) {
            hasBeenInViewport.value = true
            if (intersectionObserver.value) {
              intersectionObserver.value.disconnect()
            }
          }
        },
        {
          root: null,
          rootMargin: '0px 0px 0px 0px',
          threshold: 0,
          ...props.options,
        },
      )

      intersectionObserver.value.observe(observer.value)
    } else {
      hasBeenInViewport.value = true
    }
  })
})

onUnmounted(() => {
  if (intersectionObserver.value) {
    intersectionObserver.value.disconnect()
  }
})
</script>

<template>
  <ClientOnly>
    <transition
      enter-active-class="transition transform-gpu duration-200 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition transform-gpu duration-100 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
      appear
    >
      <div
        ref="observer"
        :style="styles"
      >
        <slot v-if="hasBeenInViewport && isMounted" />
      </div>
    </transition>
    <template #fallback>
      <div :style="styles">
        <!-- Fallback content during hydration -->
      </div>
    </template>
  </ClientOnly>
</template>
