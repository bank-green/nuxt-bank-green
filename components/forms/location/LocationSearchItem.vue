<template>
    <div class="flex items-center">
        <div class="w-5 h-4">
            <Flag :country="id" />
        </div>
        <span
            class="ml-3 font-normal block truncate"
            :class="{
                'font-semibold': isSelected,
                'font-normal': !isSelected,
            }"
        >
            {{ title }}
        </span>
    </div>

    <span
        v-if="isSelected"
        class="absolute inset-y-0 right-0 flex items-center pr-4 text-sushi-600"
    >
        <svg
            class="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
        >
            <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
            />
        </svg>
    </span>
</template>

<script setup lang="ts">
import Flag from '../../Flag.vue'

defineProps<{
    id: string;
    title: string;
    isSelected: boolean;
}>();
</script>
