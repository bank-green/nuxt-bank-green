import { UpdateStripeCustomerResponse } from '~~/utils/interfaces/donate'

const stripeSecretKey = useRuntimeConfig().STRIPE_SECRET_KEY as string

export default defineEventHandler(
  async (event): Promise<UpdateStripeCustomerResponse> => {
    try {
      let body = await readBody(event)
      if (body instanceof Uint8Array) {
        body = JSON.parse(new TextDecoder().decode(body))
      }

      const requBody = {
        email: body.email,
        // this is for now the only solution to note in Stripe whether we are allowed to send emails since there is no specific props on customers object for that
        description: `Consent for promotional emails: ${body.consent ? 'Yes' : 'No'}`
      }

      const customer = await $fetch(`https://api.stripe.com/v1/customers/${body.id}`, {
        method: 'POST',
        headers: {
          authorization: `Basic ${Buffer.from(stripeSecretKey + ':').toString(
            'base64'
          )}`
        },
        body: new URLSearchParams(requBody),
        parseResponse: JSON.parse
      })

      return {
        success: true,
        customerId: customer.id,
        error: null
      }
    } catch (e) {
      const _e: Error = e
      setResponseStatus(400)
      return {
        success: false,
        customerId: null,
        error: _e.message
      }
    }
  }
)
