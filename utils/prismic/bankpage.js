function getBankRating(bankDetails) {
    const hasDetails = bankDetails && bankDetails.rating;
    if (!hasDetails)
        return undefined;
    const rating = !!(bankDetails && bankDetails.rating) ? bankDetails.rating : "";

    switch (rating) {
        case "worst":
            return "worstbank";
        case "bad":
            return "badbank";
        case "ok":
            return "okbank";
        case "great":
            return "greatbank";
        case "unknown":
        default:
            return "unknownbank";
    }
}

function isValidResponse(response) {
    return !response?.error?.value && response?.data?.value;
}

export async function useBankPage(bankTag, bankDetails) {
    const { client } = usePrismic();
    const type = "bankpage";
    const rating = getBankRating(unref(bankDetails));
    const bankPage = ref(null);

    try {
        const [ customBankResponse, bankRatingResponse ] = await Promise.all([
            useAsyncData(bankTag, () => client.getByUID(type, bankTag)),
            useAsyncData(rating, () => client.getByUID(type, rating)),
        ]);

        if (isValidResponse(customBankResponse)) {
            bankPage.value = customBankResponse.data.value;
        } else if (isValidResponse(bankRatingResponse)) {
            bankPage.value = bankRatingResponse.data.value;
        }
    }
    catch (e) {
        console.log(e);
    }
    return { bankPage };
}