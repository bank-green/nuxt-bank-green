import { Appearance, Stripe, StripeElements, loadStripe } from "@stripe/stripe-js";

export default function useStripe(
    publishableKey: string,
    clientSecret: string | undefined,
    elementId: string,
    authenticationElementId?: string,
) {
    const isStripeLoading = ref(false);
    const stripeMessages = ref<string[]>([]);

    let stripe : Stripe | null = null;
    let elements : StripeElements | null = null;

    onMounted(async () => {
        stripe = await loadStripe(publishableKey);

        if (stripe) {
            const appearance : Appearance = {
                theme: 'flat'
            };
            elements = stripe.elements({
                clientSecret,
                appearance,
            });
            const paymentElement = elements.create('payment');
            paymentElement.mount(`#${elementId}`);
            if (authenticationElementId) {
                const linkAuthenticationElement = elements.create("linkAuthentication");
                linkAuthenticationElement.mount(`#${authenticationElementId}`);
            }
            isStripeLoading.value = false;
        }
    });

    const handleSubmit = async () => {
        if (isStripeLoading.value || stripe == null || elements == null) {
            return;
        }

        isStripeLoading.value = true;

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
            return_url: `${window.location.origin}/donate-complete`
            }
        });

        if (error.type === "card_error" || error.type === "validation_error") {
            stripeMessages.value.push(error.message as string);
        } else {
            stripeMessages.value.push("An unexpected error occured.");
        }

        isStripeLoading.value = false;
    }

    return {
        isStripeLoading,
        stripeMessages,
        handleSubmit,
    }
}