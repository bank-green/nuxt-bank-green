<template>
  <div class="page">
    <div class="bg-sushi-50">
      <div class="page-fade-in contain max-w-4xl xl:max-w-5xl pt-28 pb-16">
        <article
          class="prose mx-auto max-w-4xl prose-h1:text-center prose-h1:font-semibold"
        >
          <SliceZone
            v-if="volunteers?.data.slices"
            :slices="volunteers?.data.slices ?? []"
            :components="sliceComps"
          />
          <div v-else>
            <h1>Volunteering with Bank.Green</h1>
            <p>
              Although we are beginning to fundraise, we are still currently led by volunteers!
              If you would like to extend your climate impact beyond talking to your bank or
              switching to a greener alternative, we would love for you to join our team!
            </p>
            <p>
              Please do reach out to volunteers@bank.green, attaching a copy of your C.V. and
              letting us know about your availability! We are still a small team and receive a lot of enquiries,
              but we will do our best to get back to you, even if we feel it may not be the best fit.
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
const { data: volunteers } = await useAsyncData('volunteers', () =>
  client.getSingle('volunteerspage'),
)
usePrismicSEO(volunteers.value?.data)
</script>
