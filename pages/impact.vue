<template>
  <div class="page">
    <div class="bg-sushi-50">
      <div class="page-fade-in contain pt-28 pb-16">
        <div
          class="prose mx-auto max-w-4xl text-center prose-headings:font-semibold"
        >
          <h1>
            <PrismicRichText :field="impact?.data.text1" />
          </h1>
          <h2 class="mt-0">
            <PrismicRichText :field="impact?.data.text2" />
          </h2>
          <PrismicRichText :field="impact?.data.text3" />
          <SwitchForm :opts="{ height: 600 }" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { client } = usePrismic()
const { data: impact } = await useAsyncData('impact', () =>
  client.getByUID('textonlypages', 'impactpage'))
</script>
