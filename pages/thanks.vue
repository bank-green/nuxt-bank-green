<template>
  <div class="page">
    <div class="bg-white">
      <div class="page-fade-in pt-28">
        <ThanksSection
          :title="$prismic.asText(thanks.data.title)"
          :description="$prismic.asText(thanks.data.description)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
useHeadHelper('Thank you')
const p = usePrismic()
const { data: thanks } = await useAsyncData('thanks', () => p.client.getSingle('thankspage'))
</script>
