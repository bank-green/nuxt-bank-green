<template>
  <div class="page">
    <div class="bg-sushi-50">
      <div class="page-fade-in contain max-w-4xl xl:max-w-5xl pt-28 pb-16">
        <article
          class="prose mx-auto max-w-4xl prose-h1:text-center prose-h1:font-semibold"
        >
          <SliceZone
            :slices="volunteers?.data.slices ?? []"
            :components="sliceComps"
          />
        </article>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineSliceZoneComponents } from "@prismicio/vue";
import { components } from "~~/slices";

const sliceComps = ref(defineSliceZoneComponents(components));

const { client } = usePrismic();
const { data: volunteers } = await useAsyncData("volunteers", () =>
  client.getSingle("volunteerspage"),
);
usePrismicSEO(volunteers.value.data);
</script>
