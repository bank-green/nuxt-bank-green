<template>
  <section class="bg-gradient-to-b from-sushi-50 to-pistachio-green p-28">
    <div class="contain">
      <div
        class="flex justify-between flex-flow rounded-xl py-6 md:py-12 px-6 md:px-16 bg-primary-dark bg-no-repeat"
        style="
          scroll-margin-top: 80px;
          background-image: url('/img/backgrounds/circle-quarter.svg');
          background-position: left bottom;
        "
      >
        <!-- LEFT COLUMN -->
        <div class="w-3/5 space-y-8">
          <h2
            class="w-full text-xl md:text-4xl tracking-wider text-gray-50 font-black leading-[3rem] mb-[2em]"
          >
            Contact your bank to be greener
          </h2>

          <div
            class="bg-white text-gray-700 md:shadow-md rounded-2xl px-8 py-10 space-y-6 md:text-xl"
          >
            <p>Help green your bank!</p>
            <p>
              Banks play a crucial role in financing a sustainable future by
              investing in greener projects. Use our form to contact your bank
              and encourage them to adopt greener policies.
            </p>
          </div>
        </div>
        <!-- RIGHT COLUMN (your existing form component) -->
        <div class="w-1/3 space-y-6">
          <!-- Bank pill -->
          <div class="space-y-2">
            <p
              class="text-arctic-blue text-opacity-75 font-medium block text-sm leading-5"
            >
              My bank is
            </p>
            <div
              class="flex items-center justify-between bg-white shadow-lg shadow-slate-900/25 border border-white/40 relative w-full rounded-xl text-left cursor-default border-sushi focus:border-sushi-300 focus:ring focus:ring-sushi-200 focus:ring-opacity-50 sm:text-sm truncate px-5 py-2 text-gray-900 placeholder-cool-gray-800 bg-gray-100 border-gray-200 text-gray-700 placeholder-gray-400"
            >
              <div class="flex items-center gap-3 min-w-0">
                <span class="inline-flex h-8 w-8 items-center justify-center">
                  <img src="/img/icons/bank-icon.svg" class="h-6 w-6" />
                </span>
                <span class="text-sm text-slate-900 truncate">
                  {{ bankName }}
                </span>
              </div>
            </div>
          </div>

          <!-- Tone selector -->
          <div class="space-y-2">
            <p
              class="text-arctic-blue text-opacity-75 font-medium block text-sm leading-5"
            >
              Tone of message to your bank
            </p>
            <div ref="dropdownRef" class="relative">
              <!-- Selected tone button -->
              <button
                type="button"
                class="w-full flex items-center gap-3 bg-white rounded-xl px-5 py-1 shadow-lg shadow-slate-900/25 border border-white/40"
                @click="isDropdownOpen = !isDropdownOpen"
              >
                <span
                  class="text-sm text-slate-900 flex-1 text-left capitalize"
                >
                  {{ selectedTone.toLowerCase() }}
                </span>
                <img
                  :src="getToneEmoji(selectedTone).src"
                  :alt="getToneEmoji(selectedTone).alt"
                  class="h-10 w-10 flex-shrink-0"
                />
                <svg
                  class="h-5 w-5 text-slate-900 flex-shrink-0 transition-transform"
                  :class="{ 'rotate-180': isDropdownOpen }"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>

              <!-- Dropdown options -->
              <div
                v-if="isDropdownOpen"
                class="absolute z-10 mt-2 w-full rounded-xl bg-white shadow-lg shadow-slate-900/25 border border-white/40 overflow-hidden"
              >
                <button
                  v-for="tone in tones"
                  :key="tone"
                  type="button"
                  class="w-full flex justify-between items-center gap-3 px-4 py-2.5 text-sm font-semibold text-slate-900 hover:bg-gray-50 transition-colors"
                  :class="{
                    'bg-sushi-50': selectedTone === tone,
                  }"
                  @click="selectTone(tone)"
                >
                  <span class="capitalize">
                    {{ tone.toLowerCase() }}
                  </span>
                  <img
                    :src="getToneEmoji(tone).src"
                    :alt="getToneEmoji(tone).alt"
                    class="h-10 w-10 flex-shrink-0"
                  />
                </button>
              </div>
            </div>
          </div>

          <!-- Privacy checkbox -->
          <label
            class="mt-2 flex items-start gap-2 text-xs text-white/90 leading-snug"
          >
            <input
              v-model="accepted"
              type="checkbox"
              class="mt-0.5 h-4 w-4 text-sushi-600 focus:ring-transparent border-gray-300 rounded appearance-none"
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

          <!-- Cloudflare Turnstile -->
          <div
            v-if="captchaSitekey"
            class="captcha-cloudflare bg-white/95 px-4 py-3 shadow-lg shadow-slate-900/25 flex justify-center"
          >
            <vue-turnstile
              v-model="captchaToken"
              :site-key="captchaSitekey"
              theme="light"
            />
          </div>

          <!-- Submit button -->
          <button
            type="button"
            class="mt-4 inline-block w-full max-w-full text-center rounded-xl bg-lime-400/90 px-6 py-5 text-sm font-semibold text-white shadow-lg shadow-slate-900/40 transition hover:bg-[#3f5c26] disabled:opacity-60 disabled:cursor-not-allowed"
            :disabled="loading || !accepted || (!captchaVerified && !isLocal)"
            @click="generateAndGo(bankName)"
          >
            {{ loading ? 'Generating…' : 'Generate Email Message' }}
          </button>
          <p class="mt-1 text-center text-xs text-white/70">
            (Opens in new window)
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import VueTurnstile from 'vue-turnstile';
import { useEmbraceStore } from '../../stores/embrace';

