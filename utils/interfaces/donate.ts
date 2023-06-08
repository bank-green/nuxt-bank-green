export interface DonationRequestBody {
    amount: number;
}

export interface CreatePaymentIntentResponse {
    success: boolean;
    clientSecret: string | null;
    error: string | null;
}