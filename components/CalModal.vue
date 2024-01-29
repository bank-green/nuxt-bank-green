<template>
  <ModalWithBackdrop v-model="showModal">
    <!-- Within this div the cal.com embed will be placed - it requires an embed code on the page -->
    <div
      id="gpe-demo"
      class="w-full h-full overflow-y-auto p-4 md:p-6 mb-2 md:mb-6 mt-6"
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
