import { describe, expect, it } from 'vitest'
import { cn } from './cn'

describe('cn', () => {
  it('joins truthy values', () => {
    expect(cn('a', false, undefined, 'b')).toBe('a b')
  })

  it('returns empty string for no values', () => {
    expect(cn()).toBe('')
  })

  it('keeps the last conflicting tailwind class', () => {
    expect(cn('p-2', 'p-4')).toBe('p-4')
  })
})
