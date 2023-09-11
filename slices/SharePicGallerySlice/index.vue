<template>
  <div class="w-full flex flex-row flex-wrap">
    <div class="sm:w-1/2 md:w-1/3">
      <img
        class="w-full p-2 mt-0"
        src="/img/social/social-image-1.jpg"
        alt=""
      />
    </div>
    <div class="sm:w-1/2 md:w-1/3">
      <img
        class="w-full p-2 mt-0"
        src="/img/social/social-image-2.jpg"
        alt=""
      />
    </div>
    <div class="sm:w-1/2 md:w-1/3">
      <img
        class="w-full p-2 mt-0"
        src="/img/social/social-image-3.jpg"
        alt=""
      />
    </div>
    <div class="sm:w-1/2 md:w-1/3">
      <img
        class="w-full p-2 mt-0"
        src="/img/social/social-image-4.jpg"
        alt=""
      />
    </div>
    <div class="sm:w-1/2 md:w-1/3">
      <img
        class="w-full p-2 mt-0"
        src="/img/social/social-image-5.jpg"
        alt=""
      />
    </div>
    <div class="sm:w-1/2 md:w-1/3">
      <img
        class="w-full p-2 mt-0"
        src="/img/social/social-image-6.jpg"
        alt=""
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { getSliceComponentProps } from "@prismicio/vue";

defineProps(getSliceComponentProps(["slice", "index", "slices", "context"]));
</script>

<style scoped></style>
