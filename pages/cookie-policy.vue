<template>
  <div class="page">
    <div class="bg-sushi-50">
      <div class="page-fade-in contain max-w-4xl xl:max-w-5xl pt-28 pb-16">
        <article
          class="prose sm:prose-lg xl:prose-xl mx-auto max-w-4xl xl:max-w-5xl"
        >
          <h1> Bank.Green Cookie policy </h1>
          <Script id="CookieDeclaration" src="https://consent.cookiebot.com/6d3d0d12-cdf0-41be-804b-8ec7e804701c/cd.js" type="text/javascript" async />
        </article>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { client } = usePrismic()
const { data: cookie } = await useAsyncData('cookie', () =>
    client.getSingle('cookiepage')
)
usePrismicSEO(cookie.value?.data)
</script>
