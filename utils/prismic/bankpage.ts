import { type _AsyncData } from 'nuxt/dist/app/composables/asyncData'
import isEmptyPrismicField from './isEmptyPrismicField'
import { BankpageDocument } from 'prismicio-types'

function getBankRating (bankDetails: any) {
  const hasDetails = bankDetails && bankDetails.rating
  if (!hasDetails) { return undefined }
  const rating = bankDetails && bankDetails.rating ? bankDetails.rating : ''

  switch (rating) {
    case 'worst':
      return 'worstbank'
    case 'bad':
      return 'badbank'
    case 'ok':
      return 'okbank'
    case 'good':
      return 'goodbank'
    case 'great':
      return 'greatbank'
    case 'unknown':
    default:
      return 'unknownbank'
  }
}

function isValidResponse (response : _AsyncData<BankpageDocument | null, Error | null>) {
  return !response?.error?.value && response?.data?.value
}

export async function useBankPage (
  bankTag: string,
  bankDetails: Ref<any>
) {
  const { client } = usePrismic()
  const type = 'bankpage'
  const rating = getBankRating(unref(bankDetails))
  let bankPage = null

  try {
    const [customBankResponse, bankRatingResponse] = await Promise.all([
      useAsyncData(() => {
        return client.getByUID(type, bankTag)
      }),
      useAsyncData(() => {
        return client.getByUID(type, rating || '')
      })
    ])

    // check if we get responses at all
    if (!isValidResponse(customBankResponse)) {
      if (!isValidResponse(bankRatingResponse)) {
        throw new Error(`could not get bankPage for ${bankTag}: ${JSON.stringify(bankRatingResponse.error)}`)
      }
      bankPage = bankRatingResponse
      return { bankPage: bankPage.data }
    }

    // override default fields if available
    bankPage = bankRatingResponse.data.value
    const custom = customBankResponse.data.value

    if (custom !== null && bankPage !== null) {
      if (!isEmptyPrismicField(custom.data.headline)) { bankPage.data.headline = custom.data.headline }
      if (!isEmptyPrismicField(custom.data.subtitle)) { bankPage.data.subtitle = custom.data.subtitle }
      if (!isEmptyPrismicField(custom.data.description1)) { bankPage.data.description1 = custom.data.description1 }
      if (!isEmptyPrismicField(custom.data.description2)) { bankPage.data.description2 = custom.data.description2 }
      if (!isEmptyPrismicField(custom.data.description3)) { bankPage.data.description3 = custom.data.description3 }
      if (!isEmptyPrismicField(custom.data.seo_title)) { bankPage.data.seo_title = custom.data.seo_title }
      if (!isEmptyPrismicField(custom.data.seo_description)) { bankPage.data.seo_description = custom.data.seo_description }
    }

    return { bankPage }
  } catch (e) {
    console.log(e)
    return { bankPage: null }
  }
}
