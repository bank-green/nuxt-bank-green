<template>
    <LazyImage v-if="country && country != -1" :src="`/img/flags/${country.toLowerCase()}.png`"
        imgClass="bg-no-repeat bg-center bg-contain" />
    <span v-else></span>
</template>

<script setup>
import LazyImage from '@/components/LazyImage.vue'
const props = defineProps({
    country: String,
})
</script>
