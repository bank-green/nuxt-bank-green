<template>
    <div
        class="w-full flex items-center justify-center bg-primary-dark rounded-2xl px-6 lg:px-10 py-8 text-gray-50 text-center">
        <div class="flex flex-col items-center">
            <p class="text-3xl mb-6 font-semibold whitespace-pre-wrap">
                {{ title }}
            </p>
            <p class="text-lg mb-6 font-semibold whitespace-pre-wrap">
                {{ subtitle }}
            </p>
            <NuxtLink @click="clickSurvey" to="/impact"
                class="px-6 py-3 text-medium no-underline bg-sushi-500 rounded hover:bg-sushi-600">
                Take a Short Survey
            </NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    title: String,
    subtitle: String,
}>();

const emit = defineEmits(['success']);

function clickSurvey() {
    emit('success');
};
</script>
