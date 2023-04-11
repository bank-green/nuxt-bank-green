<template>
    <div
        class="w-full flex items-center justify-center bg-primary-dark rounded-2xl px-6 lg:px-10 py-8 text-gray-50 text-center">

        <p class="text-xl md:text-2xl mb-6 font-semibold whitespace-pre-wrap">
            {{ title }}
        </p>
    </div>
</template>

<script setup>
const props = defineProps({
    title: String,
})
</script>
