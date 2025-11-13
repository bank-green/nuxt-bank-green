<template>
  <section
    class="rounded-3xl bg-[#22283a] px-8 py-10 md:px-12 md:py-12 text-white grid gap-10 md:grid-cols-2 items-center"
  >
    <!-- LEFT COLUMN -->
    <div class="space-y-6">
      <h1 class="text-3xl md:text-4xl font-semibold leading-tight">
        Contact your bank to be greener
      </h1>

      <div
        class="mt-4 max-w-lg rounded-3xl bg-white/10 px-6 py-6 backdrop-blur-sm"
      >
        <p class="text-lg font-semibold">Help green your bank!</p>
        <p class="mt-3 text-sm md:text-base text-white/90">
          Banks play a crucial role in financing a sustainable future by
          investing in greener projects. Use our form to contact your bank and
          encourage them to adopt greener policies.
        </p>
      </div>
    </div>
    <!-- RIGHT COLUMN (your existing form component) -->
    <div class="space-y-6">
      <!-- Bank pill -->
      <div class="space-y-2">
        <p class="text-xs font-medium uppercase tracking-wide text-white/70">
          My bank is
        </p>
        <div
          class="flex items-center justify-between rounded-full bg-white px-4 py-2.5 shadow-lg shadow-slate-900/25 border border-white/40"
        >
          <div class="flex items-center gap-3 min-w-0">
            <span
              class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-700 text-lg"
            >
              🏦
            </span>
            <span class="text-sm font-semibold text-slate-900 truncate">
              {{ bankName }}
            </span>
          </div>
          <!-- optional clear button placeholder -->
          <button
            type="button"
            class="ml-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-slate-500 text-[10px] hover:bg-slate-200 hover:text-slate-700"
            aria-label="Change bank"
          >
            ✕
          </button>
        </div>
      </div>

      <!-- Tone selector pill -->
      <div class="space-y-2">
        <p class="text-xs font-medium uppercase tracking-wide text-white/70">
          Tone of message to your bank
        </p>
        <div
          class="flex items-center justify-between rounded-full bg-white px-4 py-2.5 shadow-lg shadow-slate-900/25 border border-white/40"
        >
          <select
            id="tone"
            v-model="selectedTone"
            class="flex-1 bg-transparent border-none text-sm font-semibold text-slate-900 focus:outline-none focus:ring-0 appearance-none pr-6"
          >
            <option v-for="tone in tones" :key="tone" :value="tone">
              {{ tone.charAt(0) + tone.slice(1).toLowerCase() }}
            </option>
          </select>
          <span class="ml-3 text-xl">
            <span v-if="selectedTone === 'POLITE'">😊</span>
            <span v-else-if="selectedTone === 'FRIENDLY'">🙂</span>
            <span v-else-if="selectedTone === 'FORMAL'">📝</span>
            <span v-else-if="selectedTone === 'DIRECT'">💬</span>
            <span v-else>😌</span>
          </span>
        </div>
      </div>

      <!-- Privacy checkbox -->
      <label
        class="mt-2 flex items-start gap-2 text-xs text-white/90 leading-snug"
      >
        <input
          v-model="accepted"
          type="checkbox"
          class="mt-0.5 h-4 w-4 rounded border-white/40 bg-transparent text-lime-400 focus:ring-lime-400"
        />
        <span>
          I have read and understood Bank.Green’s
          <NuxtLink
            to="/privacy-policy"
            class="underline text-lime-200 hover:text-lime-100"
          >
            privacy policy
          </NuxtLink>
        </span>
      </label>

      <!-- Turnstile slot / placeholder -->
      <div
        class="mt-3 rounded-lg bg-white/95 px-4 py-3 shadow-lg shadow-slate-900/25"
      >
        <slot name="turnstile" />
      </div>

      <!-- Submit button -->
      <button
        type="button"
        class="mt-4 w-full rounded-full bg-[#47692c] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/40 transition hover:bg-[#3f5c26] disabled:opacity-60 disabled:cursor-not-allowed"
        :disabled="loading || !accepted"
        @click="generateAndGo(bankName)"
      >
        {{ loading ? 'Generating…' : 'Generate Email Message' }}
      </button>

      <p class="mt-1 text-center text-xs text-white/70">
        (Opens in new window)
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useEmbraceStore } from '../../stores/embrace';

const router = useRouter();
const store = useEmbraceStore();
// // Form state
const tones = ['FRIENDLY', 'POLITE', 'FORMAL', 'DIRECT'];
const loading = ref(false);
const accepted = ref(false);

const props = defineProps<{
  bankName: string;
  bankEmail?: string;
}>();

const selectedTone = ref('POLITE');

async function generateAndGo(bankName: string) {
  loading.value = true;
  try {
    const res = await fetch('/api/embrace', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        bankName,
        tone: selectedTone.value,
        // Temporary defaults to satisfy Embrace validation
        name: 'Bank.Green supporter',
        email: 'noreply@bank.green',
        hometown: 'Unknown',
        background:
          'Bank.Green user asking their bank to take stronger climate action on the climate crisis.',
      }),
    });

    const data = await res.json();
    store.setDraft({
      subject: data.subject,
      text: data.text || data.response?.text || '',
      campaignId: data.campaign_id,
      contactEmail: data.contactEmail,
    });
    router.push({
      path: '/contact-my-bank',
      query: {
        bankName,
        tone: selectedTone.value,
      },
    });
  } finally {
    loading.value = false;
  }
}

// Handle submit -> navigate to next page
// const handleSubmit = () => {
//   // Assume valid if accepted and bankName is set
//   if (!accepted.value || !props.bankName) return;
//   router.push({
//     path: '/contact-my-bank',
//     query: {
//       bankName: props.bankName,
//       bankEmail: props.bankEmail || '',
//       tone: selectedTone.value,
//     },
//   });
// };
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
