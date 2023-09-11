<template>
  <li>
    <div class="sm:flex">
      <div class="w-32 h-32 shadow-lg rounded-full overflow-hidden bg-gray-900">
        <NuxtImg
          :src="img"
          width="128"
          height="128"
          provider="none"
          class="object-center object-cover"
          loading="lazy"
        />
      </div>
      <div class="flex-1 mt-4 sm:mt-0 sm:ml-8">
        <div class="text-lg leading-6 font-medium space-y-1 mb-4">
          <a v-if="href" ref="noopener" :href="href" target="_blank">{{
            name
          }}</a>
          <h3 v-else>
            {{ name }}
          </h3>
        </div>
        <div class="text-lg">
          <p class="text-gray-500">
            {{ description }}
          </p>
        </div>
      </div>
    </div>
  </li>
</template>

<script setup>
const props = defineProps({
  name: String,
  href: String,
  img: String,
  description: String
})
</script>
