<template>
  <div
    class="flex flex-col justify-center items-center rounded-xl py-6 md:py-12 px-6 md:px-16"
    :class="light ? 'bg-transparent' : 'bg-primary-dark'"
  >
    <h2
      class="w-full text-center font-semibold text-xl md:text-3xl tracking-wider mb-8 md:mb-4"
      :class="light ? 'text-gray-800' : 'text-gray-50'"
    >
      {{ call.data.title }}
    </h2>
    <div
      class="flex flex-col md:flex-row items-center justify-center md:space-x-8"
      :class="spaced ? 'py-4' : ''"
    >
      <div class="md:w-1/2 max-w-md">
        <PrismicRichText
          class="text-lg md:text-2xl tracking-wide mb-1 md:mb-4 text-white"
          :class="light ? 'text-blue-900' : 'text-white'"
          :field="call.data.text"
        />
      </div>
      <CheckList
        class="md:w-1/2 my-6 md:text-xl"
        :list="[
          asText(call.data.checklist1),
          asText(call.data.checklist2),
          asText(call.data.checklist3),
        ]"
      />
    </div>
    <div
      class="flex flex-col space-y-2 sm:space-y-0 sm:flex-row justify-between items-center mt-8"
    >
      <NuxtLink
        to="/sustainable-eco-banks"
        class="button-green w-auto"
      >
        Move Your Money Today
      </NuxtLink>
      <div class="text-xs text-gray-500 mx-4 uppercase">
        Or
      </div>
      <NuxtLink
        to="/pledge"
        :class="['underline', light ? 'text-gray-800' : 'text-white']"
      >
        Pledge to Move It
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { asText } from '@prismicio/helpers'
import CheckList from '@/components/CheckList.vue'

const { client } = usePrismic()
const { data: call } = await useAsyncData('calltoaction', () =>
  client.getSingle('calltoaction')
)
defineProps({
  title: String,
  paragraph: String,
  checkListItems: Array,
  buttonText: String,
  light: Boolean,
  spaced: Boolean
})
</script>
