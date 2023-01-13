<template>
    <RenderWhenVisibleInViewPort :placeholderWidth="placeholderWidth" :placeholderHeight="placeholderHeight"
        :options="{ rootMargin: '500px' }">
        <LottieFile :path="path" />
    </RenderWhenVisibleInViewPort>
</template>

<script setup>
import RenderWhenVisibleInViewPort from './func/RenderWhenVisibleInViewPort.client.vue'

const props = defineProps({
    placeholderWidth: Number,
    placeholderHeight: Number,
    path: String,
})

</script>
