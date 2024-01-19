<template>
  <ModalWithBackdrop v-model="showModal">
    <div
      id="gpe-demo"
      class="w-full h-full overflow-y-auto p-6 mb-6 mt-6"
    />
  </ModalWithBackdrop>
</template>
<script setup lang="ts">

const props = defineProps<{
  modelValue: boolean;
}>()

const emit = defineEmits([
  'update:modelValue'

])
const showModal = computed({
  get: () => props.modelValue,
  set: val => emit('update:modelValue', val)
})
</script>
