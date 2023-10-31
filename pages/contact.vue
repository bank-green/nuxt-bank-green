  <template>
  <div class="page">
    <div class="bg-gradient-to-b from-sushi-50 to-sushi-100">
      <div class="page-fade-in contain max-w-3xl pt-28 pb-8">
        <PrismicRichText class="text-gray-600 mb-12 whitespace-pre-line prose" :field="contact.data.description" />

        <form class="flex flex-col justify-center items-center" @submit.prevent.stop="onSend">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            <TextField
              v-model="firstName"
              class="col-span-1"
              name="firstName"
              type="text"
              :title="'Your first name (optional)'"
              :placeholder="'First name, so we can say hi'"
            />
            <TextField
              v-model="email"
              class="col-span-1"
              type="email"
              name="email"
              :title="'Your email address'"
              :placeholder="'Your email address'"
              :warning="warningsMap['email']"
            />
            <TextField
              v-model="subject"
              class="col-span-1 md:col-span-2"
              name="subject"
              :title="'Subject'"
              :placeholder="'Subject'"
              :warning="warningsMap['subject']"
              :required="true"
            />
            <TextField
              v-model="message"
              class="md:col-span-2"
              rows="3"
              name="message"
              :title="'Your message'"
              :placeholder="'Your message'"
              :warning="warningsMap['message']"
              :required="true"
            />
            <CheckboxSection v-model="isAgreeMarketing" class="md:col-span-2" name="isAgreeMarketing">
              I wish to receive more information via email from
              Bank.Green.
            </CheckboxSection>
            <CheckboxSection
              v-model="isAgreeTerms"
              class="md:col-span-2"
              name="isAgreeTerms"
              :warning="warningsMap['isAgreeTerms']"
            >
              I have read and understood Bank.Green’s
              <NuxtLink to="/privacy" class="link">
                privacy policy
              </NuxtLink>.
            </CheckboxSection>
          </div>
          <button
            type="submit"
            class="button-green mt-6 md:w-48 flex justify-center"
            :class="{
              'pointer-events-none opacity-75': busy,
            }"
          >
            <span v-if="!busy"> Send message </span>
            <span v-else>
              <svg
                width="32"
                height="32"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 561 553"
                style="animation: ring 2s linear infinite"
              >
                <path d="M478 0A481 481 0 0 0 0 485v76h75c264 0 478-217 478-485V0h-75z" fill="#6C9039" />
              </svg>
            </span>
          </button>
        </form>
      </div>
      <Swoosh direction="up" />
      <Donation />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CheckboxSection from '../components/forms/CheckboxSection.vue'
import TextField from '../components/forms/TextField.vue'

import Swoosh from '@/components/Swoosh.vue'

const p = usePrismic()
const { data: contact } = await useAsyncData('contact', () =>
  p.client.getSingle('contactpage')
)
usePrismicSEO(contact.value.data)

const extras = ref({ isAgreeMarketing: false })

const {
  firstName,
  email,
  subject,
  message,
  isAgreeTerms,
  isAgreeMarketing,
  warningsMap,
  send,
  busy
} = useContactForm('contact page form', ['email', 'isAgreeTerms'], extras) // tag used specifically for GTM

async function onSend () {
  if (await send()) {
    navigateTo('/thanks-contact')
  }
}
</script>
