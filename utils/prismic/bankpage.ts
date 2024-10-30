import type { _AsyncData } from 'nuxt/dist/app/composables/asyncData'
import type { BankpageDocument } from 'prismicio-types'

function isValidResponse(response: _AsyncData<BankpageDocument | null, Error | null>) {
  return !response?.error?.value && response?.data?.value
}

export async function useBankPage(
  rating: string,
) {
  const { client } = usePrismic()
  const type = 'bankpage'
  let bankPage = null

  try {
    console.log(rating)
    const [bankRatingResponse] = await Promise.all([
      useAsyncData(() => {
        return client.getByUID(type, rating)
      }),
    ])

    // check if we get responses at all
    if (!isValidResponse(bankRatingResponse)) {
      throw new Error(`could not get bankPage default descriptions: ${JSON.stringify(bankRatingResponse.error)}`)
    }
    bankPage = bankRatingResponse
    return { bankPage: bankPage.data.value }
  } catch (e) {
    console.log(e)
    return { bankPage: null }
  }
}
