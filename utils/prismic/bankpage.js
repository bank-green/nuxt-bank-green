function getBankPageId(bankDetails) {
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


export async function useBankPage(bankDetails) {
    const { client } = usePrismic();

    const bankPage = ref(null);

    try {
        const type = "bankpage";
        const id = getBankPageId(unref(bankDetails));
        if (typeof (id) === "string") {
            const { data } = await useAsyncData(id, () =>
                client.getByUID(type, id)
            );
            bankPage.value = data.value;
        }
    }
    catch (e) {
        console.log(e);
    }
    return { bankPage };
}