<template>
    <div class="relative">
        <div class="flex items-start">
            <input
                :id="name"
                :name="name"
                :checked="modelValue"
                @input="onUpdate"
                type="checkbox"
                class="mt-0.5 h-4 w-4 text-sushi-600 focus:ring-sushi-500 border-gray-300 rounded appearance-none"
            />
            <label :for="name" class="ml-4 block text-sm" :class="labelClasses">
                <slot />
            </label>
        </div>
        <div
            v-if="warning"
            class="absolute top-full left-0 text-red-500 text-xs ml-8"
        >
            {{ warning }}
        </div>
    </div>
</template>

<script>
export default {
    props: {
        modelValue: Boolean,
        name: String,
        warning: String,
        dark: Boolean,
    },
    computed: {
        labelClasses() {
            if (this.dark) {
                return 'text-gray-200'
            }
            return 'text-gray-800'
        },
    },
    methods: {
        onUpdate(ev) {
            this.$emit('update:modelValue', ev.target.checked)
        },
    },
}
</script>
