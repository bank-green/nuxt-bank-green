<template>
    <div class="relative">
        <div
            v-if="title || rightLabel"
            class="flex items-center justify-between mb-2"
        >
            <label
                :for="name"
                class="block text-sm leading-5"
                :class="labelClasses"
                >{{ title }}</label
            >
            <div
                v-if="rightLabel"
                class="text-xs text-gray-500"
                :class="rightLabel.className"
                @click="rightLabel.onClick"
            >
                {{ rightLabel.title || rightLabel }}
            </div>
        </div>
        <div class="relative rounded-md shadow-sm">
            <div
                v-if="currencyLabel"
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
            >
                <span class="text-gray-700 sm:text-sm sm:leading-5">
                    {{ currencyLabel }}
                </span>
            </div>

            <slot />

            <div
                v-if="showWarning"
                class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
            >
                <svg
                    class="h-5 w-5 text-red-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path
                        fill-rule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clip-rule="evenodd"
                    />
                </svg>
            </div>
            <div
                v-else-if="typeLabel"
                class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
            >
                <span
                    :id="`${name}-currency`"
                    class="text-gray-500 sm:text-sm sm:leading-5"
                >
                    {{ typeLabel }}
                </span>
            </div>
        </div>
        <div v-if="description" class="mt-2 text-xs text-gray-600">
            {{ description }}
        </div>
        <div
            v-if="showWarning"
            class="absolute top-full left-5 mt-0.5 text-xs text-red-600"
        >
            {{ showWarning }}
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    title?: string;
    description?: string;
    name: string;
    showWarning?: string | boolean;
    typeLabel?: string;
    currencyLabel?: string;
    rightLabel?: string | object;
    dark?: boolean;
}>();

const labelClasses = computed(() => {
    if (props.dark) {
        return 'text-blue-100 text-opacity-75 font-medium'
    }
    return 'text-gray-600 font-semibold'
});
</script>
