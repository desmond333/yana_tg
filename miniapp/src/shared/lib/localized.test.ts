import { describe, expect, it } from 'vitest'
import { pickLocalizedText } from './localized'

describe('pickLocalizedText', () => {
  it('returns plain strings as is', () => {
    expect(pickLocalizedText('Привет')).toBe('Привет')
  })

  it('returns ru value from localized object', () => {
    expect(pickLocalizedText({ ru: 'Курс', en: 'Course' })).toBe('Курс')
  })

  it('falls back for unsupported values', () => {
    expect(pickLocalizedText(null, 'запасной')).toBe('запасной')
    expect(pickLocalizedText({ en: 'Only en' })).toBe('')
  })
})
