<template>
  <div
    class="fixed inset-0 flex items-center justify-center z-50"
  >
    <form
      class="modal-overlay flex flex-col items-center bg-slate-200"
      @submit.prevent.stop=" checkAndDisplayPreview"
    >
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
        <p class="text-xl md:text-2xl mb-6 font-semibold whitespace-pre-wrap">
          {{ embrace?.data.form_title || "Share your thoughts" }}
        </p>
        <div @click="$emit('close-modal')">
          <p>CLOSE</p>
        </div>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
        <p class="text-xl md:text-2xl mb-6 font-semibold whitespace-pre-wrap">
          {{ embrace?.data.form_title || "Share your thoughts" }}
        </p>
        <button
          type="submit"
          class="button-green w-full md:w-auto mt-6 flex justify-center"
          :class="{'pointer-events-none opacity-75': busy}"
        >
          <span v-if="!busy"> Cop Text </span>
          <span v-else>
            <svg
              width="32"
              height="32"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 561 553"
              style="animation: ring 2s linear infinite"
            >
              <path
                d="M478 0A481 481 0 0 0 0 485v76h75c264 0 478-217 478-485V0h-75z"
                fill="#6C9039"
              />
            </svg>
          </span>
        </button>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
        <TextField
          v-model="generatedMessage"
          class="col-span-full"
          rows="5"
          name="embraceText"
          type="text"
          :title="embrace?.data.why_embrace_label || 'Why embrace?'"
          :placeholder="embrace?.data.why_embrace_placeholder || 'Answer'"
          dark
        />
      </div>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
        <button
          type="submit"
          class="button-green col-span-2 w-full md:w-auto mt-6 flex justify-center"
          :class="{'pointer-events-none opacity-75': busy}"
        >
          <span v-if="!busy"> Back to From </span>
          <span v-else>
            <svg
              width="32"
              height="32"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 561 553"
              style="animation: ring 2s linear infinite"
            >
              <path
                d="M478 0A481 481 0 0 0 0 485v76h75c264 0 478-217 478-485V0h-75z"
                fill="#6C9039"
              />
            </svg>
          </span>
        </button>

        <button
          type="submit"
          class="button-green col-span-2 w-full md:w-auto mt-6 flex justify-center"
          :class="{'pointer-events-none opacity-75': busy}"
        >
          <span v-if="!busy"> Go to Your Mail App </span>
          <span v-else>
            <svg
              width="32"
              height="32"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 561 553"
              style="animation: ring 2s linear infinite"
            >
              <path
                d="M478 0A481 481 0 0 0 0 485v76h75c264 0 478-217 478-485V0h-75z"
                fill="#6C9039"
              />
            </svg>
          </span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import TextField from '@/components/forms/TextField.vue'

const { client } = usePrismic()

// TODO: pass embracepage as a prop instead of requesting it again
const { data: embrace } = await useAsyncData('embrace', () =>
  client.getSingle('embracepage')
)

/*
const props = defineProps({
successRedirectURL: { type: String, default: '/thanks-pledge' } //  THIS LINE SHOULD CHANGE
})
*/

const generatedMessage = ref(null)

const extras = computed(() => {
  return {
    generatedMessage: generatedMessage.value || ''
  }
})

// TODO: add custom warning for fullName, since this is not builtin to
//       useContactForm

const {
  //  email,
  //  isAgreeTerms,
  //  isAgreeMarketing,
  //  showWarnings,  // may need this to do check prior to popup?
  //  hasWarnings,  // may need this to do check prior to popup?
  //  warningsMap,
  //  send,  // this won't work for this page
  validate,
  busy
} = useContactForm(
  'embrace',
  //  ['email', 'isAgreeTerms', 'bank'],
  extras
)

// const emit = defineEmits(['success'])

// TODO We are not submitting the form, we need to display the popup, and from the
// popup generate a mailto link

function checkAndDisplayPreview () {
  validate()
  if (!extras.value.fullName) {
    fullNameWarning.value = embrace?.value.data.full_name_warning || 'Your name is required'
    return
  }
  fullNameWarning.value = null

// TODO: show preview...
}
/*
async function checkAndSend () {
validate()

    if (!extras.value.reminder) {
    reminderWarning.value = 'Please enter a date.'
    return
    }
    reminderWarning.value = null
if (await send()) {
    emit('success')
    navigateTo(props.successRedirectURL)
}
}
*/
</script>
