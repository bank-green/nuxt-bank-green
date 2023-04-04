import { useGtm } from '@gtm-support/vue-gtm'

export default function useContactForm(
    tag = 'unknown',
    required = ['email', 'isAgreeTerms'],
    extra,
    prefill = ref({})
) {

    const firstName = ref(prefill.value.firstName || '')
    const lastName = ref(prefill.value.lastName || '')
    const email = ref(prefill.value.email || '')
    const subject = ref(prefill.value.subject || '')
    const message = ref(prefill.value.message || '')
    const bank = ref(prefill.value.bank || '')
    const isAgreeTerms = ref(prefill.value.isAgreeTerms || false)
    const isAgreeMarketing = ref(prefill.value.isAgreeTerms || false)
    const busy = ref(false)
    const isSent = useCookie(`contact.${tag}.sent`, { default: () => false })
    const showWarnings = ref(false)

    const warningsMap = computed(() => {
        if (!showWarnings.value) {
            return {}
        }
        const warningsMap = {}
        if (!email.value && required.includes('email')) {
            warningsMap['email'] = 'Your email is reauired.'
        }
        if (!isAgreeTerms.value && required.includes('isAgreeTerms')) {
            warningsMap['isAgreeTerms'] = 'You need to agree to the terms.'
        }
        if (!isAgreeMarketing.value && required.includes('isAgreeMarketing')) {
            warningsMap['isAgreeMarketing'] = 'You need to agree to receive marketing from Bank.Green'
        }
        if (!bank.value && required.includes('bank')) {
            warningsMap['bank'] = 'Please tell us the name of your bank'
        }
        return warningsMap
    })

    const hasWarnings = computed(() => {
        return Object.keys(warningsMap.value).length > 0
    })

    const send = async () => {
        showWarnings.value = true
        if (hasWarnings.value) {
            busy.value = false
            return false
        }

        if (busy.value) {
            return // already busy, prevent double requests
        }
        busy.value = true
        const body = {
            firstName: capitalizeString(firstName.value),
            lastName: capitalizeString(lastName.value),
            email: email.value,
            subject: subject.value,
            message: message.value,
            tag,
            bank: bank.value,
            isAgreeMarketing: isAgreeMarketing.value,
            ...(extra ? extra.value : {}),
        }

        await useFetch(`/api/contact`, {
            method: 'POST',
            body: JSON.stringify(body)
        })

        isSent.value = true

        const allowCookies = useCookie('bg.allowcookies', { default: () => false })
        if (allowCookies.value) {
            let gtmEvent = 'emailform'
            if (tag === 'contact page form') {
                gtmEvent = 'contactpage'
            }
            const gtm = useGtm()
            gtm.enable(true)
            gtm.trackEvent({ event: gtmEvent })
        }

        setTimeout(() => {
            // clear after some ms so that the view has been updated / we have paginated away
            // this is a cheap fix but very effective!
            busy.value = false
        }, 100)

        return true
    }

    return {
        firstName,
        lastName,
        email,
        subject,
        message,
        bank,
        isAgreeTerms,
        isAgreeMarketing,
        isSent,
        showWarnings,
        warningsMap,
        hasWarnings,
        send,
        busy,
    }
}
