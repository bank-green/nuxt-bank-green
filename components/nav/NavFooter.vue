<template>
  <nav class="contain py-8 lg:py-0">
    <div class="lg:flex items-center lg:items-start justify-between lg:py-8">
      <NuxtLink to="/">
        <img
          class="h-6 my-4 lg:my-2"
          src="/img/trim-hor-light.svg"
          alt="Bank.Green"
        />
      </NuxtLink>
      <div
        class="border-t lg:border-none border-gray-200 py-8 lg:py-0 lg:px-16 xl:px-32 text-gray-700 font-semibold flex lg:items-center lg:flex-wrap justify-center flex-col lg:flex-row -mx-4"
      >
        <NuxtLink
          v-for="link in computedLinks"
          :key="link.href"
          :to="link.href"
          class="p-4 hover:text-sushi-500 text-xl lg:text-base lg:p-3 lg:py-1"
        >
          <span class="xl:hidden">{{ link.short_title || link.title }}</span>
          <span class="hidden xl:inline">{{ link.title }}</span>
        </NuxtLink>
      </div>

      <SocialLinks class="lg:ml-4 lg:flex-nowrap" />
    </div>
  </nav>
  <div class="bg-gray-100 py-4">
    <div
      class="contain text-gray-500 text-xs flex items-center justify-between"
    >
      <div>Bank.Green is a project of Empowerment Works Inc. 501(c)(3)</div>
      <div class="space-x-4">
        <NuxtLink
          to="/disclaimer"
          class="hover:underline"
          activeClass="text-gray-900"
          >Disclaimer
        </NuxtLink>
        <NuxtLink
          to="/privacy"
          class="hover:underline"
          activeClass="text-gray-900"
        >
          Privacy policy
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import links from "./links";
import SocialLinks from "@/components/nav/SocialLinks.vue";

const computedLinks = computed(() => links({ isHeader: false }));
</script>
