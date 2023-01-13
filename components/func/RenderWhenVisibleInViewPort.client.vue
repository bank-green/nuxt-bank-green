<template>
    <transition enter-active-class="transition transform-gpu duration-200 ease-out"
        enter-from-class="opacity-0 scale-95" enter-to-class="opacity-100 scale-100"
        leave-active-class="transition transform-gpu duration-100 ease-in" leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95" appear>
        <div :style="styles" ref="observer">
            <slot v-if="hasBeenInViewport" />
        </div>
    </transition>
</template>

<script>
/**
 * Mounts the slot when it is visible in viewport
 * Renders some whitespace with a placeholder width/height if not visibile
 */
export default {
    props: {
        placeholderWidth: Number,
        placeholderHeight: Number,
        options: {
            type: Object, // {root: HTMLElement, rootMargin: string, threshold: number | number[]}
            default: function () {
                return {}
            },
        },
    },
    data() {
        return {
            observer: null,
            hasBeenInViewport: false,
        }
    },
    computed: {
        styles() {
            if (this.hasBeenInViewport) {
                return
            }

            return {
                width: this.placeholderWidth,
                height: this.placeholderHeight,
                opacity: 0,
            }
        },
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
            this.observer = new window.IntersectionObserver(
                (entries) => {
                    const image = entries[0]
                    if (image.intersectionRatio > 0) {
                        this.hasBeenInViewport = true
                        if (this.observer) {
                            this.observer.disconnect()
                        }
                    }
                },
                {
                    root: null,
                    rootMargin: '0px 0px 0px 0px',
                    threshold: 0,
                    ...this.options,
                }
            )

            this.observer.observe(this.$el)
        } else {
            this.hasBeenInViewport = true
        }
    },
    unmounted() {
        if (this.observer) {
            this.observer.disconnect()
        }
    },
}
</script>
