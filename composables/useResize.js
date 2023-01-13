
/**
 * Responsible for knowing the maximum container size
 */
export default function useResize() {
  const container = ref(null)
  const diameter = ref(window.innerWidth || 320)

  const onResize = () => {
    if (container.value)
      diameter.value = container.value.clientWidth
  }

  onMounted(() => {
    window.addEventListener('resize', onResize)
    onResize()
  })

  onUnmounted(() => {
    window.removeEventListener('resize', onResize)
  })

  return {
    container,
    diameter
  }
}