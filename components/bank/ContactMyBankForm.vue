<template>
  <section class="w-full text-center py-8">
    <h2 class="text-3xl font-semibold mb-4 text-primary-dark">
      Contact {{ bankName }}
    </h2>

    <p class="text-gray-700 mb-8 max-w-xl mx-auto">
      Ask {{ bankName }} to take stronger climate action by sending them an
      email. Select your preferred tone, review the message, and send it
      directly from your inbox.
    </p>

    <form
      @submit.prevent="handleSubmit"
      class="flex flex-col gap-6 max-w-md mx-auto text-left"
    >
      <!-- Tone selection -->
      <label class="flex flex-col gap-1">
        <span class="font-medium">Tone</span>
        <select v-model="tone" class="border border-gray-300 rounded p-2">
          <option value="polite">Polite</option>
          <option value="firm">Firm</option>
        </select>
      </label>

      <!-- Privacy checkbox -->
      <label class="flex items-center gap-2">
        <input type="checkbox" v-model="accepted" />
        <span>
          I agree to the
          <NuxtLink
            to="/privacy-policy"
            class="underline text-green-800 hover:text-green-600"
          >
            privacy policy
          </NuxtLink>
          .
        </span>
      </label>

      <!-- Submit button -->
      <button
        type="button"
        @click="handleSubmit"
        :disabled="!isFormValid"
        class="button-green w-full disabled:opacity-60"
      >
        Generate Email Message
      </button>
    </form>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps<{
  bankName: string;
  bankEmail?: string;
}>();

const router = useRouter();

// Form state
const tone = ref<'polite' | 'firm'>('polite');
const accepted = ref(false);
const isFormValid = computed(() => accepted.value);

// Handle submit -> navigate to next page
const handleSubmit = () => {
  if (!isFormValid.value) return;
  router.push({
    path: '/contact-my-bank',
    query: {
      bankName: props.bankName,
      bankEmail: props.bankEmail || '',
      tone: tone.value,
    },
  });
};
</script>

<style scoped>
.button-green {
  background-color: #15803d;
  color: white;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  transition: background-color 0.3s;
}

.button-green:hover {
  background-color: #166534;
}
</style>
