<template>
  <div class="page">
    <section class="bg-sushi-100 md:pt-28 max-w-screen ">
      <div class="page-fade-in contain flex flex-col justify-center items-center max-w-6xl pt-28 pb-20 md:pb-0 lg:pt-12 md:gap-8 gap-10">
        <div class="text-center prose sm:prose-lg xl:prose-xl">
          <div>
            <h1>{{ gpe?.data.title || "Reveal data-backed insights from sustainability reports faster than ever" }}</h1>
            <p>
              {{ gpe?.data.description || "Transform complex policies into actionable data with our Green Policy Evaluator" }}
            </p>
          </div>
        </div>
        <button class="button-green md:w-48 flex justify-center shadow-md" @click="() => showModal = true">
          {{ gpe?.data.button_title || "Book a demo" }}
        </button>
        <div
          class="flex flex-col items-center md:flex-wrap lg:flex-nowrap md:flex-row w-full md:pt-8 md:pb-16 gap-4 justify-center"
        >
          <h3
            class="text-center text-gray-600 font-semibold text-2xl md:text-xl  whitespace-nowrap mb-6 md:mb-0 md:mr-2 lg:mr-12"
          >
            {{ gpe?.data.title_as_featured_in || "We have been featured in" }}
          </h3>
          <div
            class="flex flex-col gap-2 space-y-6 md:space-y-0 md:flex-row justify-between items-center w-full filter-grayscale opacity-40"
          >
            <SliceZone
              :slices="gpe?.data.slices1 ?? []"
              :components="sliceComps"
            />
          </div>
        </div>
        <div v-if="!!gpe?.data.key_points_items" class="z-10 w-full lg:h-28 md:h-40 static md:relative h-full">
          <div class="grid grid-cols-1 md:grid-cols-3 z-10 gap-4 static md:absolute md:-bottom-8 inset-x-0 w-full h-full">
            <LeafSlice
              v-for="feature in gpe?.data.key_points_items"
              :key="feature.title!"
              :title="feature?.title!"
              :img="asImageSrc(feature?.image)!"
              :description="feature?.description!"
            />
          </div>
        </div>
      </div>
      <Swoosh />
    </section>
    <section id="features" class="page-fade-in contain items-center max-w-6xl py-24 lg:pt-32 lg:pb-20 flex flex-col gap-10">
      <div class="prose sm:prose-lg xl:prose-xl contain text-center">
        <h2 class="text-center">
          {{ gpe?.data.title_features || "What can you do with the Green Policy Evaluator?" }}
        </h2>
        <p>{{ gpe?.data.description_features || "Elevate your advocacy efforts with a transformative approach to policy analysis. By allowing long and messy sustainability reports to be standardised, our tool enables:" }}</p>
      </div>
      <div v-if="!!gpe?.data.features_items" class=" grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextWithImage
          v-for="feature in gpe?.data.features_items"
          :key="feature.title!"
          :title="feature?.title!"
          :img="asImageSrc(feature?.image)!"
          :description="feature?.description!"
        />
      </div>
      <p class="max-w-3xl text-center">
        {{ gpe?.data.description_features_2 || "Leverage The Green Policy Evaluator to revolutionise how company sustainability policies are understood and influenced." }}
      </p>
      <button class="button-green md:w-48 flex justify-center shadow-md" @click="() => showModal = true">
        {{ gpe?.data.button_title || "Book a demo" }}
      </button>
    </section>
    <section class="bg-sushi-100 max-w-screen py-24 lg:py-20">
      <div class="flex flex-col md:flex-row page-fade-in contain justify-center items-center max-w-6xl  md:gap-8 gap-10">
        <div class="prose sm:prose-lg xl:prose-xl">
          <svg xmlns="http://www.w3.org/2000/svg" width="145" height="130" viewBox="0 0 145 130" fill="none">
            <path d="M145 1.35555C145 126.794 49.9866 137.638 0 126.794C0 53.4741 36.0434 -10.1654 145 1.35555Z" fill="#7BB122" fill-opacity="0.5" />
          </svg>
          <h2>{{ gpe?.data.title_usp || "What Sets the Green Policy Evaluator Apart?" }}</h2>
        </div>
        <div class="flex flex-col gap-4">
          <TextWithLogo
            v-for="usp in gpe?.data.usp_items"
            :key="usp.title!"
            :title="usp?.title!"
            :img="asImageSrc(usp?.image)!"
            :description="usp?.description!"
          />
        </div>
      </div>
    </section>
    <section id="cta" class="page-fade-in contain items-center max-w-6xl py-24 md:py-24 flex flex-col gap-10">
      <div class="prose sm:prose-lg xl:prose-xl contain text-center">
        <h2 class="text-center">
          {{ gpe?.data.title_cta || "Discover a faster, more efficient way to gain actionable insights from complex sustainability reports" }}
        </h2>
        <p>{{ gpe?.data.description_cta || "Accelerate your impact, save time, and make informed decisions effortlessly." }}</p>
      </div>
      <button class="button-green md:w-48 flex justify-center shadow-md" @click="() => showModal = true">
        {{ gpe?.data.button_title || "Book a demo" }}
      </button>
    </section>
    <section id="faq" class="bg-blue-100 overflow-hidden">
      <Swoosh direction="down" />
      <div class="prose sm:prose-lg xl:prose-xl contain text-center bg-max-w-screen py-24 lg:py-20">
        <h2>{{ gpe?.data.title_faq || "Still have questions? We have answers." }}</h2>
        <div
          class="prose sm:prose-lg xl:prose-xl mx-auto max-w-4xl xl:max-w-5xl mb-10"
        >
          <transition-group
            enter-active-class="transform-gpu ease-out duration-300 transition"
            enter-from-class="-translate-y-2 opacity-0"
            enter-to-class="translate-y-0 opacity-100"
            leave-active-class="transform-gpu transition ease-in duration-190"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          />
          <SliceZone
            v-if="gpe?.data.slices5"
            :slices="gpe?.data.slices5 ?? []"
            :components="sliceComps"
          />
          <h3 v-else style="text-align:center">
            Error Loading Content.
          </h3>
        </div>
      </div>
    </section>
    <CalModal
      v-show="showModal"
      v-model="showModal"
    />
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
