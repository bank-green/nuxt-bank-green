<template>
  <NuxtLink
    class="bg-white rounded-xl shadow-soft border hover:bg-gray-50 transition duration-150 ease-in-out hover:border-sushi-500 overflow-hidden"
    :to="to"
  >
    <div
      v-if="image"
      class="relative w-full minimal h-52 sm:h-64"
    >
      <NuxtImg
        :src="image"
        class="w-full h-full object-cover"
        loading="lazy"
      />
    </div>
    <div class="p-4">
      <p class="text-sm text-gray-500">
        <time>{{ date }}</time>
      </p>
      <span class="mt-2 block">
        <p class="text-xl font-semibold text-gray-900">
          {{ title }}
        </p>
        <p class="mt-3 text-base text-gray-500">
          {{ description }}
        </p>
      </span>
      <div class="mt-3">
        <span
          class="text-base font-semibold text-sushi-600 hover:text-sushi-500"
        >
          Read full story
        </span>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup>
defineProps({
  date: String,
  title: String,
  description: String,
  image: String,
  to: String,
})
</script>
