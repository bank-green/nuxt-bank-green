<template>
  <div class="page">
    <div class="page-fade-in max-w-screen">
      <div class="bg-gradient-to-b from-sushi-50 to-sushi-100 pt-28">
        <div
          class="contain flex flex-col justify-center items-center md:pb-20 pb-10 mb-4"
        >
          <h1
            class="max-w-3xl text-2xl font-semibold whitespace-pre-line mb-2 text-center"
          >
            {{ embrace?.data.title || 'Encourage Real Policy Implementation!' }}
          </h1>
          <h3
            class="max-w-3xl text-2lg font-semibold whitespace-pre-line mb-6 text-center"
          >
            {{ embrace?.data.subtitle || 'Together for sustainability' }}
          </h3>
          <PrismicRichText
            class="prose md:text-lg whitespace-pre-wrap mb-10"
            :field="embrace?.data.description1"
            fallback="Share your concerns and suggestions in the form below.

(Please note that some resources were not reachable and this is a simplified version of this page.)"
          />
          <div class="max-w-6xl flex flex-col-reverse lg:flex-row items-center">
            <div ref="embraceForm" class="w-full relative z-10">
              <Embrace />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const { client } = usePrismic()
const { data: embrace } = await useAsyncData('embrace', () =>
  client.getSingle('embracepage')
)
try {
  if (embrace?.value) {
    usePrismicSEO(embrace.value.data)
  }
} catch (e) {
  console.error(e)
  throw (e)
}
const embraceForm = ref()
</script>
