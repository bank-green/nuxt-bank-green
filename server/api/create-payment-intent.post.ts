import { CreatePaymentIntentResponse } from '~~/utils/interfaces/donate'

const stripeSecretKey = useRuntimeConfig().STRIPE_SECRET_KEY as string

// https://stripe.com/docs/currencies#presentment-currencies
const DEFAULT_CURRENCY = 'USD'
// https://stripe.com/docs/currencies#zero-decimal
const DEFAULT_MULTIPLIER = 100

const isValidAmount = (amount: number) =>
  [25, 50, 100, 200, 500, 1000].includes(amount)

export default defineEventHandler(
  async (event): Promise<CreatePaymentIntentResponse> => {
    try {
      let body = await readBody(event)
      if (body instanceof Uint8Array) {
        body = JSON.parse(new TextDecoder().decode(body))
      }

      if (!isValidAmount(body.amount)) {
        return {
          success: false,
          clientSecret: null,
          error: 'Invalid amount'
        }
      }

      // we have to build the request ourself because the Stripe SDK does not play well with Cloudflare
      const reqBody = {
        amount: `${body.amount * DEFAULT_MULTIPLIER}`,
        currency: DEFAULT_CURRENCY,
        'automatic_payment_methods[enabled]': 'true'
      }

      const res = await $fetch('https://api.stripe.com/v1/payment_intents', {
        method: 'POST',
        headers: {
          authorization: `Basic ${Buffer.from(stripeSecretKey + ':').toString(
            'base64'
          )}`
        },
        body: new URLSearchParams(reqBody),
        parseResponse: JSON.parse
      })

      return {
        success: true,
        clientSecret: res.client_secret,
        error: null
      }
    } catch (e) {
      const _e: Error = e
      setResponseStatus(400)
      return {
        success: false,
        clientSecret: null,
        error: _e.message
      }
    }
  }
)
