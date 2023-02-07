<template>
    <div ref="formContainer"></div>
</template>

<script setup>
import { createWidget } from "@typeform/embed"
import { ref } from 'vue'

const props = defineProps({ opts: Object })

const formContainer = ref(null)
onMounted(() => {
    console.log("container", formContainer.value)
    createWidget("rwxTfN15", { ...props.opts, container: formContainer.value })
})
</script>