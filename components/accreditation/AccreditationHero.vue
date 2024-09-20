<template>
  <section class="bg-gradient-to-b from-sushi-50 to-sushi-100 pt-28 max-w-screen">
    <div class="page-fade-in relative contain pb-20 lg:pt-12 z-10">
      <div
        class="relative flex flex-col items-center gap-10 border rounded-2xl w-full max-w-7xl min-h-[504px] px-4 py-10 bg-white text-center"
      >
        <h1 class="text-3xl lg:text-5xl font-semibold text-gray-800">
          <template v-if="title">
            {{ title }}
          </template>
          <template v-else>
            Your money is building a <span class="green-line">greener future</span>
          </template>
        </h1>
        <div class="lg:px-16 text-base lg:text-xl text-gray-700 max-w-4xl">
          <PrismicRichText
            v-if="description"
            class="text-white font-medium"
            :field="description"
          />
          <template v-else>
            <p class="pb-6">
              By choosing to spend your money with this business, you are ensuring your financial support
              contributes
              to a sustainable, liveable future.
            </p>
            <p>
              Wich means your money is supporting projects like:
            </p>
          </template>
        </div>
        <AccreditationProjectCarousel
          class="lg:absolute lg:bottom-0 lg:left-80 lg:translate-y-16"
          :projects="projects"
        />
        <NuxtImg
          class="absolute bottom-0 lg:left-36 w-32 h-32 translate-y-16 lg:translate-y-10"
          :src="heroLogo"
          :provider="heroLogoProvider"
          alt="Accreditation Logo"
        />
      </div>
    </div>
    <Swoosh />
  </section>
</template>

<script lang="ts" setup>
import { asImageSrc } from '@prismicio/helpers'
import type { AccreditationpageDocumentData, AccreditationpageDocumentDataProjectsItem } from 'prismicio-types'

const props = defineProps<{
  title?: AccreditationpageDocumentData['hero_title']
  description?: AccreditationpageDocumentData['hero_description']
  logo?: AccreditationpageDocumentData['hero_logo']
  projects?: AccreditationpageDocumentDataProjectsItem[]
}>()

const heroLogo = asImageSrc(props.logo) ?? '/img/certification/fossil-free-certified.png'
const heroLogoProvider = props.logo ? '' : 'none'
</script>

<style>
.green-line {
  padding-bottom: 20px;
  background-image: url('/img/backgrounds/green-line.svg');
  background-position: 100% 100%;
  background-repeat: no-repeat;
  background-size: 95%;
  word-break: keep-all;
  white-space: nowrap;
}
</style>
