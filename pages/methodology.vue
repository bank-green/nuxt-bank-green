<template>
  <div class="page">
    <section class="bg-gradient-to-b from-sushi-50 to-sushi-100 md:pt-28 max-w-screen">
      <div class="page-fade-in contain flex flex-col justify-center items-center max-w-6xl pt-28 pb-20 lg:pt-12 gap-10">
        <h1
          class="text-center text-3xl font-semibold text-gray-800 sm:text-5xl"
          style="line-height: 1.2;"
        >
          {{ methodology?.data.hero_title || "How We Rate Banks" }}
        </h1>
        <PrismicRichText
          :field="methodology?.data.hero_description"
          class="prose sm:prose-lg xl:prose-xl mx-auto text-center"
          fallback="Our bank ratings fall into five categories: 'Great,' 'Good','OK','Bad” and 'Worst,' depending on the number of overall points scored according to our scorecard."
        />
        <PrismicImage
          v-if="methodology?.data.hero_image"
          class="max-w-4xl w-full h-full object-contain object-top"
          :alt="methodology.data.hero_image.alt"
          :field="methodology?.data.hero_image"
        />
      </div>

      <Swoosh />
    </section>
    <section
      id="target"
      class="page-fade-in contain py-16 flex flex-col gap-12 max-w-6xl"
    >
      <h2 class="text-2xl font-semibold text-left sm:text-3xl max-w-5xl">
        {{ methodology?.data.target_title || "Our Rating Methodology Caters for Different Types of Financial Institutions" }}
      </h2>
      <div class="flex-col lg:flex-row flex gap-6 items-center">
        <div class="prose sm:prose-lg xl:prose-xl mx-auto">
          <PrismicRichText
            v-if="methodology?.data.target_description"
            :field="methodology?.data.target_description"
            class="textlink"
          />
          <p v-else>
            The methodology has been designed in such a way so as to accommodate unique circumstances of banks (large and small), credit unions and building societies. We also take into account memberships of climate organisations (e.g., Global Alliance on Banking Values) and certifications (e.g., B Corp certification).
            <br>
            If a bank, or a bank-like institution, provides services to its customers or for its own banking needs via a banking partner that we have rated <b>Worst</b> or <b>Bad</b>, it will negatively impact the primary bank’s rating.
          </p>
        </div>
        <PrismicImage
          v-if="methodology?.data.target_image"
          class="max-w-lg w-full h-full object-contain object-top"
          :alt="methodology.data.target_image.alt"
          :field="methodology?.data.target_image"
        />
      </div>
    </section>
    <section class="bg-blue-50 max-w-screen">
      <Swoosh direction="down" />
      <div class="page-fade-in contain max-w-4xl xl:max-w-6xl py-10 lg:py-16">
        <h2 class="text-2xl font-semibold text-left sm:text-3xl text-center">
          {{ methodology?.data.factors_title || "What Factors Affect a Bank’s Rating?" }}
        </h2>

        <div
          class="mt-8 lg:mt-16 rounded-xl ring-2 ring-sushi-600 overflow-hidden bg-white"
        >
          <div class="flex flex-col items-center">
            <div
              class="flex flex-row w-full bg-sushi-400 divide-x-2 divide-sushi-600"
            >
              <div
                v-for="(tab, index) in tabs"
                :key="index"
                class="flex-grow"
              >
                <input
                  :id="index.toString()"
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
                  :for="index.toString()"
                >{{ tab }}</label>
              </div>
            </div>
            <div class="prose md:prose-lg px-4">
              <div class="px-5 py-4" />
              <div
                v-if="tabs[selectedTabIndex] === methodology?.data.lending_tab_name"
                class="pb-4 md:pb-8"
              >
                <SliceZone
                  :slices="methodology?.data.slices2 ?? []"
                  :components="sliceComps"
                  :context="{ takeaction: true }"
                />
              </div>
              <div
                v-else-if="tabs[selectedTabIndex] === methodology?.data.emissions_tab_name"
                class="pb-4 md:pb-8"
              >
                <SliceZone
                  :slices="methodology?.data.slices3 ?? []"
                  :components="sliceComps"
                  :context="{ takeaction: true }"
                />
              </div>
              <div
                v-else-if="tabs[selectedTabIndex] === methodology?.data.policy_tab_name"
                class="pb-4 md:pb-8"
              >
                <SliceZone
                  :slices="methodology?.data.slices4 ?? []"
                  :components="sliceComps"
                  :context="{ takeaction: true }"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Swoosh color="text-sushi-50" />
    </section>
    <section class="bg-gradient-to-b from-sushi-50 to-sushi-100 max-w-screen">
      <div class="page-fade-in contain flex flex-col justify-center items-center max-w-6xl py-10 lg:py-16 gap-10">
        <h2 class="text-3xl font-semibold text-left sm:text-4xl text-center">
          {{ methodology?.data.sustainable_title || "Sustainable Banks" }}
        </h2>
        <PrismicRichText
          :field="methodology?.data.sustainable_description"
          class="text-center text-lg"
          fallback="Banks that are rated Great or Good are added to our Sustainable Banks webpage.
