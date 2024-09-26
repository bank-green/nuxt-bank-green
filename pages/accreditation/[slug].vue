<template>
  <div class="page text-gray-700">
    <AccreditationHero
      :title="accredData?.hero_title"
      :logo="accredData?.hero_logo"
      :description="accredData?.hero_description"
      :projects="accredData?.projects"
    />

    <AccreditationSharing
      :title="accredData?.sharing_title"
      :steps="sharingSteps"
    />

    <AccreditationAbout
      :title="accredData?.about_title"
      :description="accredData?.about_description"
      :logo="accredData?.aboutlogo"
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

const accredData = accred.value?.data

const sharingSteps = {
  step1: {
    title: accredData?.step1_title,
    description: accredData?.step1_description,
    links: {
      fb: accredData?.fb_link,
      ig: accredData?.ig_link,
      x: accredData?.x_link,
    },
  },
  step2: {
    title: accredData?.step2_title,
    description: accredData?.step2_description,
  },
}

/*
usePrismicSEO(gpe.value?.data) */
</script>
