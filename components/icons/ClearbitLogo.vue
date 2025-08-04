<script setup lang="ts">
const showClearbit = ref(true)

function handleError() {
  showClearbit.value = false
}

const props = withDefaults(
  defineProps<{
    url?: string
    imgClass?: string
    size?: number
  }>(),
  {
    size: 60,
    src: 'doesnotexist', // added to trigger handleError, not ideal, but it works
  }
)

const urlDomain = computed(() => {
  let url = props.url
  if (url) {
    if (!url.includes('http')) {
      url = `https://${url}`
    }
    if (url.includes('.')) {
      return new URL(url).hostname
    }
  }
  return ''
})

const src = computed(() => {
  if (urlDomain.value) {
    switch (urlDomain.value) {
      case 'monzo.com':
        return '/img/logos/monzo.png'
      case 'www.jpmorganchase.com':
        return '/img/logos/chase.png'
      case 'www.db.com':
        return '/img/logos/db.png'
      case 'www.helios.do':
        return '/img/logos/helios.png'
      case 'www.flowe.com':
        return '/img/logos/flowe.png'
      case 'www.bigpathcapital.com':
        return '/img/logos/bigpath.png'
      case 'www.amalgamatedbank.com':
        return '/img/logos/amalgamated.png'
      case 'green-got.com':
        return '/img/logos/green_got.png'
    }

    return `https://logo.clearbit.com/${urlDomain.value}?size=${props.size * 2}`
  }
  return ''
})
</script>

<template>
  <ClientOnly>
    <img
      v-if="showClearbit"
      :src="src"
      :class="`object-contain`"
      :style="`width: ${size}px; height: ${size}px`"
      @error="handleError"
    />
    <img
      v-else
      src="/img/icons/bank-icon.svg"
      :style="`width: ${size}px; height: ${size}px`"
      :class="`object-contain`"
    />
  </ClientOnly>
</template>
