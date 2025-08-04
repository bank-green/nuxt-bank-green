<template>
  <div class="min-h-screen flex flex-col bg-[#f9f9f9] text-gray-900">
    <!-- Header -->
    <header class="bg-[#1D2733] text-white p-4 text-xl font-bold">
      Contacting your bank
    </header>

    <!-- Content -->
    <main class="flex-grow p-6 max-w-3xl mx-auto space-y-4">
      <div class="bg-blue-100 text-black p-4 rounded-lg">
        You may copy the email message and send it using your personal email account.
      </div>

      <div class="bg-white p-4 rounded-lg shadow space-y-4">
        <h2 class="text-lg font-semibold">
          {{ bank }}
        </h2>

        <textarea
          readonly
          :value="emailBody"
          class="w-full h-60 p-4 border rounded-lg"
        />

        <a
          :href="mailtoLink"
          target="_blank"
        >
          <button class="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
            Open In Email Client
          </button>
        </a>
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-[#1D2733] text-white text-center py-4 text-sm">
      © 2025 Bank.Green
    </footer>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const bank = route.query.bank || 'Your Bank'
const tone = route.query.tone || 'Polite 😊'

const bodyMessage = computed(() => {
  switch (tone) {
    case 'Polite 😊':
      return `As a valued customer, I urge ${bank} to prioritize investments in sustainable initiatives such as renewable energy and eco-friendly businesses. I would love to learn more about your sustainability efforts and future plans.`
    case 'Neutral 😐':
      return `${bank} has an opportunity to improve its climate impact. I hope you’ll consider shifting away from fossil fuel financing and support more green initiatives.`
    case 'Firm 😠':
      return `I am disappointed by ${bank}'s involvement in fossil fuel investments. I urge immediate action to stop funding climate-damaging projects and instead support sustainable banking.`
    default:
      return ''
  }
})

const emailBody = computed(() => `Please remember to blind copy us in the email!
BCC: begreener@bank.green

Dear ${bank},

${bodyMessage.value}

Thank you for your time. I look forward to your response.

Best regards,
[Your Name]`)

const mailtoLink = computed(() =>
  `mailto:?bcc=begreener@bank.green&subject=${encodeURIComponent(
    `A message to ${bank} about greener banking`,
  )}&body=${encodeURIComponent(
    emailBody.value,
  )}`,
)
</script>
