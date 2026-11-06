import { useEffect, useState } from 'react'
import { MessageCircle } from 'lucide-react'
import { Carousel, CoverImage, RichText, Skeleton } from '@/shared/ui'
import { DEFAULT_REVIEW_RATIO, groupReviewSlides } from '../lib/reviews'
import type { ContentBlock, ContentItem } from '../model/types'
import { BlockSection } from './BlockSection'

type ReviewRatios = Record<string, number>

type MeasuredRatios = {
  key: string
  ratios: ReviewRatios
}

const EMPTY_REVIEWS: ContentItem[] = []

const getReviewKey = (items: ContentItem[]): string => items.map((item) => `${item.id}:${item.imageUrl ?? ''}`).join('|')

const measureReviewRatio = (src: string): Promise<number> =>
  new Promise((resolve) => {
    const image = new Image()

    image.onload = () => {
      resolve(image.naturalWidth > 0 ? image.naturalHeight / image.naturalWidth : DEFAULT_REVIEW_RATIO)
    }
    image.onerror = () => resolve(DEFAULT_REVIEW_RATIO)
    image.src = src
  })

const useReviewRatios = (items: ContentItem[], itemsKey: string): ReviewRatios | null => {
  const [measured, setMeasured] = useState<MeasuredRatios | null>(null)

  useEffect(() => {
    let cancelled = false

    Promise.all(
      items.map(async (item) => {
        const ratio = item.imageUrl ? await measureReviewRatio(item.imageUrl) : DEFAULT_REVIEW_RATIO
        return [item.id, ratio] as const
      }),
    ).then((entries) => {
      if (!cancelled) setMeasured({ key: itemsKey, ratios: Object.fromEntries(entries) })
    })

    return () => {
      cancelled = true
    }
  }, [items, itemsKey])

  return measured?.key === itemsKey ? measured.ratios : null
}

const ReviewScreenshot = ({ item }: { item: ContentItem }) => (
  <figure className="flex flex-col gap-2 rounded-lg border border-line/70 bg-panel-2 p-2 shadow-card">
    <img
      src={item.imageUrl}
      alt={item.title ? `Отзыв: ${item.title}` : 'Скриншот отзыва'}
      loading="lazy"
      decoding="async"
      className="h-auto w-full rounded-md"
    />
    {item.title && <figcaption className="px-2 pb-1 text-xs font-semibold text-muted">{item.title}</figcaption>}
  </figure>
)

const ReviewCard = ({ item }: { item: ContentItem }) => (
  <article className="flex flex-col overflow-hidden rounded-lg border border-line/70 bg-panel shadow-card">
    {item.imageUrl && <CoverImage src={item.imageUrl} alt={item.title ?? 'Отзыв'} className="aspect-[4/3] w-full" />}
    <div className="flex flex-1 flex-col gap-3 p-5">
      <MessageCircle className="size-5 text-accent" aria-hidden />
      {item.text && <RichText text={`«${item.text}»`} className="text-body leading-relaxed text-text/90 text-pretty" />}
      <div className="mt-auto flex flex-col border-t border-line/60 pt-3">
        <span className="font-display text-sm font-semibold">{item.title}</span>
        {item.subtitle && <span className="text-xs text-muted">{item.subtitle}</span>}
      </div>
    </div>
  </article>
)

const isScreenshot = (item: ContentItem): boolean => Boolean(item.imageUrl) && !item.text

const ReviewSlide = ({ items }: { items: ContentItem[] }) => (
  <div className="flex flex-col gap-2.5">
    {items.map((item) => (isScreenshot(item) ? <ReviewScreenshot key={item.id} item={item} /> : <ReviewCard key={item.id} item={item} />))}
  </div>
)

export const ReviewsBlock = ({ block }: { block: ContentBlock }) => {
  const items = block.items ?? EMPTY_REVIEWS
  const itemsKey = getReviewKey(items)
  const ratios = useReviewRatios(items, itemsKey)

  if (items.length === 0) return null

  const slides = ratios ? groupReviewSlides(items, ratios) : []

  return (
    <BlockSection block={block}>
      {ratios ? (
        <Carousel itemClassName="w-full md:w-[calc((100%-2.5rem)/3)]" className="items-start" ariaLabel={block.title}>
          {slides.map((slide) => (
            <ReviewSlide key={slide.map((item) => item.id).join('-')} items={slide} />
          ))}
        </Carousel>
      ) : (
        <Skeleton className="h-80 w-full rounded-lg" />
      )}
    </BlockSection>
  )
}