const router = useRouter();
const store = useEmbraceStore();

// Cloudflare Turnstile Captcha
const { isLocal, captchaVerified, captchaSitekey, captchaToken } = useCaptcha();

// Form state
const tones = ['FRIENDLY', 'POLITE', 'SERIOUS', 'DIRECT'];
const loading = ref(false);
const accepted = ref(false);

const props = defineProps<{
  bankName: string;
  bankEmail?: string;
  bankWebsite?: string;
}>();

const selectedTone = ref('POLITE');
const isDropdownOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

function getToneEmoji(tone: string) {
  const emojis: Record<string, { src: string; alt: string }> = {
    FRIENDLY: {
      src: '/img/icons/laughing-emoji.svg',
      alt: 'friendly tone',
    },
    POLITE: {
      src: '/img/icons/polite-emoji.svg',
      alt: 'polite tone',
    },
    SERIOUS: {
      src: '/img/icons/serious-emoji.svg',
      alt: 'serious tone',
    },
    DIRECT: {
      src: '/img/icons/angry-emoji.svg',
      alt: 'direct tone',
    },
  };
  return emojis[tone] || emojis.POLITE;
}

function selectTone(tone: string) {
  selectedTone.value = tone;
  isDropdownOpen.value = false;
}

// Close dropdown when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isDropdownOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

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

    // Try multiple possible locations for the email
    const contactEmail =
      data.contactEmail ||
      data.response?.contactEmail ||
      data.response?.contact_email ||
      props.bankEmail ||
      '';

    console.log('BANK WEBSITE', props.bankWebsite);

    store.setDraft({
      subject: data.subject,
      text: data.text || data.response?.text || '',
      campaignId: data.campaign_id,
      bankWebsite: props.bankWebsite || '',
      contactEmail,
    });

    router.push({
      path: '/contact-my-bank',
      query: {
        bankName,
        tone: selectedTone.value,
        bankWebsite: props.bankWebsite,
      },
    });
  } finally {
    loading.value = false;
  }
}
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

/* Custom select styling - removes default HTML select styles */
.custom-select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: none;
}

/* Remove default select arrow and add custom styling */
.custom-select::-ms-expand {
  display: none;
}

/* Style the select options */
.custom-select option {
  background-color: white;
  color: #1e293b;
  padding: 0.5rem;
}

/* Style iframe for captcha */
.captcha-cloudflare iframe {
  width: 100%;
}
</style>
