import { Children, useRef, useState, type ReactNode } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '../../lib'
import { Stagger, StaggerItem } from './Stagger'

export type CarouselProps = {
  children: ReactNode
  itemClassName?: string
  className?: string
  ariaLabel?: string
}

const ARROW_CLASSES =
  'glass absolute top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border text-text shadow-float transition-transform duration-300 ease-(--ease-spring) hover:scale-110 active:scale-95 disabled:pointer-events-none disabled:opacity-40 md:size-11'

const getSlides = (track: HTMLDivElement): HTMLElement[] => Array.from(track.children) as HTMLElement[]

const getSlideOffset = (track: HTMLDivElement, slide: HTMLElement): number =>
  slide.getBoundingClientRect().left - track.getBoundingClientRect().left - Number.parseFloat(getComputedStyle(track).paddingLeft)

const findActiveIndex = (track: HTMLDivElement): number => {
  const slides = getSlides(track)
  if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 4) return slides.length - 1
  return slides.reduce((closest, slide, index) => {
    const best = slides[closest]
    if (!best) return index
    return Math.abs(getSlideOffset(track, slide)) < Math.abs(getSlideOffset(track, best)) ? index : closest
  }, 0)
}

export const Carousel = ({ children, itemClassName, className, ariaLabel }: CarouselProps) => {
  const trackRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef(0)
  const [activeIndex, setActiveIndex] = useState(0)
  const count = Children.count(children)

  const scrollToSlide = (index: number) => {
    const track = trackRef.current
    if (!track) return

    const slides = getSlides(track)
    const slide = slides[Math.max(0, Math.min(index, slides.length - 1))]
    if (!slide) return

    const target = Math.max(0, Math.min(track.scrollLeft + getSlideOffset(track, slide), track.scrollWidth - track.clientWidth))
    track.scrollTo({ left: target, behavior: 'smooth' })
  }

  const stepSlide = (direction: -1 | 1) => {
    const track = trackRef.current
    if (!track) return

    scrollToSlide(findActiveIndex(track) + direction)
  }

  const handleScroll = () => {
    cancelAnimationFrame(frameRef.current)
    frameRef.current = requestAnimationFrame(() => {
      if (trackRef.current) setActiveIndex(findActiveIndex(trackRef.current))
    })
  }

  return (
    <div className="relative -mx-4 md:mx-0">
      <Stagger
        ref={trackRef}
        stagger={0.07}
        role="region"
        aria-label={ariaLabel}
        onScroll={handleScroll}
        className={cn(
          'no-scrollbar flex snap-x snap-mandatory scroll-px-11 gap-11 overflow-x-auto px-11 pt-1 pb-4 md:scroll-px-4 md:gap-5 md:px-4',
          className,
        )}
      >
        {Children.map(children, (child) => (
          <StaggerItem direction="right" className={cn('shrink-0 snap-start', itemClassName)}>
            {child}
          </StaggerItem>
        ))}
      </Stagger>
      {count > 1 && (
        <>
          <button
            type="button"
            aria-label="Назад"
            disabled={activeIndex === 0}
            onClick={() => stepSlide(-1)}
            className={cn(ARROW_CLASSES, 'left-1 md:-left-8')}
          >
            <ChevronLeft className="size-5" aria-hidden />
          </button>
          <button
            type="button"
            aria-label="Вперёд"
            disabled={activeIndex === count - 1}
            onClick={() => stepSlide(1)}
            className={cn(ARROW_CLASSES, 'right-1 md:-right-8')}
          >
            <ChevronRight className="size-5" aria-hidden />
          </button>
        </>
      )}
    </div>
  )
}
