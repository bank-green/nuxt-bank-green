import Stripe from 'stripe';
import { CreatePaymentIntentResponse } from '~~/utils/interfaces/donate';

const stripeSecretKey = useRuntimeConfig().STRIPE_SECRET_KEY as string;

const stripe = new Stripe(stripeSecretKey, {
    apiVersion: "2022-11-15",
});

// https://stripe.com/docs/currencies#presentment-currencies
const DEFAULT_CURRENCY = "USD";
// https://stripe.com/docs/currencies#zero-decimal
const DEFAULT_MULTIPLIER = 100;

const isValidAmount = (amount : number) => [25, 50, 100, 200, 500, 1000].includes(amount);

export default defineEventHandler(async (event) : Promise<CreatePaymentIntentResponse> => {  
    try {
        let body = await readBody(event);
        if (body instanceof Uint8Array) {
          body = JSON.parse(new TextDecoder().decode(body));
        }

        if (!isValidAmount(body.amount)) {
            return {
                success: false,
                clientSecret: null,
                error: 'Invalid amount',
            };
        }

        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
            amount: body.amount * DEFAULT_MULTIPLIER,
            currency: DEFAULT_CURRENCY,
            automatic_payment_methods: {
                enabled: true,
            },
        });

        return {
            success: true,
            clientSecret: paymentIntent.client_secret as string,
            error: null,
        };
    } catch (e) {
        let _e:Error = e;
        setResponseStatus(400);
        return {
            success: false,
            clientSecret: null,
            error: _e.message,
        }
    }
    
  })