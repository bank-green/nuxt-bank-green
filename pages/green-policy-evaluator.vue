<template>
  <div class="page">
    <div class="bg-sushi-100 md:pt-28 max-w-screen ">
      <div class="page-fade-in contain flex flex-col justify-center items-center max-w-6xl pt-28 lg:pt-12 gap-6">
        <div class="text-center prose sm:prose-lg xl:prose-xl">
          <div>
            <h1>{{ gpe?.data.title || "Reveal data-backed insights from sustainability reports faster than ever" }}</h1>
            <p>
              {{ gpe?.data.description || "Transform complex policies into actionable data with our Green Policy Evaluator" }}
            </p>
          </div>
        </div>
        <button class="button-green md:w-48 flex justify-center shadow-md" @click="() => showModal = true">
          Book a demo
        </button>
        <CalModal

          v-show="showModal"
          v-model="showModal"
        />
        <div
          class="flex flex-col items-center md:flex-row w-full pt-10 md:pt-8 md:pb-16"
        >
          <h3
            class="text-center text-2xl md:text-xl font-semibold whitespace-nowrap mb-6 md:mb-0 md:mr-2 lg:mr-12"
            style="font-family: serif"
          >
            {{ gpe?.data.title_as_featured_in || "We have been featured in" }}
          </h3>
          <div
            class="flex flex-col flex-wrap space-y-6 md:space-y-0 md:flex-row justify-between items-center w-full filter-grayscale opacity-20"
          >
            <SliceZone
              :slices="gpe?.data.slices1 ?? []"
              :components="sliceComps"
            />
          </div>
        </div>
        <div class="relative z-1 w-full h-full py-8 sm:py-10 md:py-12">
          <div class="grid grid-cols-3 gap-4 absolute max-h-6 top-0 inset-x-0 w-full max-h-3/2 min-h-full">
            <TextWithLogo
              v-for="feature in gpe?.data.leafslice1"
              :key="feature.title!"
              :title="feature?.title!"
              :img="asImageSrc(feature?.image)!"
              :description="feature?.description!"
            />
          </div>
        </div>
      </div>
      <Swoosh />
    </div>
    <div id="features" class="page-fade-in contain items-center max-w-6xl pt-28 lg:pt-12">
      <div class="prose sm:prose-lg xl:prose-xl contain text-center">
        <h2 class="text-center">
          {{ gpe?.data.title_features }}
        </h2>
        <p>{{ gpe?.data.description_features }}</p>
      </div>

      <div class=" grid grid-cols-2 gap-4 pt-28">
        <TextWithLogo
          v-for="feature in gpe?.data.textwithimage1"
          :key="feature.title!"
          :title="feature?.title!"
          :img="asImageSrc(feature?.image)!"
          :description="feature?.description!"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { asImageSrc } from '@prismicio/helpers'
import { defineSliceZoneComponents } from '@prismicio/vue'
import { components } from '~~/slices'
const sliceComps = ref(defineSliceZoneComponents(components))
const showModal = ref<boolean>(false)
const { client } = usePrismic()
const { data: gpe } = await useAsyncData('gpe', () =>
  client.getSingle('greenpolicyevaluatorpage'))

useHead({
  script: [
    {
      type: 'text/javascript',
      innerHTML: `(function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; typeof namespace === "string" ? (cal.ns[namespace] = api) && p(api, ar) : p(cal, ar); return; } p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");
          Cal("init", "gpe-demo", {origin:"https://cal.com"});
            Cal.ns["gpe-demo"]("inline", {
            elementOrSelector:"#gpe-demo",
            calLink: "zakgottlieb/gpe-demo",
            });
            Cal.ns["gpe-demo"]("ui", {"styles":{"branding":{"brandColor":"#7BB122"}},"hideEventTypeDetails":false, "theme": "light"});`
    }
  ]
})

</script>
