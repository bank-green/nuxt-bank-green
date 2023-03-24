
export default async function useLottieToggle({ path, toggleState }) {

    const container = ref(null)
    const animData = ref(null)

    onMounted(async () => {
        const lottie = await import('lottie-web/build/player/lottie_light')
        animData.value = lottie.loadAnimation({
            container: container.value, // the dom element that will contain the animation
            renderer: 'svg',
            loop: false,
            prerender: true,
            autoplay: true,
            path, // the path to the animation json
        })
    })

    watch(toggleState, isToggled => {
        if (isToggled) {
            animData.value.setDirection(10)
            animData.value.goToAndPlay(0)
            animData.value.play()
        } else {
            animData.value.setDirection(-10)
            animData.value.goToAndPlay(animData.value.getDuration(true), true)
            animData.value.play()
        }
    })

    return {
        container,
        animData,
    }
}