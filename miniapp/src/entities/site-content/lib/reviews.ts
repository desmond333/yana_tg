import type { ContentItem } from '../model/types'

export const DEFAULT_REVIEW_RATIO = 0.6

const ITEM_OVERHEAD_RATIO = 0.06
const ITEM_GAP_RATIO = 0.035
const TARGET_SLIDE_RATIO = 1.25

const getItemRatio = (item: ContentItem, ratios: Record<string, number>): number =>
  (ratios[item.id] ?? DEFAULT_REVIEW_RATIO) + ITEM_OVERHEAD_RATIO

const shouldAppendToSlide = (currentRatio: number, itemRatio: number, targetRatio: number): boolean => {
  const nextRatio = currentRatio + ITEM_GAP_RATIO + itemRatio
  return Math.abs(nextRatio - targetRatio) <= Math.abs(currentRatio - targetRatio)
}

export const groupReviewSlides = (items: ContentItem[], ratios: Record<string, number>): ContentItem[][] => {
  if (items.length === 0) return []

  const itemRatios = items.map((item) => getItemRatio(item, ratios))
  const totalRatio = itemRatios.reduce((sum, ratio) => sum + ratio, 0) + ITEM_GAP_RATIO * (items.length - 1)
  const slideCount = Math.max(1, Math.round(totalRatio / TARGET_SLIDE_RATIO))
  const targetRatio = totalRatio / slideCount

  const slides: ContentItem[][] = []
  let current: ContentItem[] = []
  let currentRatio = 0

  items.forEach((item, index) => {
    const itemRatio = itemRatios[index] ?? DEFAULT_REVIEW_RATIO

    if (current.length > 0 && !shouldAppendToSlide(currentRatio, itemRatio, targetRatio)) {
      slides.push(current)
      current = []
      currentRatio = 0
    }

    current.push(item)
    currentRatio += currentRatio > 0 ? ITEM_GAP_RATIO + itemRatio : itemRatio
  })

  if (current.length > 0) slides.push(current)

  return slides
}
