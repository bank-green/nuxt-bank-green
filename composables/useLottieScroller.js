export default function useLottieScroller ({ path, actions }) {
  const container = ref(null)
  const animData = ref(null)
  const totalFrames = ref(1)

  const onScroll = () => {
    if (!container.value) {
      return
    }
    const rect = container.value.getBoundingClientRect()
    const { top, height } = rect

    // Calculate current view percentage
    const current = window.innerHeight - top
    const max = window.innerHeight + height
    const pct = current / max

    // Find the first action that satisfies the current position conditions
    const action = actions.find(
      ({ visibility }) => pct >= visibility[0] && pct <= visibility[1]
    )

    if (!action) {
      return
    }

    const pctInSegment =
      (pct - action.visibility[0]) /
      (action.visibility[1] - action.visibility[0])

    const frame =
      pctInSegment * (action.frames[1] - action.frames[0]) + action.frames[0]

    animData.value.goToAndStop(
      Math.ceil(Math.min(totalFrames.value, Math.max(0, frame))),
      true
    )
  }

  const onReady = () => {
    totalFrames.value = animData.value.getDuration(true)
    window.addEventListener('scroll', onScroll, false)
  }

  onMounted(async () => {
    const lottie = await import('lottie-web/build/player/lottie_light')

    animData.value = lottie.loadAnimation({
      container: container.value, // the dom element that will contain the animation
      renderer: 'svg',
      loop: false,
      prerender: true,
      autoplay: false,
      path: path ?? '' // the path to the animation json
    })

    animData.value.addEventListener('DOMLoaded', onReady)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll, false)
  })

  return {
    container,
    animData,
    totalFrames
  }
}
