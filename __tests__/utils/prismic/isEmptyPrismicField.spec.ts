// @vitest-environment node
import { describe, test, expect } from 'vitest'
import type { RTImageNode, RTNode, RichTextField } from '@prismicio/types'
import { RichTextNodeType } from '@prismicio/types'
import isEmptyPrismicField from '~/utils/prismic/isEmptyPrismicField'

describe('utils/isEmptyPrismicField', () => {
  test.each([
    ['', 'true'],
    ['non-empty-string', 'false'],
  ])('KeyTextField "%s" returns %s"', (fieldData: string, expected: string) => {
    expect(isEmptyPrismicField(fieldData).toString()).toBe(expected)
  })

  const emptyHeading1: RTNode = { type: RichTextNodeType.heading1, text: '', spans: [] }
  const emptyParagraph: RTNode = { type: RichTextNodeType.paragraph, text: '', spans: [] }
  const emptyListItem: RTNode = { type: RichTextNodeType.listItem, text: '', spans: [] }
  test.each([
    [emptyHeading1],
    [emptyParagraph],
    [emptyListItem],
  ])('RichTextField with empty text node %O returns true', (node: RTNode) => {
    expect(isEmptyPrismicField([node])).toBeTruthy()
  })

  const emptyImage: RTImageNode = { type: RichTextNodeType.image, url: '', dimensions: { width: 0, height: 0 }, alt: null, copyright: null }
  test('RichTextField with empty image node returns true', () => {
    expect(isEmptyPrismicField(emptyImage)).toBeTruthy()
  })

  test('non-empty RichTextField returns false', () => {
    const richTextField: RichTextField = [
      { type: RichTextNodeType.heading1, text: 'Heading 1', spans: [] },
      { type: RichTextNodeType.paragraph, text: 'Paragraph', spans: [] },
    ]
    expect(isEmptyPrismicField(richTextField)).toBeFalsy()
  })
})
