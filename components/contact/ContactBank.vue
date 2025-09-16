<script setup lang="ts">
import ClearbitLogo from '../icons/ClearbitLogo.vue';

defineProps({
  name: String,
  website: String,
  inheritBrandRating: Object,
  subtitle: String,
});
</script>

<template>
  <div class="bg-gradient-to-b from-sushi-50 to-pistachio-green pt-28 md:mb-16">
    <div
      style="
        scroll-margin-top: 80px;
        background-image: url('/img/backgrounds/circle-quarter.svg');
        background-position: left bottom;
      "
      class="contact-bank-wrapper contain grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 rounded-xl py-6 md:py-12 px-6 md:px-16 bg-primary-dark bg-no-repeat"
    >
      <div class="md:shadow-md rounded-2xl px-8 py-10 space-y-6 md:text-xl">
        <h1
          class="w-full text-xl md:text-4xl tracking-wider text-gray-50"
          style="font-weight: 900; line-height: 3rem"
        >
          Contact your bank to be greener
        </h1>
        <div
          style="border-radius: 20px; background-color: #d9e0f2"
          class="text-gray-700 md:shadow-md rounded-2xl px-8 py-10 space-y-6 md:text-xl"
        >
          <p>Help green your bank!</p>
          <p>
            Banks play a crucial role in financing a sustainable future by
            investing in greener projects. Use our form to contact your bank and
            encourage them to adopt greener policies.
          </p>
        </div>
      </div>

      <div>
        <label
          for="bank-name"
          class="text-arctic-blue text-opacity-75 font-medium block text-sm leading-5"
        >
          My bank is:
        </label>

        <div
          class="flex items-center relative w-full appearance-none border bg-white rounded-xl pr-10 text-left cursor-default border-sushi focus:border-sushi-300 focus:ring focus:ring-sushi-200 focus:ring-opacity-50 sm:text-sm truncate px-5 py-4 text-gray-900 placeholder-cool-gray-800' border-gray-200 pl-12"
        >
          <div class="relative w-6 h-6 mr-3">
            <ClearbitLogo
              :url="website"
              :size="24"
              img-class="absolute inset-0 z-20"
            />
          </div>
          <span id="bank-name" class="w-full flex-1 font-normal block truncate">
            {{ name }}
          </span>
        </div>

        <label
          for="bank-name"
          class="text-arctic-blue text-opacity-75 font-medium block text-sm leading-5"
        >
          Tone message:
        </label>
        <select
          id="tone-message"
          type="text"
          class="border-gray-200 pl-5 relative w-full appearance-none border bg-white rounded-xl pr-10 text-left cursor-default border-sushi focus:border-sushi-300 focus:ring focus:ring-sushi-200 focus:ring-opacity-50 sm:text-sm truncate px-5 py-4 text-gray-900 placeholder-cool-gray-800'"
        >
          <option value="friendly">😄 Friendly</option>
          <option value="neutral">🙂 Formal</option>
          <option value="serouse">🤨 Serious</option>
          <option value="assertive">😡 Assertive</option>
        </select>
        <CheckboxSection name="isAgreeTerms">
          I have read and understood Bank.Green’s
          <NuxtLink to="/privacy" class="link">privacy policy</NuxtLink>
          .
        </CheckboxSection>

        <button class="button-green w-full mt-4" type="submit">
          Generate my email
        </button>
      </div>
    </div>
  </div>
</template>
