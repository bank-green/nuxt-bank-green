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

<script setup lang="ts">

/**
 * Note: This might have issues displaying when the src file contains spaces! eg "Some file.png" will not work
 */
const props = withDefaults(defineProps<{
    src: string;
    imgClass?: string | string[];
    useImageTag?: boolean;
    width?: string | number;
    height?: string | number;
    srcset?: string;
    skipObserver?: boolean;
    alt?: string;
}>(), {
    useImageTag: false,
    skipObserver: false,
    alt: ''
});

const useTransition = ref(true);
const img = ref<InstanceType<typeof HTMLImageElement>>();
const observer = ref<InstanceType<typeof HTMLSpanElement>>();
const intersectionObserver = ref<IntersectionObserver | null>(null);
const hasBeenInViewport = ref(false);

const srcsetOptions = computed(() => 
    getSrcSet(props.srcset, props.src)
);

const srcsetOptionsWebP = computed(() =>
    getSrcSet(props.srcset, props.src, 'webp')
);
const currentSrc = computed<string>(() => 
    imageCacheService.state.imageLoaded[props.src]
);
const loaded = computed(() => !!currentSrc.value);

const bgStyle = computed(() => ({ backgroundImage: `url(${currentSrc.value})` }));

onMounted(() => {
    if (!('IntersectionObserver' in window)) {
        // no support for IntersectionObserver, just show right away, instead of loading polyfills
        hasBeenInViewport.value = true
        return
    }

    if (hasBeenInViewport.value) {
        return
    }

    if (observer.value) {
        intersectionObserver.value = new IntersectionObserver(
            entries => {
                const image = entries[0]
                if (image.isIntersecting) {
                    hasBeenInViewport.value = true
                    if (intersectionObserver.value) {
                        intersectionObserver.value.disconnect()
                    }
                }
            },
            { rootMargin: '100px' }
        )
        intersectionObserver.value.observe(observer.value)
    } else {
        hasBeenInViewport.value = true
    }
});

onUnmounted(() => {
    if (intersectionObserver.value) {
        intersectionObserver.value.disconnect()
    }
})

function onLoad() {
    if (process.browser && srcsetOptions.value && img.value) {
        // https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/currentSrc
        const currentSrc = img.value.currentSrc // the actual src from srcset
        imageCacheService.setImageLoaded(props.src, currentSrc)
        return
    }
    imageCacheService.setImageLoaded(props.src)
}
</script>
