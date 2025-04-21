<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits(['success', 'update:modelValue'])

const showModal = computed({
  get: () => props.modelValue,
  set: val => emit('update:modelValue', val),
})

function clickSurvey() {
  emit('success')
}

const { client } = usePrismic()
const { data: surveyContent } = await useAsyncData('switchsurveyexit', () =>
  client.getSingle('switchsurveyexit'),
)
</script>

<template>
  <Modal
    v-if="surveyContent != null"
    v-model="showModal"
  >
    <div class="flex flex-col items-center">
      <PrismicRichText
        v-if="surveyContent?.data?.title"
        :field="surveyContent.data.title"
        class="text-3xl mb-6 font-semibold whitespace-pre-wrap"
      />
      <PrismicRichText
        v-if="surveyContent?.data?.subtitle"
        :field="surveyContent.data.subtitle"
        class="text-lg mb-6 font-semibold whitespace-pre-wrap"
      />
      <NuxtLink
        :to="surveyContent?.data?.link?.url"
        class="px-6 py-3 text-medium no-underline bg-sushi-500 rounded hover:bg-sushi-600"
        @click="clickSurvey"
      >
        <PrismicRichText
          v-if="surveyContent?.data?.buttontext"
          :field="surveyContent.data.buttontext"
        />
      </NuxtLink>
    </div>
  </Modal>
</template>
