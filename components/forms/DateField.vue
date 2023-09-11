<template>
  <BaseField
    :title="title"
    :description="description"
    :name="name"
    :show-warning="warning"
    :dark="dark"
  >
    <input
      :id="name"
      ref="input"
      :name="name"
      type="date"
      class="inline-flex appearance-none w-full text-sm leading-5 border-gray-50 rounded-2xl focus:border-sushi-300 focus:ring focus:ring-sushi-200 focus:ring-opacity-50 bg-white shadow-soft"
      :class="[inputClasses, inputIsEmptyClass]"
      :value="modelValue"
      :step="step"
      :aria-invalid="!!warning"
      :required="required"
      :disabled="disabled"
      placeholder="dd/mm/yyyy"
      @input="onUpdate"
    />
  </BaseField>
</template>

<script setup lang="ts">
import BaseField from "./BaseField.vue";

const props = withDefaults(
  defineProps<{
    modelValue: string | null;
    title?: string;
    description?: string;
    name: string;
    rows?: string | number;
    required?: boolean;
    disabled?: boolean;
    warning?: boolean | string;
    dark?: boolean;
    placeholder?: string;
    currencyLabel?: string;
    typeLabel?: string;
    step?: string;
  }>(),
  {},
);

const emit = defineEmits(["update:modelValue"]);

const inputRef = ref<InstanceType<typeof HTMLInputElement> | null>(null);

const focus = () => {
  inputRef.value?.focus();
};

const inputClasses = computed(() => {
  if (props.disabled) {
    return "bg-gray-100 border-gray-200 text-gray-500 placeholder-gray-300";
  }
  if (props.warning) {
    return "pl-5 pr-10 py-4 border-red-300 text-red-900 placeholder-red-800 focus:border-red-300 focus:ring-red";
  }
  if (props.currencyLabel && props.typeLabel) {
    return "pl-7 pr-12";
  }
  return "px-5 py-4 border-gray-50 text-gray-500";
});
const inputIsEmptyClass = computed(() => {
  if (props.modelValue) {
    return "";
  } else {
    return "is-empty";
  }
});

function onUpdate(ev: Event) {
  emit("update:modelValue", (ev.target as HTMLInputElement).value);
}
</script>

<style>
@media (max-width: 600px) {
  .is-empty::before {
    content: attr(placeholder);
  }
}
</style>
