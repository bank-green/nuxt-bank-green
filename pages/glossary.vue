<template>
  <div class="page">
    <div class="bg-sushi-50 mt-8">
      <div class="page-fade-in contain max-w-4xl xl:max-w-5xl pt-28 pb-16">
        <h2 class="font-semibold text-xl md:text-3xl tracking-wider">
          {{ glossaryData?.title || 'Climate banking terms' }}
        </h2>

        <PrismicRichText
          v-if="glossaryData?.introduction"
          :field="glossaryData?.introduction"
          class="prose sm:prose-lg xl:prose-xl mx-auto max-w-4xl xl:max-w-5xl mt-4"
          fallback="aa are a number of acronyms and terms you might encounter when looking into a climate friendly bank. Here are some of the most common terms you might come across:"
        />
        <span v-for="term in glossaryTerms" :key="term.name || ''">
          <div
            class="max-w-full prose md:prose-lg border-t border-gray-200 px-5 py-4 text-gray-600 rounded-b-xl bg-white mt-4"
          >
            <strong>{{ term.name }}</strong>
            <PrismicRichText :field="term.definition" />
          </div>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { KeyTextField, RichTextField } from '@prismicio/types';

const { client } = usePrismic();
const { data: glossarypage } = await useAsyncData('glossary', () =>
  useSSRCache('glossary', () => client.getSingle('glossarypage'))
);
usePrismicSEO(glossarypage?.value?.data);

const glossaryData = glossarypage?.value?.data;
let glossaryTerms: { name: KeyTextField; definition: RichTextField }[] = [];
if (glossaryData?.terms) {
  glossaryTerms = glossaryData.terms.map(term => ({
    name: term.term,
    definition: term.definition,
  }));
}
</script>
