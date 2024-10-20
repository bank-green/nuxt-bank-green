<template>
  <div class="page">
    <section class="bg-gradient-to-b from-sushi-50 to-sushi-100 pt-28 max-w-screen">
      <div class="page-fade-in relative contain pb-20 lg:pt-12 z-10">
        <AccreditationHero
          :title="accred?.data.hero_title"
          :logo="accred?.data.hero_logo"
          :description="accred?.data.hero_description"
          :projects="accred?.data.projects"
        />
      </div>
      <Swoosh />
    </section>
  </div>
</template>

<script setup lang="ts">

const route = useRoute()

const { client } = usePrismic()
const slug = route.params.slug ?? ''
const { data: accred } = await useAsyncData(slug[0], () =>
  client.getByUID('accreditationpage', slug[0])
)

/*
usePrismicSEO(gpe.value?.data) */

</script>
