export interface DonationRequestBody {
  amount: number;
}

export interface CreateSubscriptionResponse {
  success: boolean;
  redirectURL: string | null;
  error: string | null;
}

export interface CreatePaymentIntentResponse {
  success: boolean;
  clientSecret: string | null;
  error: string | null;
}
