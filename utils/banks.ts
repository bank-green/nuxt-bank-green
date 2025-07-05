import * as prismicH from '@prismicio/helpers'
import type { Client } from '@prismicio/client'

import { get } from './backend'

export async function getCountry() {
  const cachedCountry = useCookie('bg.country.suggested', {
    default: () => '',
  })

  if (!cachedCountry.value) {
    const res = await get('/getCountry')
    if (res.country) {
      cachedCountry.value = res.country
    }
  }
  return cachedCountry
}

type DefaultFields = {
  rating?: string
  headline: string
  subtitle: string
  description1: string
  description2: string
  description3: string
  description4: string
}

export async function getDefaultFields(
  prismicClient: Client,
  rating: string,
  bankname: string = 'this bank',
  institutionType: string,
): Promise<DefaultFields> {
  const queryKey = rating === 'unknown'
    ? 'unknownbank-' + institutionType.toLowerCase().replace(/\s/g, '')
    : rating + 'bank'

  try {
    const response = await prismicClient.getByUID('bankpage', queryKey)
    const prismicDefaultFields = response?.data

    return {
      headline: prismicH.asHTML(prismicDefaultFields?.headline) || '',
      subtitle: prismicH.asHTML(prismicDefaultFields?.subtitle) || '',
      description1: prismicH.asHTML(prismicDefaultFields?.description1) || '',
      description2: prismicH.asHTML(prismicDefaultFields?.description2) || '',
      description3: prismicH.asHTML(prismicDefaultFields?.description3) || '',
      description4: prismicH.asHTML(prismicDefaultFields?.description4) || '',
    }
  } catch (err) {
    console.warn(`⚠️ Could not fetch defaultFields for queryKey "${queryKey}":`, err)

    return {
      rating: 'unknown',
      headline: `<p>Sorry, we don't know enough about ${bankname} yet.</p>`,
      subtitle: '',
      description1: `<p>Unfortunately, we don’t yet have enough information on ${bankname} to know what it’s funding. What we do know however, is that contacting ${bankname} to ask them yourself will send a powerful message – banks will have no choice but to reassess socially irresponsible funding activities if they realize their customers are concerned. To take positive action, keep on scrolling…</p>`,
      description2: `<p>Bank.Green was founded on the belief that banks have had an easy time from their customers for too long. Mass movements will pull us out of the climate crisis – and they’ll pull ${bankname} out, too.</p>`,
      description3: '',
      description4: '',
    }
  }
}
