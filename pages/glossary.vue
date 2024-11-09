<template>
  <div class="page">
    <div class="bg-sushi-50 mt-8">
      <div class="page-fade-in contain max-w-4xl xl:max-w-5xl pt-28 pb-16">
        <PrismicRichText
          v-if="glossaryData?.introduction"
          :field="glossaryData?.introduction"
          class="prose sm:prose-lg xl:prose-xl mx-auto max-w-4xl xl:max-w-5xl"
          fallback="Error Loading Content"
        />
        <div
          v-else
          class="prose sm:prose-lg xl:prose-xl mx-auto max-w-4xl xl:max-w-5xl"
        >
          <h2>Climate banking terms</h2>
          <p>
            There are a number of acronyms and terms you might encounter when looking into a climate friendly bank. Here are some of the most common terms you might come across:
          </p>
          <span
            v-for="term in terms"
            :key="term"
          >
            <div class="max-w-full prose md:prose-lg border-t border-gray-200 px-5 py-4 text-gray-600 rounded-b-xl bg-white mt-4">
              <strong>{{ term.name }}</strong><span v-html="term.definition" />
            </div>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { terms } from '../utils/glossary.js'

const { client } = usePrismic()
const { data: glossarypage } = await useAsyncData('glossary', () => client.getSingle('glossarypage'))
usePrismicSEO(glossarypage?.value?.data)

const glossaryData = glossarypage?.value?.data
</script>
