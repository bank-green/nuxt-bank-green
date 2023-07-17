import Stripe from "stripe";
import ofetch from "ofetch";
import { CreateSubscriptionResponse } from "~~/utils/interfaces/donate";

const domainURL = useRuntimeConfig().public.DOMAIN_URL as string;
const stripeSecretKey = useRuntimeConfig().STRIPE_SECRET_KEY as string;
const priceId1 = useRuntimeConfig().STRIPE_SUBSCRIPTION_PRICE_1 as string;
const priceId2 = useRuntimeConfig().STRIPE_SUBSCRIPTION_PRICE_2 as string;
const priceId3 = useRuntimeConfig().STRIPE_SUBSCRIPTION_PRICE_3 as string;
const priceId4 = useRuntimeConfig().STRIPE_SUBSCRIPTION_PRICE_4 as string;
const priceId5 = useRuntimeConfig().STRIPE_SUBSCRIPTION_PRICE_5 as string;
const priceId6 = useRuntimeConfig().STRIPE_SUBSCRIPTION_PRICE_6 as string;

const getPriceId = (amount: number): string | null => {
  switch (amount) {
    case 25:
      return priceId1;
    case 50:
      return priceId2;
    case 100:
      return priceId3;
    case 200:
      return priceId4;
    case 500:
      return priceId5;
    case 1000:
      return priceId6;
    default:
      return null;
  }
};

export default defineEventHandler(
  async (event): Promise<CreateSubscriptionResponse | void> => {
    try {
      let body = await readBody(event);
      if (body instanceof Uint8Array) {
        body = JSON.parse(new TextDecoder().decode(body));
      }

      const priceId = getPriceId(body.amount);
      if (priceId == null) throw new Error("Subscription not found");

      // we have to build the request ourself because the Stripe SDK does not play well with Cloudflare
      const reqBody = {
        mode: "subscription",
        "line_items[0][price]": priceId,
        "line_items[0][quantity]": '1',
        success_url: `${domainURL}/donate-complete?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${domainURL}/donate-cancelled`
      };



      const res = await $fetch(`https://api.stripe.com/v1/checkout/sessions`, {
        method: "POST",
        headers: {
          authorization:
            `Basic ${Buffer.from(stripeSecretKey + ':').toString('base64') }`,
        },
        body: new URLSearchParams(reqBody),
        parseResponse: JSON.parse,
      });

      return {
        success: true,
        redirectURL: res.url,
        error: null,
      };

      // return sendRedirect(event, session.url || '', 303);
    } catch (e) {
      let _e: Error = e;
      console.error(e);
      setResponseStatus(400);
      return {
        success: false,
        redirectURL: null,
        error: _e.message,
      };
    }
  }
);
