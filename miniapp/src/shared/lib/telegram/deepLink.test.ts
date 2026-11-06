import { describe, expect, it } from 'vitest'
import { parseStartParam } from './deepLink'

describe('deepLink utils', () => {
  it('redirects old product links to services', () => {
    expect(parseStartParam('p_course-reels')).toBe('/services')
    expect(parseStartParam('product_1')).toBe('/services')
  })

  it('redirects old lead links to services', () => {
    expect(parseStartParam('lead_consultation')).toBe('/services')
    expect(parseStartParam('lead')).toBe('/services')
  })

  it('redirects the old admin link to home', () => {
    expect(parseStartParam('admin')).toBe('/')
  })

  it('parses section start params', () => {
    expect(parseStartParam('podcasts')).toBe('/library')
    expect(parseStartParam('reels')).toBe('/library')
    expect(parseStartParam('cases')).toBe('/cases')
    expect(parseStartParam('about')).toBe('/cases')
    expect(parseStartParam('catalog')).toBe('/services')
    expect(parseStartParam('services')).toBe('/services')
    expect(parseStartParam('library')).toBe('/library')
  })

  it('returns null for empty or invalid params', () => {
    expect(parseStartParam('')).toBeNull()
    expect(parseStartParam(null)).toBeNull()
    expect(parseStartParam(undefined)).toBeNull()
    expect(parseStartParam('unknown_action_xyz')).toBeNull()
  })
})
