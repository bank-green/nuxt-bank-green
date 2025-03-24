/* eslint-disable @typescript-eslint/ban-ts-comment */
import { describe, test, expect } from 'vitest'
import { addGlossaryToText } from '~/utils/addGlossaryToText'

describe('addGlossaryToolTip', () => {
  test('adds tooltip and link to term', () => {
    const text = '<p>ABC</p>'
    const expected = '<p><a href="/glossary#abc" class="tooltip" data-tooltip="ABC\'s tooltip for testing">ABC</a></p>'

    expect(addGlossaryToText(text, mockGlossary)).toEqual(expected)
  })
  test('adds tooltip and link to multiple terms', () => {
    const text = '<p>ABC ABC ABC</p>'
    const expected = '<p><a href="/glossary#abc" class="tooltip" data-tooltip="ABC\'s tooltip for testing">ABC</a> <a href="/glossary#abc" class="tooltip" data-tooltip="ABC\'s tooltip for testing">ABC</a> <a href="/glossary#abc" class="tooltip" data-tooltip="ABC\'s tooltip for testing">ABC</a></p>'

    expect(addGlossaryToText(text, mockGlossary)).toEqual(expected)
  })
  test('adds tooltip and link to term even if different case', () => {
    const text = '<p>abC</p>'
    const expected = '<p><a href="/glossary#abc" class="tooltip" data-tooltip="ABC\'s tooltip for testing">ABC</a></p>'

    expect(addGlossaryToText(text, mockGlossary)).toEqual(expected)
  })
  test('adds tooltip and link to term outside of <a> tag', () => {
    const text = '<p>XYZ <a href="https://www.google.com/" target="_blank">Link to search engine</a></p>'
    const expected = '<p><a href="/glossary#xyz" class="tooltip" data-tooltip="this is a tooltip for XYZ">XYZ</a> <a href="https://www.google.com/" target="_blank">Link to search engine</a></p>'

    expect(addGlossaryToText(text, mockGlossary)).toEqual(expected)
  })
  test('does not add tooltip if term is part of word', () => {
    const text = '<p>food is for eating <span>AFOO FOOD 1abc </span></p>'

    expect(addGlossaryToText(text, mockGlossary)).toEqual(text)
  })

  test('does not add tooltip if term is inside of <a> tag', () => {
    const text = '<p><a href="https://www.google.com/" target="_blank">XYZ</a> the quick brown fox jumps over the lazy dogs</p>'

    expect(addGlossaryToText(text, mockGlossary)).toEqual(text)
  })
  test('adds tooltip to term outside of <a> tag, but not inside <a> tag', () => {
    const text = '<p>XYZ<a href="https://www.google.com/" target="_blank">search XYZ engine</a> the quick brown fox jumps over the lazy dogs</p>'
    const expected = '<p><a href="/glossary#xyz" class="tooltip" data-tooltip="this is a tooltip for XYZ">XYZ</a><a href="https://www.google.com/" target="_blank">search XYZ engine</a> the quick brown fox jumps over the lazy dogs</p>'

    expect(addGlossaryToText(text, mockGlossary)).toEqual(expected)
  })
  test.each([undefined, null, 123, { test: 123 }])('should return text if terms are invalid', (terms) => {
    const text = '<p>ABC</p>'

    // @ts-expect-error
    expect(addGlossaryToText(text, terms)).toEqual(text)
  })
  test('should work on real world example', () => {
    const text = '<p><a rel="noopener noreferrer" href="https://gabv.org" target="_blank">Global Alliance on Banking Values</a></p>'

    expect(addGlossaryToText(text, mockGlossary)).toEqual(text)
  })
})

const mockGlossary = [
  {
    name: 'XYZ',
    tooltip: 'this is a tooltip for XYZ',
  },
  {
    name: 'FOO',
    tooltip: 'foo is a test word',
  },
  {
    name: 'ABC',
    tooltip: "ABC's tooltip for testing",
  },
  { name: 'GABV', tooltip: 'Global Alliance for Banking on Values, a global network promoting sustainable banking.' },
]
