import Stripe from 'stripe';

const stripeSecretKey = useRuntimeConfig().STRIPE_SECRET_KEY as string;

const stripe = new Stripe(stripeSecretKey, {
    apiVersion: "2022-11-15",
});

const DEFAULT_CURRENCY = "usd";

const calculateOrderAmount = (items: any) => 300;

export default defineEventHandler(async (event) => {  
    try {
        const { items } = await readBody(event);

        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
            amount: calculateOrderAmount(items),
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
        return {
            success: false,
            clientSecret: null,
            error: _e.message,
        }
    }
    
  })