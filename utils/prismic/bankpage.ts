import type { Client } from '@prismicio/client'

export async function useBankPage(
  client: Client,
  rating: string,
) {
  const type = 'bankpage'

  try {
    const { data: bankPage } = await client.getByUID(type, rating)

    // check if we get responses at all
    if (!bankPage) {
      throw new Error(`could not get bankPage default descriptions: ${JSON.stringify(bankPage)}`)
    }

    return bankPage
  } catch (e) {
    console.error(e)
    return null
  }
}
