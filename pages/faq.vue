<template>
  <div class="page">
    <div class="bg-gradient-to-b from-sushi-50 to-sushi-100 pt-28">
      <div class="page-fade-in contain max-w-3xl pb-16">
        <PrismicRichText
          v-if="faq?.data.introduction"
          :field="faq?.data.introduction"
          class="prose"
        />
        <div v-else class="prose">
          <h1 class="text-center">
            Frequently asked questions
          </h1>
        </div>
        <div
          class="prose sm:prose-lg xl:prose-xl mx-auto max-w-4xl xl:max-w-5xl mb-10 "
        >
          <transition-group
            enter-active-class="transform-gpu ease-out duration-300 transition"
            enter-from-class="-translate-y-2 opacity-0"
            enter-to-class="translate-y-0 opacity-100"
            leave-active-class="transform-gpu transition ease-in duration-190"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          />
          <SliceZone
            v-if="faq?.data.slices"
            :slices="faq?.data.slices ?? []"
            :components="sliceComps"
          />
          <h3 v-else class="text-center">
            Error Loading Content.
          </h3>
        </div>
      </div>

      <div
        id="contact"
        class="contain max-w-3xl flex flex-row justify-center items-center"
      >
        <SignupBox tag="FAQ bottom" class="w-full mt-8 mb-12" />
      </div>
      <Swoosh />
      <Donation />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineSliceZoneComponents } from '@prismicio/vue'
import SignupBox from '@/components/forms/SignupBox.vue'
import { components } from '~~/slices'

const sliceComps = ref(defineSliceZoneComponents(components))

const { client } = usePrismic()
const { data: faq } = await useAsyncData('faq', () =>
  client.getSingle('faqpage', {
    fetchLinks: ['accordionitem.title', 'accordionitem.slices']
  })
)
usePrismicSEO(faq.value?.data)

</script>
