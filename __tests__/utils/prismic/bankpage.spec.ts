// @vitest-environment nuxt

// import { RichTextNodeType } from '@prismicio/types'
import type { RTTextNode, RichTextField } from '@prismicio/types'
import { RichTextNodeType } from '@prismicio/types'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { useBankPage } from '~/utils/prismic/bankpage'

const mockedGetByUID = vi.fn()
const spiedClient = {
  getByUID: mockedGetByUID,
}

function mockRichTextField(content?: string | null): RichTextField {
  if (content) {
    return [
      {
        type: RichTextNodeType.heading1,
        spans: [],
        text: content,
      },
    ]
  }
  return []
}

interface IMockBankPageData {
  headline?: string | null
  subtitle?: string | null
  description1?: string | null
  description2?: string | null
  description3?: string | null
  seo_title?: string | null
  seo_description?: string | null
}

function mockBankPageData(mockData: IMockBankPageData) {
  return ref({
    headline: mockRichTextField(mockData.headline),
    subtitle: mockRichTextField(mockData.subtitle),
    description1: mockRichTextField(mockData.description1),
    description2: mockRichTextField(mockData.description2),
    description3: mockRichTextField(mockData.description3),
    seo_title: mockData.seo_title,
    seo_description: mockData.seo_description,
  })
}

vi.mock('@prismicio/vue', () => {
  const usePrismic = () => ({
    client: spiedClient,
  })
  return { usePrismic }
})

describe('useBankPage', () => {
  const invalidBankDetails = ref(null)
  const invalidResponse = {
    error: {
      value: 'Has error',
    },
    data: null,
  }
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should call getByUID twice', async () => {
    await useBankPage('invalid bank tag', invalidBankDetails)
    expect(mockedGetByUID).toHaveBeenCalledTimes(2)
  })

  it('should return null if bank tag is invalid', async () => {
    const { bankPage } = await useBankPage('invalid bank tag', invalidBankDetails)
    expect(bankPage).toBe(null)
  })

  it('should return null if getByUID return invalid response', async () => {
    mockedGetByUID.mockResolvedValue(invalidResponse)
    const { bankPage } = await useBankPage('invalid bank tag', invalidBankDetails)
    expect(bankPage).toBe(null)
  })

  it('should not return null if getByUID succeeds', async () => {
    mockedGetByUID
      .mockResolvedValue({
        error: null,
        data: mockBankPageData({ headline: 'Sample headline' }),
      })
    const { bankPage } = await useBankPage('invalid bank tag', invalidBankDetails)
    expect(bankPage).not.toBe(null)
  })

  // TODO: fix this failed test
  // it('should return bankRatingResponse if customBankResponse is invalid', async () => {
  //   const ratingHeadline = 'rating headline'
  //   mockedGetByUID
  //     .mockResolvedValueOnce(invalidResponse)
  //     .mockResolvedValueOnce({
  //       error: null,
  //       data: mockBankPageData(ratingHeadline)
  //     })
  //   const { bankPage } = await useBankPage('invalid bank tag', invalidBankDetails)
  //   expect(bankPage).not.toBe(null)
  //   expect(bankPage).toHaveProperty('data.headline')
  //   const headline = bankPage?.data.headline
  //   expect(headline).not.toBeUndefined()
  //   expect(headline).toHaveLength(1)
  //   if (headline !== undefined) {
  //     expect(headline[0]).toHaveProperty('text')
  //     if (headline[0] !== undefined) {
  //       expect((headline[0] as RTTextNode).text).toBe(ratingHeadline)
  //     }
  //   }
  // })

  it("should return custom bank's headline if both responses contain headline", async () => {
    const ratingHeadline = 'rating headline'
    const customBankHeadline = 'custom bank headline'
    mockedGetByUID
      .mockResolvedValueOnce({
        error: null,
        data: mockBankPageData({ headline: customBankHeadline }),
      })
      .mockResolvedValueOnce({
        error: null,
        data: mockBankPageData({ headline: ratingHeadline }),
      })
    const { bankPage } = await useBankPage('invalid bank tag', invalidBankDetails)
    expect(bankPage).not.toBe(null)
    expect(bankPage).toHaveProperty('data.headline')
    const headline = bankPage?.data.headline
    expect(headline).not.toBeUndefined()
    expect(headline).toHaveLength(1)
    if (headline !== undefined) {
      expect(headline[0]).toHaveProperty('text')
      if (headline[0] !== undefined) {
        expect((headline[0] as RTTextNode).text).toBe(customBankHeadline)
      }
    }
  })

  it("should return custom bank's description1 if both responses contain description1", async () => {
    const ratingDescription1 = 'rating description1'
    const customDescription1 = 'custom bank description1'
    mockedGetByUID
      .mockResolvedValueOnce({
        error: null,
        data: mockBankPageData({ description1: customDescription1 }),
      })
      .mockResolvedValueOnce({
        error: null,
        data: mockBankPageData({ description1: ratingDescription1 }),
      })
    const { bankPage } = await useBankPage('invalid bank tag', invalidBankDetails)
    expect(bankPage).not.toBe(null)
    expect(bankPage).toHaveProperty('data.description1')
    const description1 = bankPage?.data.description1
    expect(description1).not.toBeUndefined()
    expect(description1).toHaveLength(1)
    if (description1 !== undefined) {
      expect(description1[0]).toHaveProperty('text')
      if (description1[0] !== undefined) {
        expect((description1[0] as RTTextNode).text).toBe(customDescription1)
      }
    }
  })

  it("should return rating's description1 if custom bank's description1 is empty array", async () => {
    const ratingDescription1 = 'rating description1'
    mockedGetByUID
      .mockResolvedValueOnce({
        error: null,
        data: mockBankPageData({}),
      })
      .mockResolvedValueOnce({
        error: null,
        data: mockBankPageData({ description1: ratingDescription1 }),
      })
    const { bankPage } = await useBankPage('invalid bank tag', invalidBankDetails)
    expect(bankPage).not.toBe(null)
    expect(bankPage).toHaveProperty('data.description1')
    const description1 = bankPage?.data.description1
    expect(description1).not.toBeUndefined()
    expect(description1).toHaveLength(1)
    if (description1 !== undefined) {
      expect(description1[0]).toHaveProperty('text')
      if (description1[0] !== undefined) {
        expect((description1[0] as RTTextNode).text).toBe(ratingDescription1)
      }
    }
  })

  it("should return rating's description1 if custom bank's description1 is array of empty text", async () => {
    const ratingDescription1 = 'rating description1'
    mockedGetByUID
      .mockResolvedValueOnce({
        error: null,
        data: mockBankPageData({ description1: '' }),
      })
      .mockResolvedValueOnce({
        error: null,
        data: mockBankPageData({ description1: ratingDescription1 }),
      })
    const { bankPage } = await useBankPage('invalid bank tag', invalidBankDetails)
    expect(bankPage).not.toBe(null)
    expect(bankPage).toHaveProperty('data.description1')
    const description1 = bankPage?.data.description1
    expect(description1).not.toBeUndefined()
    expect(description1).toHaveLength(1)
    if (description1 !== undefined) {
      expect(description1[0]).toHaveProperty('text')
      if (description1[0] !== undefined) {
        expect((description1[0] as RTTextNode).text).toBe(ratingDescription1)
      }
    }
  })
})
