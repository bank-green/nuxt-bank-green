<template>
  <div class="page">
    <section class="bg-gradient-to-b from-sushi-50 to-sushi-100 md:pt-28 max-w-screen ">
      <div class="page-fade-in contain flex flex-col justify-center items-center max-w-8xl pt-28 pb-20 md:pb-0 lg:pt-12 gap-10">
        <h1>{{ accredData?.hero_title || "Your money is building a greener future" }}</h1>
      </div>
      <Swoosh />
    </section>
    <section class="page-fade-in contain items-center max-w-6xl py-16 lg:pt-28 lg:pb-20 flex flex-col gap-10 font-semibold">
      <h2 class="w-full text-xl md:text-4xl text-primary-dark text-center font-bold">
        {{ accredData?.sharing_title || "With just a few clicks, you can do so much more..." }}
      </h2>
      <div class="bg-sky-100 px-16 py-10 rounded-3xl grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="flex flex-col gap-6">
          <h3 class="w-full text-xl md:text-3xl text-primary-dark font-bold">
            {{ accredData?.step1_title || "Share the message" }}
          </h3>
          <PrismicRichText
            :field="accredData?.step1_description"
            class="text-md font-normal"
            fallback="Spreading the word about green banking is crucial to help raise awareness about the importance of sustainable financial practices and let business owners know you appreciate their commitment to a greener future. Every share contributes to a larger movement for positive change."
          />
        </div>
        <div class="flex flex-col gap-4">
          <div class="flex flex-row gap-2" />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
/* import { asImageSrc } from '@prismicio/helpers'
import { defineSliceZoneComponents } from '@prismicio/vue'
import { components } from '~~/slices' */

const route = useRoute()
/* const error = ref(false) */

const { client } = usePrismic()
const slug = route.params.slug ?? ''
const { data: accred } = await useAsyncData(slug[0], () =>
  client.getByUID('accreditationpage', slug[0])
)

const accredData = accred.value?.data

/*
usePrismicSEO(gpe.value?.data) */

</script>
