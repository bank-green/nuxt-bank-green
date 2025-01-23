<template>
  <div class="page">
    <div class="page-fade-in max-w-screen">
      <div class="bg-gradient-to-b from-sushi-50 to-sushi-100 flex flex-col justify-center items-center pt-36 min-h-screen">
        <div class="contain max-w-5xl w-full">
          <h1 class="text-center text-2xl lg:text-3xl font-semibold text-gray-800 font-secondary">
            {{ onepager?.data.title || 'Thank you for your interest in our work.' }}
          </h1>
          <h2 v-if="onepager?.data.description"
              class="mt-1 lg:mt-2 text-center text-xl lg:text-2xl font-normal text-gray-800 font-secondary"
              v-html="asHTML(onepager?.data.description)" />
          <div class="flex flex-col sm:flex-row gap-6 md:gap-24 mt-4 lg:mt-8 mx-auto max-w-3xl w-full">
            <a
              v-if="onepager?.data.url_1"
              :href="asLink(onepager?.data.url_1)!"
              class="button-green w-full flex justify-center items-center text-lg lg:text-xl text-primary-dark drop-shadow-lg"
              rel="noopener"
              target="_blank"
            >
              Download <br>
              {{ onepager?.data.button_1 || 'One Pager' }}
            </a>

            <a
              v-if="onepager?.data.url_2"
              :href="asLink(onepager?.data.url_2)!"
              class="button-green w-full flex justify-center items-center text-lg lg:text-xl text-primary-dark drop-shadow-lg"
              rel="noopener"
              target="_blank"
            >
              Download <br>
              {{ onepager?.data.button_2 || 'Organisational Deck' }}
            </a>
          </div>
          <PrismicImage
            v-if="onepager?.data.image"
            :field="onepager?.data.image"
            class="mx-auto w-[360px] max-w-[100%]"
            :alt="onepager?.data.image.alt"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { asLink, asHTML } from '@prismicio/helpers'

const { client } = usePrismic()
const { data: onepager } = await useAsyncData('onepager', () =>
  client.getSingle('onepagerpage'),
)

try {
  if (onepager?.value) {
    usePrismicSEO(onepager.value.data)
  }
} catch (e) {
  console.error(e)
  throw (e)
}
</script>
