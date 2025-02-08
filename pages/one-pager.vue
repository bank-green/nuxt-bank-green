<template>
  <div class="page">
    <div class="page-fade-in max-w-screen">
      <div class="bg-gradient-to-b from-sushi-50 to-pistachio-green flex flex-col justify-center items-center pt-32 pb-12 lg:pb-32 min-h-screen">
        <div class="contain max-w-5xl w-full">
          <h1 class="text-center text-2xl font-semibold text-gray-800 sm:text-5xl">
            {{ onepager?.data.title || 'Thank you for your interest in our work.' }}
          </h1>
          <div class="flex flex-col md:flex-row gap-6 lg:gap-24 mt-8 lg:mt-20 w-full">
            <a
              v-if="onepager?.data.url_1"
              :href="asLink(onepager?.data.url_1)!"
              class="button-green w-full flex justify-center items-center text-xl lg:text-2xl text-primary-dark"
              rel="noopener"
              target="_blank"
            >
              Download <br>
              {{ onepager?.data.button_1 || 'One Pager' }}
            </a>

            <a
              v-if="onepager?.data.url_2"
              :href="asLink(onepager?.data.url_2)!"
              class="button-green w-full flex justify-center items-center text-xl lg:text-2xl text-primary-dark"
              rel="noopener"
              target="_blank"
            >
              Download <br>
              {{ onepager?.data.button_2 || 'Organisational Deck' }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { asLink } from '@prismicio/helpers'

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
