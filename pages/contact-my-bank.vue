<template>
  <div
    class="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-6"
  >
    <h1 class="text-4xl font-bold text-white mb-4">Contacting your bank</h1>
    <p class="text-gray-300 mb-8 text-center max-w-xl">
      You may copy the email message and send it using your personal email
      account.
    </p>
    <div
      class="bg-white rounded-lg shadow-lg max-w-xl w-full p-6 flex flex-col items-center"
    >
      <div class="mb-4 flex flex-col items-center">
        <div
          class="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center mb-2"
        >
          <!-- Placeholder for bank logo -->
          <span class="text-gray-600 font-semibold text-xl">Logo</span>
        </div>
        <h2 class="text-2xl font-semibold mb-1">{{ bankName }}</h2>
      </div>
      <p class="text-sm text-gray-700 mb-4 text-center">
        Please remember to blind copy us in the email!
        <br />
        <span class="font-mono">BCC: begreener@bank.green</span>
      </p>
      <textarea
        readonly
        class="w-full h-48 p-3 border border-gray-300 rounded mb-6 resize-none text-gray-900"
        :value="emailMessage"
      ></textarea>
      <a
        :href="mailtoLink"
        class="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded transition-colors duration-300"
      >
        Open in Email Client
      </a>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();
const bankName = route.query.bankName || 'Your Bank';
const tone = route.query.tone || 'formal';

const emailSubject = computed(() => `Inquiry from ${bankName}`);
const emailMessage = computed(() => {
  return `Dear ${bankName},

I am writing to you with a ${tone} tone to discuss some important matters.

Thank you for your attention.

Best regards,
[Your Name]`;
});

const mailtoLink = computed(() => {
  const subject = encodeURIComponent(emailSubject.value);
  const body = encodeURIComponent(emailMessage.value);
  return `mailto:?subject=${subject}&body=${body}`;
});
</script>
