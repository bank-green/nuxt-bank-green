<template>
  <div
    class="flex flex-col justify-center items-center rounded-xl py-6 md:py-12 px-6 md:px-16"
    :class="light ? 'bg-transparent' : 'bg-primary-dark'"
  >
    <h2
      class="w-full text-center font-semibold text-xl md:text-3xl tracking-wider mb-8 md:mb-4"
      :class="light ? 'text-gray-800' : 'text-gray-50'"
    >
      {{ call?.data?.title || "Start to Bank Green Today" }}
    </h2>
    <div
      class="flex flex-col md:flex-row items-center justify-center md:space-x-8"
      :class="spaced ? 'py-4' : ''"
    >
      <div class="md:w-1/2 max-w-md">
        <PrismicRichText
          class="text-lg md:text-2xl tracking-wide mb-1 md:mb-4 text-black"
          :class="light ? 'text-blue-900' : 'text-white'"
          :field="call?.data?.text"
          fallback="Banks live and die on their reputations. Mass movements of money to fossil-free competitors puts those reputations at grave risk. By moving your money to a sustainable financial institution, you will:"
        />
      </div>
      <CheckList
        class="md:w-1/2 my-6 md:text-xl"
        :list="[
          asText(call?.data?.checklist1) || 'Send a message to your bank that it must defund fossil fuels',
          asText(call?.data?.checklist2) || 'Join a fast-growing movement of consumers standing up for their future',
          asText(call?.data?.checklist3) || 'Take a critical climate action with profound effects',
        ]"
      />
    </div>
    <div
      class="flex flex-col space-y-2 sm:space-y-0 sm:flex-row justify-between items-center mt-8"
    >
      <NuxtLink
        to="/sustainable-eco-banks"
        class="button-green w-auto text-primary-dark"
      >
        Move Your Money Today
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { asText } from '@prismicio/helpers'
import CheckList from '@/components/CheckList.vue'

const { client } = usePrismic()
const { data: call } = await useAsyncData('calltoaction', () =>
  client.getSingle('calltoaction'),
)
defineProps({
  title: String,
  paragraph: String,
  checkListItems: Array,
  buttonText: String,
  light: Boolean,
  spaced: Boolean,
})
</script>
