<template>
  <div class="page">
    <div class="bg-sushi-50">
      <div class="page-fade-in contain max-w-4xl xl:max-w-5xl pt-28 pb-16">
        <article
          class="prose sm:prose-lg xl:prose-xl mx-auto max-w-4xl xl:max-w-5xl"
        >
          <SliceZone
              v-if="cookies?.data.slices"
              :slices="cookies?.data.slices ?? []"
              :components="sliceComps"
          />
          <h3 v-else class="flex justify-center">
            Error loading content.
          </h3>
          <Script id="CookieDeclaration" src="https://consent.cookiebot.com/6d3d0d12-cdf0-41be-804b-8ec7e804701c/cd.js" type="text/javascript" async />
        </article>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineSliceZoneComponents } from '@prismicio/vue'
import { components } from '~~/slices'

const sliceComps = ref(defineSliceZoneComponents(components))

const { client } = usePrismic()
const { data: cookies } = await useAsyncData('cookies', () =>
    client.getSingle('cookiespage', {
      fetchLinks: ['accordionitem.title', 'accordionitem.slices']
    })
)
usePrismicSEO(cookies.value?.data)
</script>
