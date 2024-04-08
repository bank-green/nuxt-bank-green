// @vitest-environment nuxt
// import { RichTextNodeType } from '@prismicio/types'
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest'
import { useBankPage } from '~/utils/prismic/bankpage'

vi.mock('@prismicio/vue')

const mockedGetByUID = vi.fn()

describe('useBankPage', () => {
  const invalidBankDetails = ref(null)
  beforeAll(async () => {
    const prismic = await import('@prismicio/vue')
    prismic.usePrismic = vi.fn().mockResolvedValue({
      client: {
        getByUID: mockedGetByUID
      }
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should return null if bank tag is invalid', async () => {
    const { bankPage } = await useBankPage('invalid bank tag', invalidBankDetails)
    expect(bankPage).toBe(null)
  })
})
