<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-100 p-4 sm:p-6">
    <div
      class="flex flex-col md:flex-row w-full max-w-5xl rounded-xl bg-[#1D2733] text-white shadow-lg overflow-hidden"
    >
      <!-- Left Panel -->
      <div class="w-full md:w-1/2 p-6 sm:p-8 space-y-6">
        <h1 class="text-3xl font-bold leading-snug">
          Contact your bank to be <br />
          greener
        </h1>
        <div class="bg-[#DDE4F0] text-black rounded-xl p-4">
          <h2 class="font-semibold">Help green your bank!</h2>
          <p class="text-sm mt-2">
            Banks play a crucial role in financing a sustainable future by investing in greener projects.
            Use our form to contact your bank and encourage them to adopt greener policies.
          </p>
        </div>
      </div>

      <!-- Right Panel -->
      <div class="w-full md:w-1/2 bg-[#1D2733] text-sm p-6 sm:p-8 space-y-6">
        <!-- Bank Selection -->
        <div>
          <label class="block mb-2">My bank is</label>
          <select v-model="selectedBank" class="w-full rounded-lg p-2 text-black">
            <option>Barclays Bank</option>
            <option>HSBC</option>
            <option>NatWest</option>
          </select>
        </div>

        <!-- Tone Selection -->
        <div>
          <label class="block mb-2">Tone of message to your bank</label>
          <select v-model="tone" class="w-full rounded-lg p-2 text-black">
            <option>Polite 😊</option>
            <option>Neutral 😐</option>
            <option>Firm 😠</option>
          </select>
        </div>

        <!-- Privacy Policy -->
        <div class="flex items-start space-x-2">
          <input type="checkbox" v-model="agreed" class="mt-1" />
          <span>
            I have read and understood Bank.Green's
            <a href="#" class="text-green-400 underline">privacy policy</a>
          </span>
        </div>

        <!-- Verification & Button -->
        <div class="space-y-4">
          <div
            class="bg-white text-black p-3 rounded-lg flex items-center justify-between"
          >
            <span>✔ Verifying...</span>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Cloudflare_Logo.svg/2560px-Cloudflare_Logo.svg.png"
              class="h-6 object-contain"
              alt="Cloudflare logo"
            />
          </div>
          <a
            class="w-full bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
            href="/emailpreview"
          >
            Generate Email Message
          </a>
          <p class="text-xs text-center text-gray-400">(Opens in new Window)</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedBank: 'Barclays Bank',
      tone: 'Polite 😊',
      agreed: false,
    }
  },
}
</script>
