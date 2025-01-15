<template>
  <div class="page">
    <div class="page-fade-in max-w-screen">
      <div class="bg-gradient-to-b from-sushi-50 to-sushi-100 flex flex-col justify-center items-center pt-32 pb-12 lg:pb-32 min-h-screen">
        <div class="contain max-w-5xl w-full">
          <h1 class="text-center text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-800">
            {{ onepagersimple?.data.title || 'Thank you for your interest in our work.' }}
          </h1>
          <h2 v-if="onepagersimple?.data.description"
              class="text-center text-2xl lg:text-3xl font-normal text-gray-700 mt-4 lg:mt-8"
              v-html="asHTML(onepagersimple?.data.description)" />
          <div class="flex flex-row justify-center gap-6 lg:gap-24 mt-8 lg:mt-12 w-full">
            <a
              v-if="onepagersimple?.data.url_1"
              :href="asLink(onepagersimple?.data.url_1)!"
              class="button-green max-w-md text-xl lg:text-2xl text-primary-dark drop-shadow-lg"
              rel="noopener"
              target="_blank"
            >
              Download <br>
              {{ onepagersimple?.data.button_1 || 'Green Banking Guide' }}
            </a>
          </div>
          <PrismicImage
            v-if="onepagersimple?.data.image"
            :field="onepagersimple?.data.image"
            class="mx-auto mt-2 lg:mt-6 w-[360px] h-[360px]"
            :alt="onepagersimple?.data.image.alt"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { asLink, asHTML } from '@prismicio/helpers'

const { client } = usePrismic()
const { data: onepagersimple } = await useAsyncData('onepagersimple', () =>
  client.getSingle('onepagersimplepage'),
)

try {
  if (onepagersimple?.value) {
    usePrismicSEO(onepagersimple.value.data)
  }
} catch (e) {
  console.error(e)
  throw (e)
}
</script>
