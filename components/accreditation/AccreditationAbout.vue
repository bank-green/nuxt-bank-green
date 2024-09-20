<template>
  <section class="flex flex-col gap-10 lg:flex-row-reverse min-h-[368px] px-6 lg:px-52 py-16 lg:py-20 bg-primary-dark text-white">
    <div class="flex flex-col gap-6 max-w-3xl">
      <h1 class="text-2xl lg:text-4xl font-bold">
        {{ title }}
      </h1>
      <PrismicRichText
        class="text-white font-medium"
        :field="description"
        fallback="This certification is part of the Bank.Green Accrediation Program to certified businesses that have committed to banking with environmentally responsible financial institutions, actively reducing their carbon footprint and building a healthier planet for generations to come."
      />
      <p class="">
        Are you a business?
        <NuxtLink
          class="underline font-medium inline-block"
          to="/contact"
        >
          Contact us to get more information ⟶
        </NuxtLink>
      </p>
    </div>
    <NuxtImg
      class="w-52 h-52 p-1 bg-white rounded-full"
      :src="logo"
      :provider="logoProvider"
      alt="Accreditation Logo"
    />
  </section>
</template>

<script lang="ts" setup>
import { asImageSrc } from '@prismicio/helpers'
import type { AccreditationpageDocumentData } from 'prismicio-types'

interface Props {
  title?: AccreditationpageDocumentData['about_title']
  description?: AccreditationpageDocumentData['about_description']
  logo?: AccreditationpageDocumentData['aboutlogo']
}

const props = withDefaults(defineProps<Props>(), {
  title: 'About the Bank.Green Certification',
})

const logo = asImageSrc(props.logo) ?? '/img/certification/fossil-free-certified.png'
const logoProvider = props.logo ? '' : 'none'
</script>
