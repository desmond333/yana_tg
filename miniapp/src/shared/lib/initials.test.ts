import { describe, expect, it } from 'vitest'
import { getInitials } from './initials'

describe('getInitials', () => {
  it('takes first letters of first and last name', () => {
    expect(getInitials('Яна Алфимова')).toBe('ЯА')
    expect(getInitials('  елена   соколова  ')).toBe('ЕС')
  })

  it('handles single word and empty names', () => {
    expect(getInitials('Яна')).toBe('Я')
    expect(getInitials('')).toBe('')
  })
})
