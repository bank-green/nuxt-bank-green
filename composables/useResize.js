/**
 * Responsible for knowing the maximum container size
 */

const DEFAULT_DIAMETER = 320

export default function useResize () {
  const container = ref(null)
  const diameter = ref(window.innerWidth || DEFAULT_DIAMETER)

  const onResize = () => {
    if (container.value) { diameter.value = container.value.clientWidth }
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
