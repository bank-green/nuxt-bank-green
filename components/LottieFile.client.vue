<template>
    <div ref="container"></div>
</template>

<script setup>
const props = defineProps({
    path: String,
})
const path = toRef(props, 'path')
const { container } = useLottieLooper({ path })


</script>
