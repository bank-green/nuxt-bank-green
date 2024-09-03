<template>
  <div class="page">
    <section class="bg-gradient-to-b from-sushi-50 to-sushi-100 md:pt-28 max-w-screen ">
      <div class="page-fade-in contain flex flex-col justify-center items-center max-w-8xl pt-28 pb-20 md:pb-0 lg:pt-12 gap-10">
        <h1>{{ accred?.data.hero_title || "Your money is building a greener future" }}</h1>
      </div>
      <Swoosh />
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

/*
usePrismicSEO(gpe.value?.data) */

</script>
