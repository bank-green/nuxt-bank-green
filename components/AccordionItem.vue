<template>
  <div>
    <div
      class="px-5 py-4 flex items-center justify-between cursor-pointer bg-white hover:bg-gray-50"
      :class="{
        'rounded-t-xl': isOpen,
        'rounded-xl': !isOpen,
        'pointer-events-none bg-gray-50': !loaded,
      }"
      @click="isOpen = !isOpen"
    >
      <transition
        enter-active-class="duration-200 transform-gpu origin-top ease-out"
        enter-from-class="opacity-0 scale-y-95"
        enter-to-class="opacity-100 scale-y-100"
        leave-active-class="duration-100 transform-gpu origin-top ease-in"
        leave-from-class="opacity-100 scale-y-100"
        leave-to-class="opacity-0 scale-y-95"
        mode="out-in"
      >
        <div
          v-if="!loaded"
          class="font-semibold text-sm md:text-lg text-gray-300 mr-4"
        >
          Loading...
        </div>
        <h2
          v-else
          class="font-semibold md:!text-lg text-gray-700 mr-4"
        >
          <a
            :href="'#' + convertToSlug(title)"
            aria-hidden="true"
          />
          {{ title }}
        </h2>
      </transition>

      <svg
        :class="
          'flex-none transform-gpu transition-transform h-3 text-sushi-500 '
            + caratClass
            + (isOpen ? ' rotate-180' : ' rotate-0')
        "
        viewBox="0 0 12 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 1.5L6 6.5L11 1.5"
          stroke="currentColor"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
    <transition
      enter-active-class="duration-200 transform-gpu origin-top ease-out"
      enter-from-class="opacity-0 scale-y-95"
      enter-to-class="opacity-100 scale-y-100"
      leave-active-class="duration-100 transform-gpu origin-top ease-in"
      leave-from-class="opacity-100 scale-y-100"
      leave-to-class="opacity-0 scale-y-95"
    >
      <div
        v-if="isOpen"
        class="max-w-full prose md:prose-lg border-t border-gray-200 px-5 py-4 text-gray-600 rounded-b-xl bg-white"
      >
        <span
          v-if="description"
          v-html="description"
        />
        <slot />
      </div>
    </transition>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  description: String,
  loaded: { type: Boolean, default: true },
  caratClass: String,
})
const isOpen = ref(false)
</script>

<style scoped>
/* Manually set style because prose cause h2 to be huge */
h2 {
  font-size: 1.125rem;
  line-height: 1.75rem;
  margin-top: 0;
  margin-bottom: 0;
  color: rgba(55, 65, 81, var(--tw-text-opacity));
}
</style>
