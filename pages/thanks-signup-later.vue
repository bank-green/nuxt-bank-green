<template>
  <div class="page">
    <div class="bg-white">
      <div class="page-fade-in pt-28">
        <ThanksSection
          :title="$prismic.asText(signuplater.data.thanksignuplater)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
useHeadHelper('Thank you')
const p = usePrismic()
const { data: signuplater } = await useAsyncData('signuplater', () =>
  p.client.getSingle('thankyousignuplater')
)
</script>
