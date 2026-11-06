import { describe, expect, it } from 'vitest'
import { parseMinutes, splitLabel, splitSentence } from './text'

describe('site content text helpers', () => {
  it('splits a short label before the colon', () => {
    expect(splitLabel('Стало: 39 продаж за сутки.')).toEqual({ lead: 'Стало', rest: '39 продаж за сутки.' })
    expect(splitLabel('Без метки')).toEqual({ lead: '', rest: 'Без метки' })
  })

  it('uses the first sentence as a step title', () => {
    expect(splitSentence('Брифинг-созвон. Погружаюсь в проект.')).toEqual({ lead: 'Брифинг-созвон', rest: 'Погружаюсь в проект.' })
    expect(splitSentence('9 встреч в Zoom')).toEqual({ lead: '9 встреч в Zoom', rest: '' })
  })

  it('reads minutes from a duration label', () => {
    expect(parseMinutes('24 мин')).toBe(24)
    expect(parseMinutes(undefined)).toBe(0)
  })
})