That doesn’t mean that these banks have no fossil fuel lending at all, instead it can signify:"
        />
        <div
          v-if="!!methodology?.data.sustainable_bullets"
          class="flex-col flex md:flex-row gap-4"
        >
          <TextWithImage
            v-for="bullets in methodology?.data.sustainable_bullets"
            :key="bullets.description!"
            :img="asImageSrc(bullets?.icon)!"
            :description="bullets?.description!"
            class="bg-white items-start rounded-lg p-4 "
            img-classes="w-8 h-8"
            style="box-shadow: 0px 8px 20px 4px rgba(0, 0, 0, 0.10); flex: 1 1 0px;"
          />
        </div>
        <div class="flex-col flex md:flex-row gap-8 items-center w-full">
          <PrismicImage
            v-if="methodology?.data.sustainable_call_out_image"
            class="max-w-xs w-full h-full object-contain object-top"
            :alt="methodology.data.sustainable_call_out_image.alt"
            :field="methodology?.data.sustainable_call_out_image"
          />
          <PrismicRichText
            :field="methodology?.data.sustainable_call_out"
            class="bg-sushi-600 items-start rounded-lg p-8 text-white h-full text-lg"
            fallback="Banks with good or great ratings that have zero fossil fuel lending, e.g. by virtue of their operating model or lending only to individuals, charities etc, will be identified on our website with a special tag."
          />
        </div>
      </div>
    </section>
    <section
      id="sources"
      class="page-fade-in contain py-16 flex flex-col gap-12 max-w-6xl"
    >
      <h2 class="text-2xl font-semibold text-left sm:text-3xl ">
        {{ methodology?.data.sources_title || "Data sources we use" }}
      </h2>
      <PrismicRichText
        :field="methodology?.data.sources_description"
        class="text-lg"
        fallback="We use a wide range of data sources, including financial statements, CDP, annual and sustainability reports, disclosure questionnaires, Investor Relations pages of the bank’s website, and lobbying databases."
      />
    </section>
    <PrismicImage
      v-if="methodology?.data.sources_image"
      class="w-full h-full object-contain object-top"
      :alt="methodology.data.sources_image.alt"
      :field="methodology?.data.sources_image"
    />
    <section
      class="page-fade-in  w-full bg-primary-dark"
    >
      <div class="contain max-w-6xl py-10 lg:py-16 text-white items-center flex flex-col gap-6">
        <h2 class="text-2xl font-semibold sm:text-3xl ">
          {{ methodology?.data.questions_title || "Still have questions?" }}
        </h2>
        <PrismicRichText
          :field="methodology?.data.questions_description"
          class="max-w-4xl text-center text-xl underlineLink"
          fallback="Our bank ratings fall into five categories: 'Great,' 'Good','OK','Bad” and 'Worst,' depending on the number of overall points scored according to our scorecard."
        />
        <NuxtLink
          to="/contact"
          class="button-green w-full md:w-auto"
        >
          {{ methodology?.data.questions_button_title || "Contact us" }}
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { asImageSrc } from '@prismicio/helpers'
import { defineSliceZoneComponents } from '@prismicio/vue'
import { components } from '~~/slices'

const sliceComps = ref(defineSliceZoneComponents(components))

const { client } = usePrismic()
const { data: methodology } = await useAsyncData('methodology', () =>
  client.getSingle('methodology', {
    fetchLinks: ['accordionitem.title', 'accordionitem.slices'],
  }),
)
usePrismicSEO(methodology.value?.data)

const tabs = [methodology.value?.data.lending_tab_name, methodology.value?.data.emissions_tab_name, methodology.value?.data.policy_tab_name]
const selectedTabIndex = ref(0)
</script>
