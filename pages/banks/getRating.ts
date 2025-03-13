import type { BrandByTagQueryQuery } from '#build/gql/default'

export const getRating = (b: BrandByTagQueryQuery['brand']): string => {
  // for credit unions we want to overwrite a brand's rating to 'good' if 'unknown'
  // but after the text copy has been calculated
  const inheritedRating = b?.commentary?.ratingInherited?.toLocaleLowerCase()
  const isCreditUnion = b?.commentary?.institutionType?.[0]?.name === 'Credit Union'
  const isRatingUnknown = b?.commentary?.rating === 'unknown'

  if (isCreditUnion && isRatingUnknown) {
    return 'good'
  }
  return inheritedRating || ''
}
