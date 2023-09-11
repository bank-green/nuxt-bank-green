<template>
  <div class="page">
    <div class="bg-sushi-50">
      <div class="page-fade-in contain max-w-4xl xl:max-w-5xl pt-28 pb-16">
        <PrismicRichText
          :field="action?.data.introduction"
          class="prose sm:prose-lg xl:prose-xl mx-auto max-w-4xl xl:max-w-5xl"
        />
        <div
          class="mt-8 lg:mt-16 rounded-xl ring-2 ring-sushi-600 overflow-hidden bg-white"
        >
          <div class="flex flex-col items-center">
            <div
              class="flex flex-row w-full bg-sushi-400 divide-x-2 divide-sushi-600"
            >
              <div v-for="(tab, index) in tabs" :key="index" class="flex-grow">
                <input
                  :id="index"
                  v-model="selectedTabIndex"
                  class="hidden"
                  type="radio"
                  :value="index"
                >
                <label
                  class="flex justify-center py-2 text-sm sm:text-base md:text-2xl font-semibold cursor-pointer"
                  :class="
                    selectedTabIndex === index ? 'bg-sushi-200' : 'text-white'
                  "
                  :for="index"
                >{{ tab }}</label>
              </div>
            </div>
            <div class="prose md:prose-lg px-4">
              <div class="px-5 py-4" />
              <div
                v-if="tabs[selectedTabIndex] === 'Pressure'"
                class="pb-4 md:pb-8"
              >
                <SliceZone
                  :slices="action?.data.slices1 ?? []"
                  :components="sliceComps"
                  :context="{ takeaction: true }"
                />
              </div>
              <div
                v-else-if="tabs[selectedTabIndex] === 'Switch'"
                class="pb-4 md:pb-8"
              >
                <SliceZone
                  :slices="action?.data.slices2 ?? []"
                  :components="sliceComps"
                  :context="{ takeaction: true }"
                />
              </div>
              <div
                v-else-if="tabs[selectedTabIndex] === 'Share'"
                class="pb-4 md:pb-8"
              >
                <SliceZone
                  :slices="action?.data.slices3 ?? []"
                  :components="sliceComps"
                  :context="{ takeaction: true }"
                />
              </div>
              <div
                v-else-if="tabs[selectedTabIndex] === 'Learn'"
                class="pb-4 md:pb-8"
              >
                <SliceZone
                  :slices="action?.data.slices4 ?? []"
                  :components="sliceComps"
                  :context="{ takeaction: true }"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="contain max-w-5xl pb-16 mt-10">
          <CallToAction />
        </div>
      </div>
    </div>
  </div>
  <!-- FIXME: had to add this so the tailwind classes get loaded for the SharePicGallerySlice -->
  <div
    class="w-full flex flex-row flex-wrap sm:w-1/2 md:w-1/3 w-full p-2 mt-0"
  />
</template>

<script setup>
import { defineSliceZoneComponents } from '@prismicio/vue'
import { components } from '~~/slices'
const sliceComps = ref(defineSliceZoneComponents(components))

const { client } = usePrismic()
const { data: action } = await useAsyncData('takeaction', () =>
  client.getSingle('takeactionpage', {
    fetchLinks: ['accordionitem.title', 'accordionitem.slices']
  })
)
usePrismicSEO(action.value.data)

const tabs = ['Pressure', 'Switch', 'Share', 'Learn']
const selectedTabIndex = ref(0)
</script>
