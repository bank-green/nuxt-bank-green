<template>
  <div class="page">
    <div class="page-fade-in max-w-screen">
      <div class="bg-gradient-to-b from-sushi-50 to-sushi-100 flex flex-col justify-center items-center pt-36 min-h-screen">
        <div class="contain max-w-5xl w-full">
          <h1 class="text-center text-2xl lg:text-3xl font-semibold text-gray-800">
            {{ onepagersimple?.data.title || 'Unlock the Power of Green Banking for Your Business' }}
          </h1>
          <h2 v-if="onepagersimple?.data.description"
              class="mt-1 lg:mt-2 text-center text-lg lg:text-xl font-normal text-gray-700"
              v-html="asHTML(onepagersimple?.data.description)" />
          <div class="flex flex-row justify-center mt-4 lg:mt-8 w-full">
            <a
              v-if="onepagersimple?.data.url_1"
              :href="asLink(onepagersimple?.data.url_1)!"
              class="button-green max-w-xs text-lg lg:text-xl text-primary-dark drop-shadow-lg"
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
            class="mx-auto w-[360px] max-w-[100%]"
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
