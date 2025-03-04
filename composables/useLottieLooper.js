export default function useLottieLooper({ path }) {
  const container = ref(null)
  const animData = ref(null)

  const loadAnimation = async () => {
    if (animData.value) {
      animData.value.destroy()
    }
    const lottie = await import('lottie-web/build/player/lottie_light')

    animData.value = lottie.loadAnimation({
      container: container.value, // the dom element that will contain the animation
      renderer: 'svg',
      loop: true,
      prerender: true,
      autoplay: true,
      path: path.value, // the path to the animation json
    })
  }

  onUpdated(loadAnimation)

  return {
    container,
    animData,
    loadAnimation,
  }
}
