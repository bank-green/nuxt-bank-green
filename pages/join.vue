<template>
  <div class="page bg-blue-100 text-gray-800 pt-28">
    <div class="page-fade-in overflow-hidden">
      <div class="contain">
        <div class="flex flex-col justify-center items-center">
          <PrismicRichText class="w-full max-w-4xl text-center bg-primary-dark text-gray-50 rounded-xl font-semibold text-xl md:text-3xl tracking-wider mb-8 md:mb-4 py-4" :field="join?.data.title" />
          <div
            class="max-w-4xl flex flex-col md:flex-row items-center justify-center md:space-x-8"
          >
            <div class="md:w-1/2 max-w-sm">
              <p class="text-lg md:text-2xl tracking-wide mb-1 md:mb-4">
                <b> <PrismicText :field="join?.data.boldtext" />
                </b><PrismicText :field="join?.data.paragraph" />
              </p>
            </div>
            <CheckList class="md:w-1/2 my-8" :list="checkList" />
          </div>
        </div>
        <div class="flex flex-row justify-center items-center">
          <SignupBox
            :title="$prismic.asText(join?.data.signuptext)"
            tag="join form"
            class="max-w-4xl w-full mt-8"
          />
        </div>
      </div>
    </div>
    <div class="flex flex-row items-center justify-center">
      <LottiePlayer
        path="/anim/money_smoke.json"
        class="w-full md:max-w-2xl h-42 object-cover object-bottom"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import CheckList from '@/components/CheckList.vue'
import SignupBox from '@/components/forms/SignupBox.vue'

useHeadHelper(
  'Join the Money Movement - Bank.Green',
  'Join our consumer action community to attend our Zoom workshops to take on fossil funding banks and discover other ways to divest from fossil fuels.'
)
const p = usePrismic()
const { data: join } = await useAsyncData('join', () => p.client.getSingle('joinpage'))

const checkList = computed(() => [
  'Learn about the issues via our blog updates',
  'Join our campaigns to take action against fossil finance',
  'Discover other ways to divest from fossil fuels'
])

</script>
