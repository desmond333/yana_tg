import { describe, expect, it } from 'vitest'
import { formatDate, formatDuration, formatPrice } from './format'

describe('format utilities', () => {
  it('formats prices correctly', () => {
    expect(formatPrice(null)).toBe('Бесплатно')
    expect(formatPrice(0)).toBe('Бесплатно')
    expect(formatPrice(0, 'Free')).toBe('Free')
    expect(formatPrice(24900).replace(/\u00a0/g, ' ')).toBe('24 900 ₽')
  })

  it('formats durations in seconds, minutes, hours', () => {
    expect(formatDuration(45)).toBe('45 сек')
    expect(formatDuration(180)).toBe('3 мин')
    expect(formatDuration(3600)).toBe('1 ч')
    expect(formatDuration(4500)).toBe('1 ч 15 мин')
  })

  it('formats dates consistently', () => {
    const formatted = formatDate('2026-10-14T10:00:00.000Z', 'ru-RU')
    expect(formatted).toContain('2026')
    expect(formatDate('invalid')).toBe('invalid')
  })
})
