export interface ContactFormPrefill {
    firstName: string;
    lastName: string;
    email: string;
    subject: string;
    message: string;
    bank: string;
    isAgreeTerms: boolean;
}

export interface ContactFormWarningsMap {
    email?: string;
    isAgreeTerms?: string;
    isAgreeMarketing?: string;
    bank?: string;
}
