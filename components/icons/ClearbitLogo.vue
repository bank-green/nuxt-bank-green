<template>
    <img :src="src" :width="size" :height="size" :class="imgClass" @error="handleError" :style="clearbitStyle" />
    <img src="/img/icons/bank-icon.svg" :width="size" :height="size" :class="imgClass" :style="fallbackStyle" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const clearbitStyle = ref("visibility: visible")
const fallbackStyle = ref("visibility: hidden")

function handleError() {
    clearbitStyle.value = "visibility: hidden"
    fallbackStyle.value = "visibility: visibl"
} 

const props = withDefaults(defineProps<{
    url: string;
    imgClass: string;
    size?: number;
}>(), {
    size: 60,
    src: "doesnotexist" // added to trigger handleError, not ideal, but it works
});

const urlDomain = computed(() => {
    let url = props.url
    if (url) {
        if (url.indexOf('http') === -1) url = `https://${url}`
        if (url.indexOf('.') > -1) {
            return new URL(url).hostname
        }
    }
    return ''
});

const src = computed(() => {
    if (urlDomain.value) {
        switch (urlDomain.value) {
            case 'monzo.com':
                return '/img/logos/monzo.png'
            case 'www.jpmorganchase.com':
                return '/img/logos/chase.png'
            case 'www.db.com':
                return '/img/logos/db.png'
            case 'www.helios.do':
                return '/img/logos/helios.png'
            case 'www.flowe.com':
                return '/img/logos/flowe.png'
            case 'www.bigpathcapital.com':
                return '/img/logos/bigpath.png'
            case 'www.amalgamatedbank.com':
                return '/img/logos/amalgamated.png'
            case 'green-got.com':
                return '/img/logos/green_got.png'
        }

        return `https://logo.clearbit.com/${urlDomain.value}?size=${props.size * 2}`
    }
    return ''
});
</script>
