import type { Client } from '@prismicio/client'

export async function useBankPage(
  client: Client,
  rating: string,
) {
  const type = 'bankpage'

  try {
    const { data: bankRatingResponse } = await client.getByUID(type, rating)

    // check if we get responses at all
    if (!bankRatingResponse.value) {
      throw new Error(`could not get bankPage default descriptions: ${JSON.stringify(bankRatingResponse.error)}`)
    }

    return { bankPage: bankRatingResponse.value }
  } catch (e) {
    console.log(e)
    return { bankPage: null }
  }
}
