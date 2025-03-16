import type { BrandByTagQueryQuery } from '#build/gql/default'

export const getRating = ({ commentary }: NonNullable<BrandByTagQueryQuery['brand']>): string => {
  const inheritedRating = commentary?.ratingInherited?.toLocaleLowerCase()
  const isCreditUnion = commentary?.institutionType?.[0]?.name === 'Credit Union'
  const isRatingUnknown = commentary?.rating === 'unknown'

  // for credit unions we want to overwrite a brand's rating to 'good' if 'unknown'
  if (isCreditUnion && isRatingUnknown) {
    return 'good'
  }
  return inheritedRating || ''
}
