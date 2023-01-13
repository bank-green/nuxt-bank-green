<template>
    <BaseField
        :title="title"
        :description="description"
        :name="name"
        :show-warning="warning"
        :right-label="rightLabel"
        :currency-label="currencyLabel"
        :type-label="typeLabel"
        :dark="dark"
    >
        <textarea
            v-if="rows"
            :id="name"
            ref="input"
            :rows="rows"
            :name="name"
            class="block appearance-none w-full text-sm leading-5 border-gray-50 rounded-2xl focus:border-sushi-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 bg-white shadow-soft"
            :class="inputClasses"
            :placeholder="placeholder"
            :autocomplete="autocomplete"
            :value="modelValue"
            :aria-invalid="!!warning"
            :required="required"
            :disabled="disabled"
            @input="$emit('update:modelValue', $event.target.value)"
        />
        <input
            v-else
            :id="name"
            ref="input"
            :name="name"
            class="block appearance-none w-full text-sm leading-5 border-gray-50 rounded-2xl focus:border-sushi-300 focus:ring focus:ring-sushi-200 focus:ring-opacity-50 bg-white shadow-soft"
            :class="inputClasses"
            :placeholder="placeholder"
            :autocomplete="autocomplete"
            :type="type"
            :value="modelValue"
            :step="step"
            :aria-invalid="!!warning"
            :required="required"
            :disabled="disabled"
            @input="$emit('update:modelValue', $event.target.value)"
        />
    </BaseField>
</template>

<script>
import BaseField from './BaseField.vue'

export default {
    components: {
        BaseField,
    },
    props: {
        modelValue: [Number, String],
        title: String,
        description: String,
        name: { type: String, required: true },
        placeholder: String,
        rightLabel: [Object, String],
        currencyLabel: String,
        typeLabel: String,
        type: { type: String, default: 'text' },
        step: String,
        autocomplete: String,
        rows: [Number, String],
        required: Boolean,
        disabled: Boolean,
        warning: [String, Boolean],
        dark: Boolean,
    },
    computed: {
        inputClasses() {
            if (this.disabled) {
                return 'bg-gray-100 border-gray-200 text-gray-500 placeholder-gray-300'
            }
            if (this.warning) {
                return 'pl-5 pr-10 py-4 border-red-300 text-red-900 placeholder-red-800 focus:border-red-300 focus:ring-red'
            }
            if (this.currencyLabel && this.typeLabel) {
                return 'pl-7 pr-12'
            }
            return 'px-5 py-4 border-gray-50 text-gray-900 placeholder-cool-gray-800'
        },
    },
    methods: {
        focus() {
            if (this.$refs.input) {
                this.$refs.input.focus()
            }
        },
    },
}
</script>
