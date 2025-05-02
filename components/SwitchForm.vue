<script setup>
import { createWidget } from '@typeform/embed'
import { ref } from 'vue'

const props = defineProps({ opts: Object })

const formContainer = ref(null)
onMounted(() => {
  createWidget('rwxTfN15', { ...props.opts, container: formContainer.value })
})
</script>

<template>
  <div ref="formContainer" />
</template>
