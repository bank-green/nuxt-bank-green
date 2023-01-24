<template>
    <ClientOnly>
        <picture v-if="useImageTag">
            <source type="image/webp" :srcset="srcsetOptionsWebP" />
            <source :srcset="srcsetOptions" />
            <img ref="img" :src="src" :alt="alt" :width="width" :height="height" loading="lazy"
                class="transition-opacity ease-in-out duration-150" :class="[
                    imgClass,
                    {
                        'opacity-0': !loaded,
                        'opacity-100': loaded,
                    },
                ]" @load="onLoad" />
        </picture>
        <!-- not in viewport -->
        <span v-else-if="!hasBeenInViewport" ref="observer" class="block w-full h-full" />
        <!-- scrolled to, loading -->
        <img v-else-if="!loaded" ref="img" :src="src" :srcset="srcsetOptions" class="w-px h-px absolute opacity-0"
            :alt="alt" @load="onLoad" />
        <!-- transition can be disabled if we have loaded this image before and it's cached -->
        <span v-else-if="!useTransition" :style="bgStyle" :currentSrc="currentSrc" class="block w-full h-full"
            :class="imgClass" />
        <!-- visible as a background image -->
        <transition v-else enter-from-class="opacity-0" enter-active-class="transition ease-out duration-150"
            enter-to-class="opacity-100" leave-from-class="opacity-100"
            leave-active-class="transition ease-in duration-200" leave-to-class="opacity-0" appear>
            <span :style="bgStyle" :currentSrc="currentSrc" class="block w-full h-full" :class="imgClass" />
        </transition>
    </ClientOnly>
</template>

<script>

/**
 * Note: This might have issues displaying when the src file contains spaces! eg "Some file.png" will not work
 */
export default {
    props: {
        src: String,
        imgClass: [String, Array],
        useImageTag: { type: Boolean, default: false },
        width: [String, Number],
        height: [String, Number],
        srcset: String,
        skipObserver: { type: Boolean, default: false },
        alt: { type: String, default: '' },
    },
    data() {
        return {
            useTransition: true,
            observer: null,
            hasBeenInViewport: false,
        }
    },
    computed: {
        srcsetOptions() {
            return getSrcSet(this.srcset, this.src)
        },
        srcsetOptionsWebP() {
            return getSrcSet(this.srcset, this.src, 'webp')
        },
        currentSrc() {
            return imageCacheService.state.imageLoaded[this.src]
        },
        loaded() {
            return !!this.currentSrc
        },
        bgStyle() {
            return { backgroundImage: `url(${this.currentSrc})` }
        },
    },
    created() {
        if (this.loaded || this.useImageTag) {
            this.useTransition = false
        }

        if (this.loaded || this.skipObserver || this.useImageTag) {
            this.hasBeenInViewport = true
        }
    },
    mounted() {
        if (!('IntersectionObserver' in window)) {
            // no support for IntersectionObserver, just show right away, instead of loading polyfills
            this.hasBeenInViewport = true
            return
        }

        if (this.hasBeenInViewport) {
            return
        }

        if (this.$refs.observer) {
            this.observer = new IntersectionObserver(
                entries => {
                    const image = entries[0]
                    if (image.isIntersecting) {
                        this.hasBeenInViewport = true
                        if (this.observer) {
                            this.observer.disconnect()
                        }
                    }
                },
                { rootMargin: '100px' }
            )
            this.observer.observe(this.$refs.observer)
        } else {
            this.hasBeenInViewport = true
        }
    },
    unmounted() {
        if (this.observer) {
            this.observer.disconnect()
        }
    },
    methods: {
        onLoad() {
            if (process.browser && this.srcsetOptions && this.$refs.img) {
                // https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/currentSrc
                const currentSrc = this.$refs.img.currentSrc // the actual src from srcset
                imageCacheService.setImageLoaded(this.src, currentSrc)
                return
            }
            imageCacheService.setImageLoaded(this.src)
        },
    },
}
</script>
