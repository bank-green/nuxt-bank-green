<script setup lang="ts">
import BaseField from './BaseField.vue'

const props = withDefaults(
  defineProps<{
    modelValue: string | number | null
    title?: string
    description?: string
    name?: string
    placeholder?: string
    currencyLabel?: string
    typeLabel?: string
    type?: string
    step?: string
    autocomplete?: string | undefined
    rows?: string | number
    required?: boolean
    disabled?: boolean
    warning?: string | boolean
    dark?: boolean
    infoTooltip?: string
    borderColor?: string
  }>(),
  {
    title: '',
    description: '',
    name: '',
    placeholder: '',
    currencyLabel: '',
    typeLabel: '',
    type: 'text',
    step: '',
    rows: '',
    required: false,
    disabled: false,
    warning: false,
    dark: false,
    infoTooltip: '',
    borderColor: 'border-gray-50',
  },
)

const emit = defineEmits(['update:modelValue'])

const inputClasses = computed(() => {
  if (props.disabled) {
    return 'bg-gray-100 border-gray-200 text-gray-700 placeholder-gray-400'
  }
  if (props.warning) {
    return 'pl-5 pr-10 py-4 border-red-300 text-red-900 placeholder-red-800 focus:border-red-300 focus:ring-red'
  }
  if (props.currencyLabel && props.typeLabel) {
    return 'pl-7 pr-12'
  }
  return `px-5 py-4 ${props.borderColor} text-gray-900 placeholder-cool-gray-800`
})

const onInput = ($event: Event) => {
  emit('update:modelValue', ($event.target as HTMLInputElement).value)
}
</script>

<template>
  <BaseField
    :title="title"
    :description="description"
    :name="name"
    :show-warning="warning"
    :currency-label="currencyLabel"
    :type-label="typeLabel"
    :dark="dark"
    :info-tooltip="infoTooltip"
  >
    <textarea
      v-if="rows"
      :id="name"
      ref="input"
      :rows="rows"
      :name="name"
      class="block appearance-none w-full text-sm leading-5 border rounded-2xl focus:border-sushi-300 focus:ring focus:ring-sushi-200 focus:ring-opacity-50 bg-white shadow-soft"
      :class="inputClasses"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      :value="modelValue || ''"
      :aria-invalid="!!warning"
      :required="required"
      :disabled="disabled"
      @input="onInput"
    />
    <input
      v-else
      :id="name"
      ref="input"
      :name="name"
      class="block appearance-none w-full text-sm leading-5 border rounded-2xl focus:border-sushi-300 focus:ring focus:ring-sushi-200 focus:ring-opacity-50 bg-white shadow-soft"
      :class="inputClasses"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      :type="type"
      :value="modelValue || ''"
      :step="step"
      :aria-invalid="!!warning"
      :required="required"
      :disabled="disabled"
      @input="onInput"
    >
  </BaseField>
</template>
