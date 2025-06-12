<script setup lang="ts">
const props = defineProps<{
  ecoBanksData: any
  sliceComps: any
}>()

const readMoreP1 = ref(false)
const readMoreP2 = ref(false)

console.log(props.ecoBanksData)
</script>

<template>
  <div>
    <div
      class="prose introductory sm:prose-lg xl:prose-xl mx-auto max-w-[800px] pb-28 text-lg pt-5"
    >
      <!-- Introductory -->

      <div v-if="ecoBanksData.introductory?.length">
        <!-- Why Find a Green Bank? -->
        <PrismicRichText
          :field="ecoBanksData.introductory?.[0]?.primary?.text"
          :class="readMoreP1 ? '' : 'line-clamp-6'"
        />

        <button
          class="font-bold md:pt-0 pt-4"
          @click="readMoreP1 = !readMoreP1"
        >
          {{ readMoreP1 ? 'Read less' : 'Read more' }}
        </button>

        <!-- What is the Fossil Free Alliance? -->
        <div :class="readMoreP2 ? '' : 'line-clamp-6'">
          <SliceZone
            :slices="ecoBanksData.introductory?.slice(1) ?? []"
            :components="sliceComps"
          />
        </div>

        <button
          class="font-bold md:pt-0 pt-4"
          @click="readMoreP2 = !readMoreP2"
        >
          {{ readMoreP2 ? 'Read less' : 'Read more' }}
        </button>
      </div>

      <!-- F&Q -->
      <SliceZone
        :slices="ecoBanksData.slices1 ?? []"
        :components="sliceComps"
      />
    </div>

    <div
      v-if="ecoBanksData.footerBanner?.length"
      class="prose footer-banner bg-[#293145] contain max-w-[1072px] py-14 px-10 rounded-2xl"
    >
      <!-- Footer banner -->
      <SliceZone
        :slices="ecoBanksData.footerBanner ?? []"
        :components="sliceComps"
      />
    </div>
  </div>
</template>

<style>
.footer-banner , .footer-banner h4 {
  @apply text-gray-200;
}

.prose h4 {
  @apply text-3xl mt-0 text-center md:px-20 px-0 tracking-wide;
}

.prose h1 {
  @apply text-center text-3xl font-semibold sm:pt-[112px] pt-[96px] mt-0 tracking-wide px-8;
}

.footer-banner a {
  @apply text-gray-200 font-bold;
}

.footer-banner ul {
@apply w-full flex flex-col items-center mb-0 ;
}

.footer-banner li {
@apply md:w-[780px] w-full my-1;
}
</style>
