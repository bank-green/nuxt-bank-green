<template>
  <div class="page">
    <div class="bg-sushi-50">
      <div class="page-fade-in contain pt-28 pb-16">
        <div
          class="prose mx-auto max-w-4xl text-center prose-headings:font-semibold"
        >
          <h1><PrismicRichText :field="donatecancelled.data.text1" /></h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { client } = usePrismic()
const { data: donatecancelled } = await useAsyncData('donatecancelled', () =>
  client.getByUID('textonlypages', 'donatecancelled'))
</script>
