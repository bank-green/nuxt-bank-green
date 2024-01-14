<template>
  <div class="page">
    <div class="bg-sushi-50">
      <div class="page-fade-in contain max-w-4xl xl:max-w-5xl pt-28 pb-16">
        <article
          class="prose sm:prose-lg xl:prose-xl mx-auto max-w-4xl xl:max-w-5xl"
        >
          <SliceZone
            v-if="disclaimer?.data.slices"
            :slices="disclaimer?.data.slices"
            :components="sliceComps"
          />
          <div v-else>
            <h1>Disclaimer</h1>
            <p>
              <strong>Bank.Green and its website (the “Site”) are a project of Empowerment Works Inc. 501(c)(3).</strong>
            </p>
            <p>
              The Site provides ideas and information on
              financial institutions and products and their relation to environmental issues.
            </p>
            <p>
              All information on the Site is provided in good faith, however we make no representation or warranty of any kind,
              express or implied, regarding the accuracy, adequacy, validity, reliability, availability or completeness of any
              information on the Site.
            </p>
            <p>
              The Site does not provide financial advice, and Empowerment Works Inc. 501(c)(3) is not responsible for any financial
              losses related to any actions (such as opting for a financial product) taken as a result of content from this website
              . Empowerment Works Inc. 501(c)(3) is also unable to account for any other issues that visitors encounter with external third parties,
              such as customer service or data privacy issues encountered with financial institutions linked on this website.
            </p>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineSliceZoneComponents } from '@prismicio/vue'
import { components } from '~~/slices'

const sliceComps = ref(defineSliceZoneComponents(components))

const { client } = usePrismic()
const { data: disclaimer } = await useAsyncData('disclaimer', () =>
  client.getSingle('disclaimerpage', {
    fetchLinks: ['accordionitem.title', 'accordionitem.slices']
  })
)
useHeadHelper(disclaimer.value?.data.head_helper_title)
</script>
