<template>
  <div v-if="true">
    <div>
      <div class="page-fade-in contain pb-8 sm:pb-10 md:pb-12 pt-24 sm:pt-32">
        <div class="max-w-3xl mx-auto mt-4 mb-8 sm:text-center">
          <h1 class="text-2xl sm:text-5xl font-extrabold text-sushi-900 mb-4">
            {{ post?.data.title }}
          </h1>
          <span class="text-base text-gray-700 font-semibold">
            {{ post?.data.publicationdate }} by {{ post?.data.author }}
          </span>
        </div>
        <div class="flex flex-col justify-center items-center">
          <div
            style="width: 100%"
            class="prose sm:prose-lg xl:prose-xl break-words"
          >
            <SliceZone
              :slices="post?.data.slices ?? []"
              :components="comps"
              :context="{ takeaction: true }"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="bg-blue-100 text-gray-800">
      <Swoosh direction="down" />
      <div class="contain">
        <div class="flex justify-center">
          <CallToAction class="max-w-5xl" :light="true" />
        </div>
      </div>
      <div class="flex items-end justify-end pointer-events-none">
        <div class="w-11/12">
          <LottiePlayer path="/anim/wind_2_without_bg.json" />
        </div>
      </div>
    </div>
  </div>
  <div
    v-else-if="error"
    class="w-full h-screen flex items-center justify-center flex flex-col items-center"
  >
    <p class="text-4xl font-bold">No blog found</p>
    <NuxtLink class="mt-2 border-b border-primary-dark" to="/blog"
      >Go back to Blogs</NuxtLink
    >
  </div>
  <div v-else class="w-full h-screen flex items-center justify-center">
    <span>
      <svg
        width="32"
        height="32"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 561 553"
        style="animation: ring 2s linear infinite"
      >
        <path
          d="M478 0A481 481 0 0 0 0 485v76h75c264 0 478-217 478-485V0h-75z"
          fill="#6C9039"
        />
      </svg>
    </span>
  </div>
</template>

<script setup>
import { components } from "~~/slices";
import { defineSliceZoneComponents } from "@prismicio/vue";

const route = useRoute();
const error = ref(false);

const { client } = usePrismic();
const slug = route.path.split("/").at(-1);
const { data: post } = await useAsyncData(slug, () =>
  client.getByUID("blogpost", slug),
);
console.log("post", post.value);

const comps = ref(defineSliceZoneComponents(components));

useHeadHelper(
  post.value?.data?.title ?? "Blog Post",
  post?.value?.data?.description,
);
</script>

<style></style>
