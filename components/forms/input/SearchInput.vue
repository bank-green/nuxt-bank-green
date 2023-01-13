<template>
    <div aria-haspopup="listbox" class="flex items-center">
        <!-- input form -->
        <input
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            ref="input"
            :placeholder="placeholder"
            type="text"
            class="relative w-full appearance-none border bg-white rounded-2xl shadow-sm pl-12 pr-10 py-4 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-sushi-500 focus:border-sushi-500 sm:text-sm truncate"
            :class="{
                'border-white': !modelValue,
                'border-sushi-100': modelValue,
            }"
            autocomplete="chrome-off"
            @keydown="$emit('onKeyDown')"
            @focus="$emit('onFocus')"
            @blur="$emit('onBlur')"
            @click="$emit('onClick')"
        />

        <!-- icon on the left -->
        <slot name="icon" />

        <div
            v-if="modelValue"
            class="absolute right-0 p-5 text-red-700 hover:text-red-500 cursor-pointer"
            @click="$emit('onCloseClick')"
        >
            <!-- close icon -->
            <svg
                v-if="!usePencil"
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle cx="8" cy="8.5" r="8" fill="currentColor" />
                <path
                    d="M5.17157 5.67157L10.8284 11.3284"
                    stroke="white"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
                <path
                    d="M10.8284 5.67157L5.17156 11.3284"
                    stroke="white"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
            </svg>
            <!-- pencil icon -->
            <svg
                v-else
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle cx="8" cy="8.5" r="8" fill="currentColor" />
                <path
                    d="M5.17157 5.67157L10.8284 11.3284"
                    stroke="white"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
                <path
                    d="M10.8284 5.67157L5.17156 11.3284"
                    stroke="white"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
                <path
                    d="M5.17157 5.67157L10.8284 11.3284"
                    stroke="white"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
                <path
                    d="M10.8284 5.67157L5.17156 11.3284"
                    stroke="white"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
            </svg>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        modelValue: String,
        placeholder: String,
        usePencil: Boolean,
    },
    methods: {
        focus() {
            this.$refs?.input?.focus()
        },
    },
}
</script>
