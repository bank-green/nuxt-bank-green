<template>
  <div
    class="min-h-screen flex items-center justify-center px-4 py-40 bg-gradient-to-b from-sushi-50 to-pistachio-green p-28"
  >
    <div
      class="contain ax-w-5xl rounded-3xl bg-[#22283a] px-8 py-10 md:px-12 md:py-12 text-white grid"
    >
      <!-- w-full max-w-5xl rounded-3xl bg-slate-900/70 border border-white/10 px-6 py-10 md:px-10 md:py-12" -->
      <!-- Header -->
      <header class="mb-8 text-center">
        <h1
          class="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight"
        >
          Contacting your bank
        </h1>
        <div
          class="mx-auto max-w-xl rounded-2xl bg-white/15 px-6 py-4 text-sm md:text-base text-white"
        >
          <p>
            You may copy the email message and send it using your personal email
            account.
          </p>
        </div>
      </header>

      <!-- Card -->
      <div
        class="mx-auto mt-8 w-full max-w-3xl rounded-3xl shadow-lg px-6 py-6 md:px-8 md:py-8 bg-white/5"
      >
        <!-- Bank header -->
        <div class="flex items-center gap-3 mb-4">
          <div
            class="inline-flex h-10 w-10 items-center justify-center bg-white text-slate-900 text-lg font-bold overflow-hidden"
          >
            <ClearbitLogo v-if="bankWebsite" :url="bankWebsite" :size="40" />
            <img v-else src="/img/icons/bank-icon.svg" alt="" class="h-6 w-6" />
          </div>
          <p class="text-sm font-semibold text-white">
            {{ bankName }}
          </p>
        </div>
        <div>
          <p class="text-xs text-white/70">Message to your bank</p>
        </div>
        <!-- Message textarea -->
        <textarea
          readonly
          class="mt-4 w-full h-72 rounded-xl border border-white/30 bg-white/90 p-4 text-sm text-slate-900 leading-relaxed resize-none"
          :value="emailMessage"
        ></textarea>

        <!-- Button -->
        <div class="mt-6 flex justify-center">
          <a
            :href="mailtoLink"
            class="inline-flex w-full max-w-xs items-center justify-center rounded-full bg-lime-400/90 px-8 py-3 text-sm font-semibold text-slate-900 shadow-md transition hover:bg-lime-400"
          >
            Open In Email Client
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useEmbraceStore } from '~/stores/embrace';
import ClearbitLogo from '@/components/icons/ClearbitLogo.vue';

const route = useRoute();
const bankName = (route.query.bankName as string) || 'Your Bank';
const tone = (route.query.tone as string) || 'polite';
const bankWebsite = route.query.bankWebsite as string | undefined;

const store = useEmbraceStore();
const { draft } = storeToRefs(store);

const emailSubject = computed(
  () => draft.value.subject || `Inquiry from ${bankName}`
);

const emailMessage = computed(() => {
  return (
    draft.value.text ||
    `Dear ${bankName},

I am writing to you with a ${tone} tone to discuss some important matters.

Thank you for your attention.

Best regards,
[Your Name]`
  );
});

const emailContactBank = computed(
  () => draft.value.contactEmail || 'bank@green.com'
);

const emailBcc = computed(() => draft.value.bccEmail || 'bank@green.com');

const mailtoLink = computed(
  () =>
    `mailto:${encodeURIComponent(
      emailContactBank.value
    )}?bcc=${encodeURIComponent(emailBcc.value)}&subject=${encodeURIComponent(
      emailSubject.value
    )}&body=${encodeURIComponent(emailMessage.value)}`
);
</script>
