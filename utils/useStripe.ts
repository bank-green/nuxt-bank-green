import {
  Appearance,
  Stripe,
  StripeElements,
  loadStripe
} from '@stripe/stripe-js'
import { CreatePaymentIntentResponse } from './interfaces/donate'

export default function useStripe (
  publishableKey: string,
  elementId: string,
  authenticationElementId?: string
) {
  const isStripeLoaded = ref(false)
  const stripeMessages = ref<string[]>([])

  let stripe: Stripe | null = null
  let elements: StripeElements | null = null
  let customerId: string | null = null

  const initOneTimePayment = async (amount: number) => {
    isStripeLoaded.value = false
    const stripePaymentIntent: CreatePaymentIntentResponse = await $fetch(
      '/api/create-payment-intent',
      {
        method: 'POST',
        body: {
          amount
        }
      }
    )
    console.info(stripePaymentIntent)
    if (stripePaymentIntent?.clientSecret == null) { return }

    customerId = stripePaymentIntent.customerId

    stripe = await loadStripe(publishableKey)

    if (stripe) {
      const appearance: Appearance = {
        theme: 'flat'
      }
      elements = stripe.elements({
        clientSecret: stripePaymentIntent.clientSecret,
        appearance
      })
      const paymentElement = elements.create('payment')
      paymentElement.mount(`#${elementId}`)
      if (authenticationElementId) {
        const linkAuthenticationElement = elements.create('linkAuthentication')
        linkAuthenticationElement.mount(`#${authenticationElementId}`)
      }
    }
    isStripeLoaded.value = true
  }

  const handleSubmit = async (consent: boolean, email?: string) => {
    if (!isStripeLoaded.value || stripe == null || elements == null) {
      return
    }

    // only update customer if user entered email address
    if (email && email?.length > 0) {
      await $fetch(
        '/api/update-stripe-customer',
        {
          method: 'POST',
          body: {
            email,
            id: customerId,
            consent
          }
        }
      )
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/donate-complete`
      }
    })

    if (error.type === 'card_error' || error.type === 'validation_error') {
      stripeMessages.value.push(error.message as string)
    } else {
      stripeMessages.value.push('An unexpected error occured.')
    }
  }

  return {
    isStripeLoaded,
    stripeMessages,
    initOneTimePayment,
    handleSubmit
  }
}
