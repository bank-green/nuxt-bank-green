<script setup lang="ts">
withDefaults(
  defineProps<{
    background?: 'light' | 'dark'
  }>(),
  {
    background: 'light',
  },
)

const { client } = usePrismic()
const { data: donationData } = await useAsyncData('donation', () =>
  client.getSingle('donationpage'),
)
</script>

<template>
  <div
    v-if="donationData"
    class="flex flex-col justify-center items-center rounded-xl py-6 md:py-12 px-6 md:px-16"
    :class="background === 'light' ? 'bg-gray-50' : 'bg-pistachio-green'"
  >
    <PrismicText
      :field="donationData.data['title']"
      wrapper="h1"
      class="font-semibold text-xl md:text-3xl tracking-wider"
    />
    <PrismicRichText
      :field="donationData.data['description']"
      class="prose sm:prose-lg xl:prose-xl prose-blurb mt-4"
    />
    <NuxtLink
      to="/donate"
      class="button-green mt-6 md:w-48 flex justify-center text-primary-dark"
    >
      <PrismicText
        wrapper="span"
        :field="donationData.data['donation_button']"
        fallback="Donate Now"
      />
    </NuxtLink>
  </div>
</template>
