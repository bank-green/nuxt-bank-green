<template>
  <span
    v-if="isUpcoming"
    :title="tooltipText"
  >{{ durationString }}
    <svg
      v-if="showTooltip"
      viewBox="0 0 1000 1000"
      class="inline cursor-pointer h-4 align-text-bottom"
    >
      <path
        fill="currentColor"
        d="m560 767.2 55.3 2.9v77.5h-230.7v-73.7l32-2.9c17.4-1.9 28.1-7.8 28.1-31v-269.5c0-21.4-5.8-28.2-24.2-28.2l-33.9-1.9v-80.4h173.5l-0.1 407.2zm-67.8-614.9c42.7 0 73.7 32.1 73.7 72.7 0 40.8-31 70.8-74.7 70.8-44.5 0-73.6-30.1-73.6-70.8-0.1-40.6 29-72.7 74.6-72.7zm7.7 837.7c-270.2 0-490-219.8-490-490s219.8-490 490-490c270.1 0 490 219.8 490 490s-219.9 490-490 490zm0-888c-219.5 0-398.1 178.6-398.1 398.1s178.6 398.1 398.1 398.1 398.1-178.6 398-398.1-178.6-398.1-398.1-398.1z"
      />
    </svg>
  </span>
  <span v-else-if="eventIsPastMessage">{{ eventIsPastMessage }}</span>
</template>

<script setup lang="ts">
import { clearInterval } from 'timers'
import {
  isValid,
  isFuture,
  formatDistanceToNowStrict,
  formatRelative,
} from 'date-fns'

const props = defineProps<{
  eventStart: Date
  eventIsPastMessage: string
  showTooltip: boolean
}>()

const isUpcoming = ref(false)
const interval: Ref<NodeJS.Timer | null> = ref(null)
const tooltipText = ref('')
const durationString = ref('')

function timerCount() {
  if (isFuture(props.eventStart)) {
    durationString.value = formatDistanceToNowStrict(props.eventStart, {
      addSuffix: false,
      unit: 'day',
    })
  } else {
    isUpcoming.value = false
    interval.value && clearInterval(interval.value)
  }
}

onMounted(() => {
  if (isValid(props.eventStart)) {
    timerCount()
    interval.value = setInterval(() => {
      timerCount()
    }, 1000)
    tooltipText.value = formatRelative(props.eventStart, new Date())
  }
})
</script>
