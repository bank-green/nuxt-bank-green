<template>
  <div class="contain grid grid-cols-1 md:grid-cols-5 gap-8">
    <div class="col-span-1 md:col-span-2">
      <NuxtLink :to="website" target="_blank" class="button-green w-full">
        <span class="font-semibold">{{ `Visit ${bankName}` }}</span>
      </NuxtLink>
    </div>
    <div class="col-span-1 md:col-span-3 pt-1">
      <PrismicRichText
        v-if="switchSurveyText"
        :field="switchSurveyText"
      ></PrismicRichText>
      <PrismicRichText
        v-if="switchSurveyLink"
        class="font-semibold"
        :field="switchSurveyLink"
      ></PrismicRichText>
    </div>
  </div>
</template>
<script setup lang="ts">
import { RichTextField } from "@prismicio/types";

const BANK_NAME_TEMPLATE = "{{Bank Name}}";

const props = defineProps<{
  bankName: string | undefined;
  prismicDefaultPageData: Record<string, any> | null;
  website?: string;
}>();

const switchSurveyText: ComputedRef<RichTextField | null> = computed(() => {
  const result =
    props.prismicDefaultPageData != null &&
    props.prismicDefaultPageData["switch-survey-text"];
  if (
    result &&
    result[0] &&
    typeof result[0].text === "string" &&
    props.bankName
  )
    result[0].text = result[0].text.replace(BANK_NAME_TEMPLATE, props.bankName);
  return result;
});

const switchSurveyLink: ComputedRef<RichTextField | null> = computed(
  () =>
    props.prismicDefaultPageData != null &&
    props.prismicDefaultPageData["switch-survey-link"],
);
</script>
