<template>
  <div class="page">
    <section class="bg-gradient-to-b from-sushi-50 to-sushi-100 md:pt-28 max-w-screen">
      <div class="page-fade-in relative contain max-w-8xl pt-28 pb-20 md:pb-0 lg:pt-12 z-10">
        <article class="rounded-2xl w-full max-w-7xl px-1 py-8 bg-white flex flex-col items-center text-center gap-y-10">
          <h1 class="text-3xl lg:text-5xl font-semibold text-gray-800 green-line">
            {{ accred?.data.hero_title || "Your money is building a greener future" }}
          </h1>
          <p class="text-gray-700 max-w-4xl">
            By choosing to spend your money with businesses like [business name], you are ensuring your financial
            support contributes to a sustainable, liveable future.
          </p>
          <p class="text-gray-700 max-w-4xl">
            <span class="font-bold">[Business name]</span> banks with <span class="font-bold">[green bank name]</span> which means your money is supporting projects like:
          </p>
        </article>
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
<style>
.green-line {
  padding-bottom: 20px;
  background-image: url('/img/backgrounds/green-line.svg');
  background-position: 100% 100%;
  background-repeat: no-repeat;
  background-size: 35%;
}
</style>
