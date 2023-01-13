<template>
    <div
        class="flex items-center justify-center bg-primary-dark rounded-2xl px-6 py-12 text-gray-50 text-center font-semibold">
        <div class="max-w-xl">
            <p v-if="title" class="text-xl md:text-3xl mb-6">{{ title }}</p>
            <p v-else class="text-xl md:text-3xl mb-6">
                Take action with Bank.Green
            </p>

            <form @submit.prevent.stop="submit" class="flex flex-col justify-center items-center text-left">
                <div class="grid grid-cols-2 gap-6">
                    <TextField class="col-span-2 md:col-span-1" v-model="firstName" name="firstName" type="text"
                        placeholder="First name, so we can say hi" :dark="true" />
                    <TextField class="col-span-2 md:col-span-1" v-model="email" name="email" type="email"
                        placeholder="Your email address" :warning="warningsMap['email']" :dark="true" />
                    <CheckboxSection class="col-span-2" v-model="isAgreeMarketing" name="isAgreeMarketing"
                        :warning="warningsMap['isAgreeMarketing']" :dark="true">
                        I wish to receive more information via email from Bank.Green.</CheckboxSection>
                    <CheckboxSection class="col-span-2" v-model="isAgreeTerms" name="isAgreeTerms" :dark="true"
                        :warning="warningsMap['isAgreeTerms']">
                        I have read and understood Bank.Green’s <NuxtLink to="/privacy" class="link">privacy policy
                        </NuxtLink>.
                    </CheckboxSection>
                </div>
                <button type="submit" class="button-green w-full md:w-72 mt-6 md:text-lg flex justify-center" :class="{
                    'pointer-events-none opacity-75': busy,
                }">
                    <span v-if="!busy">
                        Join the Money Movement
                    </span>
                    <span v-else>
                        <svg width="32" height="32" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 561 553"
                            style="animation: ring 2s linear infinite;">
                            <path d="M478 0A481 481 0 0 0 0 485v76h75c264 0 478-217 478-485V0h-75z" fill="#6C9039" />
                        </svg>
                    </span>
                </button>
            </form>
        </div>
    </div>
</template>

<script>
import CheckboxSection from '@/components/forms/CheckboxSection.vue'
import TextField from '@/components/forms/TextField.vue'

export default {
    emits: ['success'],
    props: {
        tag: { type: String, default: 'signupbox' },
        successRedirectURL: { type: String, default: '/thanks' },
        details: Object,
        title: String,
        prefill: { type: Object, default: () => ({}) },
    },
    components: {
        CheckboxSection,
        TextField,
    },
    setup(props) {
        const details = toRef(props, 'details')
        const extra = computed(() => {
            if (!details.value) {
                return {}
            }
            return {
                bank: details.value.tag,
                bankDisplayName: details.value.name,
                rating: details.value.rating,
                country: details.value.country,
                dirty_deal_1: details.value['dirty deal 1'],
                dirty_deal_2: details.value['dirty deal 2'],
            }
        })

        const {
            firstName,
            email,
            isAgreeTerms,
            isAgreeMarketing,
            warningsMap,
            send,
            busy,
        } = useContactForm(
            props.tag,
            ['email', 'isAgreeTerms', 'isAgreeMarketing'],
            extra,
            toRef(props, 'prefill')
        )

        return {
            firstName,
            email,
            isAgreeTerms,
            isAgreeMarketing,
            warningsMap,
            send,
            busy,
        }
    },
    methods: {
        async submit() {
            if (await this.send()) {
                this.$emit('success')
                this.$router.push(this.successRedirectURL)
            }
        },
    },
}
</script>
