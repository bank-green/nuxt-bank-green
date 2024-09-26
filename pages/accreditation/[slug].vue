<template>
  <div class="page">
    <AccreditationHero
      :title="accred?.data.hero_title"
      :logo="accred?.data.hero_logo"
      :description="accred?.data.hero_description"
      :projects="accred?.data.projects"
    />

    <section>
      <!-- Sharing section -->
    </section>

    <AccreditationAbout
      :title="accred?.data.about_title"
      :description="accred?.data.about_description"
      :logo="accred?.data.aboutlogo"
    />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

const { client } = usePrismic()
const slug = route.params.slug ?? ''
const { data: accred } = await useAsyncData(slug[0], () =>
  client.getByUID('accreditationpage', slug[0]),
)

/*
usePrismicSEO(gpe.value?.data) */
</script>
