<template>
  <div class="page">
    <div class="bg-white">
      <div class="page-fade-in pt-28">
        <h1>{{ gpe.data.seo_title }}</h1>
      </div>
    </div>
  </div>
</template>

<script>
const { data: gpe } = await useAsyncData('gpe', () =>
  client.getsingle('greenpolicyevaluatorpage'))
</script>
