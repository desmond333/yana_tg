import { describe, expect, it } from 'vitest'
import type { ContentItem } from '../model/types'
import { groupReviewSlides } from './reviews'

const item = (id: string): ContentItem => ({ id })

const RATIOS = {
  '01': 0.968,
  '02': 0.324,
  '03': 0.344,
  '04': 0.26,
  '05': 0.264,
  '06': 0.56,
  '07': 0.554,
  '08': 0.643,
  '09': 1.195,
  '10': 1.312,
}

describe('review slide grouping', () => {
  it('combines short reviews so slides have a similar height', () => {
    const items = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'].map(item)
    const slides = groupReviewSlides(items, RATIOS)

    expect(slides.map((slide) => slide.map((review) => review.id))).toEqual([
      ['01'],
      ['02', '03', '04'],
      ['05', '06'],
      ['07', '08'],
      ['09'],
      ['10'],
    ])

    const heights = slides.map((slide) =>
      slide.reduce((sum, review, index) => sum + RATIOS[review.id as keyof typeof RATIOS] + 0.06 + (index > 0 ? 0.035 : 0), 0),
    )
    expect(Math.max(...heights) / Math.min(...heights)).toBeLessThan(1.45)
  })

  it('keeps a tall review on its own slide', () => {
    expect(groupReviewSlides([item('tall'), item('short')], { tall: 2, short: 0.2 })).toEqual([[item('tall')], [item('short')]])
  })

  it('uses a fallback height for reviews without a measured image', () => {
    expect(groupReviewSlides([item('first'), item('second'), item('third')], {})).toHaveLength(2)
  })

  it('returns no slides for empty content', () => {
    expect(groupReviewSlides([], {})).toEqual([])
  })
})
