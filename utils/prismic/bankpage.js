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


export async function useBankPage(bankTag, bankDetails) {
    const { client } = usePrismic();
    const type = "bankpage";
    const bankPage = ref(null);

    try {
        const bankTagResponse = await useAsyncData(bankTag, () =>
            client.getByUID(type, bankTag)
        )
        if (bankTagResponse.data.value) {
            bankPage.value = bankTagResponse.data.value;
        }
        else {
            const rating = getBankRating(unref(bankDetails));
            if (typeof (rating) === "string") {
                const { data } = await useAsyncData(rating, () =>
                    client.getByUID(type, rating)
                );
                bankPage.value = data.value;
            }
        }
    }
    catch (e) {
        console.log(e);
    }
    return { bankPage };
}