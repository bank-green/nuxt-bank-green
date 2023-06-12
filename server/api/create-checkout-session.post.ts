import Stripe from 'stripe';
import { CreateSubscriptionResponse } from '~~/utils/interfaces/donate';

const domainURL = useRuntimeConfig().public.DOMAIN_URL as string;
const stripeSecretKey = useRuntimeConfig().STRIPE_SECRET_KEY as string;
const priceId1 = useRuntimeConfig().STRIPE_SUBSCRIPTION_PRICE_1 as string;
const priceId2 = useRuntimeConfig().STRIPE_SUBSCRIPTION_PRICE_2 as string;
const priceId3 = useRuntimeConfig().STRIPE_SUBSCRIPTION_PRICE_3 as string;
const priceId4 = useRuntimeConfig().STRIPE_SUBSCRIPTION_PRICE_4 as string;
const priceId5 = useRuntimeConfig().STRIPE_SUBSCRIPTION_PRICE_5 as string;
const priceId6 = useRuntimeConfig().STRIPE_SUBSCRIPTION_PRICE_6 as string;

const stripe = new Stripe(stripeSecretKey, {
    apiVersion: "2022-11-15",
});

const getPriceId = (amount: number) : string | null =>  {
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
}

export default defineEventHandler(async (event) : Promise<CreateSubscriptionResponse | void> => {  
    try {
        const body = await readBody(event);
        const priceId = getPriceId(body.amount);
        if (priceId == null)
            throw new Error("Subscription not found");    
        const session = await stripe.checkout.sessions.create({
            mode: "subscription",
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            // ?session_id={CHECKOUT_SESSION_ID} means the redirect will have the session ID set as a query param
            success_url: `${domainURL}/donate-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${domainURL}/donate-canceled`,
            // automatic_tax: { enabled: true }
        });

        return {
            success: true,
            redirectURL: session.url,
            error: null,
        }

        // return sendRedirect(event, session.url || '', 303);
    } catch (e) {
        let _e:Error = e;
        setResponseStatus(400);
        return {
            success: false,
            redirectURL: null,
            error: _e.message,
        };
    }
    
});
