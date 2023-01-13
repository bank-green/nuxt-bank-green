<template>
    <LazyImage v-if="country && country != -1" :src="`/img/flags/${country.toLowerCase()}.png`"
        imgClass="bg-no-repeat bg-center bg-contain" />
    <span v-else></span>
</template>

<script setup>
const props = defineProps({
    country: String,
})
</script>
