<template>
  <li>
    <div>
      <h2>{{ departmentName }}</h2>
    </div>
  </li>
</template>

<script setup>
defineProps({
  departmentName: String
})
</script>
