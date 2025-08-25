<script setup lang="ts">
import getLinks from './links'
import SocialLinks from '@/components/nav/SocialLinks.vue'

const linksGroup = groupBy(getLinks({ isHeader: false }), i =>
  Math.floor(i.footerOrder ?? 0)
)
</script>

<template>
  <nav class="contain sm:py-8 py-14 lg:py-16 bg-white">
    <div
      class="lg:flex items-center lg:items-start justify-between sm:gap-12 gap-10 grid"
    >
      <NuxtLink to="/">
        <img
          class="h-6 lg:my-2"
          src="/img/trim-hor-light.svg"
          alt="Bank.Green"
        />
      </NuxtLink>
      <div
        class="text-gray-700 font-semibold grid lg:grid-cols-3 grid-cols-1 items-start gap-10"
      >
        <div
          v-for="(items, index) in linksGroup"
          :key="index"
          class="grid gap-[10px]"
        >
          <NuxtLink
            v-for="link in items"
            :key="link.href"
            :to="link.href"
            class="hover:text-sushi-500"
          >
            <span class="xl:hidden">{{ link.short_title || link.title }}</span>
            <span class="hidden xl:inline">{{ link.title }}</span>
          </NuxtLink>
        </div>
      </div>

      <SocialLinks class="lg:ml-4 lg:flex-nowrap" />
    </div>
  </nav>
  <div class="bg-gray-100 sm:bg-white py-4">
    <div
      class="contain sm:text-gray-500 text-gray-700 text-xs sm:flex items-center justify-between grid gap-4 pr-10"
    >
      <div>Bank.Green is a project of Empowerment Works Inc. 501(c)(3)</div>
      <div class="grid sm:flex gap-4">
        <NuxtLink
          to="/disclaimer"
          class="hover:underline"
          active-class="text-gray-900"
        >
          Disclaimer
        </NuxtLink>
        <NuxtLink
          to="/privacy"
          class="hover:underline"
          active-class="text-gray-900"
        >
          Privacy policy
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
