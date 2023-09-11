<template>
  <div class="page">
    <div class="bg-sushi-50">
      <div class="page-fade-in contain max-w-4xl xl:max-w-5xl pt-28 pb-16">
        <article
          class="prose sm:prose-lg xl:prose-xl mx-auto max-w-4xl xl:max-w-5xl"
        >
          <SliceZone
            :slices="disclaimer?.data.slices ?? []"
            :components="sliceComps"
          />
        </article>
      </div>
    </div>
  </div>
</template>

<script setup>
import { components } from "~~/slices";
import { defineSliceZoneComponents } from "@prismicio/vue";

useHeadHelper("Disclaimer");

const sliceComps = ref(defineSliceZoneComponents(components));

const { client } = usePrismic();
const { data: disclaimer } = await useAsyncData("disclaimer", () =>
  client.getSingle("disclaimerpage", {
    fetchLinks: ["accordionitem.title", "accordionitem.slices"],
  }),
);
</script>
