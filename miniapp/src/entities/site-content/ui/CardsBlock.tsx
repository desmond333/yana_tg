import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ArrowDown, ArrowUpRight, TrendingUp } from 'lucide-react'
import { AnimatePresence, m, useInView, useReducedMotion } from 'motion/react'
import { Link } from 'react-router-dom'
import { cn } from '@/shared/lib'
import { Badge, Carousel, CoverImage, EASE_OUT_EXPO, RichText, SPRING_SOFT, Stagger, StaggerItem, TypewriterText } from '@/shared/ui'
import { getExternalLinkProps } from '../lib/links'
import { isExternalHref, splitLabel } from '../lib/text'
import type { ContentBlock, ContentItem } from '../model/types'
import { BlockSection } from './BlockSection'
import { ContentAction } from './ContentAction'

const isDoneStage = (lead: string): boolean => lead.trim().toLowerCase() === 'сделали'

const CaseStage = ({ text, isFinal, featured = false }: { text: string; isFinal: boolean; featured?: boolean }) => {
  const { lead, rest } = splitLabel(text)

  if (isFinal) {
    return (
      <div className={cn('flex flex-col gap-1.5 rounded-md bg-accent-soft', featured ? 'p-4 md:p-5' : 'p-3.5')}>
        <span className="flex items-center gap-1.5 font-display text-sm leading-none italic text-accent">
          <TrendingUp className="size-3.5" aria-hidden />
          {lead || 'Результат'}
        </span>
        <RichText text={rest} className={cn('text-body leading-snug font-semibold text-text text-pretty', featured && 'md:text-base')} />
      </div>
    )
  }

  const isDone = isDoneStage(lead)

  return (
    <div className="flex flex-col gap-1.5">
      {lead && (
        <span className="flex items-center gap-2">
          <span className={cn('h-px w-5 shrink-0', isDone ? 'bg-accent/60' : 'bg-line')} aria-hidden />
          <span className={cn('font-display text-[15px] leading-none italic', isDone ? 'text-accent' : 'text-muted')}>{lead}</span>
        </span>
      )}
      <RichText text={rest} className={cn('text-body leading-relaxed text-pretty', isDone ? 'text-text/85' : 'text-muted')} />
    </div>
  )
}

const CaseCard = ({ item, featured = false, index }: { item: ContentItem; featured?: boolean; index?: number }) => {
  const stages = (item.bullets ?? []).filter(Boolean)

  return (
    <article
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-lg border border-line/70 bg-panel shadow-card transition-[border-color,box-shadow] duration-300 hover:border-accent/30 hover:shadow-float',
        featured ? 'gap-5 p-5 shadow-float md:gap-6 md:p-7' : 'gap-4 p-5',
      )}
    >
      {featured && index !== undefined && (
        <span
          className="pointer-events-none absolute -top-3 right-4 font-display text-[5rem] leading-none font-bold italic text-accent/10 md:-top-4 md:right-6 md:text-[7rem]"
          aria-hidden
        >
          {String(index + 1).padStart(2, '0')}
        </span>
      )}
      <div className={cn('relative flex items-center', featured ? 'gap-4' : 'gap-3.5')}>
        {item.imageUrl && (
          <CoverImage
            src={item.imageUrl}
            alt={item.title ?? ''}
            className={cn(
              'shrink-0 rounded-full shadow-card ring-2 ring-accent/30 ring-offset-2 ring-offset-panel',
              featured ? 'size-16 md:size-20' : 'size-14 md:size-16',
            )}
          />
        )}
        <div className="flex min-w-0 flex-col gap-0.5">
          {featured && <span className="text-eyebrow text-accent uppercase">Флагманский кейс</span>}
          <h3
            className={cn(
              'font-display leading-snug font-semibold tracking-tight text-balance',
              featured ? 'text-xl md:text-2xl' : 'text-lg',
            )}
          >
            {item.title}
          </h3>
          {item.subtitle && (
            <span className={cn('leading-snug text-muted text-pretty', featured ? 'text-sm md:text-base' : 'text-sm')}>
              {item.subtitle}
            </span>
          )}
        </div>
      </div>
      <div className={cn('mt-auto flex flex-col', featured ? 'gap-2.5' : 'gap-2')}>
        {stages.map((stage, stageIndex) => (
          <div key={stage} className="flex flex-col gap-2">
            {stageIndex > 0 && <ArrowDown className="size-3.5 self-center text-accent/60" aria-hidden />}
            <CaseStage text={stage} isFinal={stageIndex === stages.length - 1 && stages.length > 1} featured={featured} />
          </div>
        ))}
      </div>
    </article>
  )
}

const ItemCard = ({ item }: { item: ContentItem }) => (
  <article className="flex h-full flex-col overflow-hidden rounded-lg border border-line/70 bg-panel shadow-card">
    {item.imageUrl && <CoverImage src={item.imageUrl} alt={item.title ?? ''} className="aspect-video w-full" />}
    <div className="flex flex-1 flex-col gap-2.5 p-5">
      {item.badge && (
        <Badge variant="soft" className="w-fit max-w-full truncate">
          {item.badge}
        </Badge>
      )}
      {item.subtitle && <span className="text-eyebrow text-accent uppercase">{item.subtitle}</span>}
      <h3 className="font-display text-lg leading-snug font-semibold tracking-tight text-balance">{item.title}</h3>
      {item.text && <RichText text={item.text} className="text-body leading-relaxed text-muted text-pretty md:text-base" />}
      {item.href && item.buttonLabel && (
        <div className="mt-auto pt-2">
          <ContentAction link={{ id: item.id, label: item.buttonLabel, href: item.href }} variant="soft" size="sm" />
        </div>
      )}
    </div>
  </article>
)

const RowCardBody = ({ item, index }: { item: ContentItem; index: number }) => (
  <>
    <div className="relative shrink-0 overflow-hidden">
      <CoverImage
        src={item.imageUrl}
        alt=""
        className="aspect-[16/9] w-full transition-transform duration-700 ease-(--ease-out-expo) group-hover:scale-105 md:aspect-[16/10]"
      />
      <span className="absolute top-3 left-3 rounded-full bg-black/45 px-2.5 py-0.5 font-display text-xs font-bold text-white backdrop-blur-sm">
        {String(index + 1).padStart(2, '0')}
      </span>
    </div>
    <div className="flex min-w-0 flex-1 flex-col gap-2 p-4 md:gap-2.5 md:p-6">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-display text-lg leading-snug font-semibold tracking-tight text-balance md:text-xl">{item.title}</h3>
        <ArrowUpRight
          className="size-5 shrink-0 text-muted transition-transform duration-300 ease-(--ease-spring) group-hover:rotate-45 group-hover:text-accent"
          aria-hidden
        />
      </div>
      {item.text && <RichText text={item.text} className="text-body leading-relaxed text-muted text-pretty md:text-base" />}
      <div className="mt-auto flex flex-wrap items-center justify-between gap-x-3 gap-y-1 pt-1">
        {item.badge && <span className="font-display text-sm font-bold text-accent md:text-lg">{item.badge}</span>}
        {item.buttonLabel && (
          <span className="text-xs font-semibold text-text underline-offset-4 group-hover:underline md:text-sm">{item.buttonLabel} →</span>
        )}
      </div>
    </div>
  </>
)

const ROW_CLASSES =
  'group flex h-full flex-col overflow-hidden rounded-lg border border-line/70 bg-panel shadow-card transition-shadow duration-300 hover:shadow-float'

const RowCard = ({ item, index }: { item: ContentItem; index: number }) => {
  const body = <RowCardBody item={item} index={index} />
  if (!item.href) return <div className={ROW_CLASSES}>{body}</div>

  if (isExternalHref(item.href)) {
    return (
      <a href={item.href} className={ROW_CLASSES} {...getExternalLinkProps(item.href)}>
        {body}
      </a>
    )
  }

  return (
    <Link to={item.href} className={ROW_CLASSES}>
      {body}
    </Link>
  )
}

const RowsLayout = ({ items }: { items: ContentItem[] }) => (
  <Stagger className="grid gap-3 md:grid-cols-3 md:gap-5">
    {items.map((item, index) => (
      <StaggerItem key={item.id} className="h-full">
        <m.div className="h-full" whileHover={{ y: -6 }} whileTap={{ scale: 0.98 }} transition={SPRING_SOFT}>
          <RowCard item={item} index={index} />
        </m.div>
      </StaggerItem>
    ))}
  </Stagger>
)

const isCaseItem = (item: ContentItem): boolean => (item.bullets ?? []).length > 0
const isSchoolCase = (item: ContentItem): boolean => /онлайн-школа/i.test(item.title ?? '')

const MOSAIC_UNITS = [4, 4, 4, 3, 3, 3, 3, 4, 4, 4, 12]

const MOSAIC_ROWS = MOSAIC_UNITS.reduce<number[][]>((rows, unit) => {
  const currentRow = rows.at(-1)
  const currentWidth = currentRow?.reduce((sum, span) => sum + span, 0) ?? 0

  if (!currentRow || currentWidth + unit > 12) {
    rows.push([unit])
    return rows
  }

  currentRow.push(unit)
  return rows
}, [])

const getMosaicPosition = (index: number): { row: number; column: number; rowWidth: number } => {
  let cursor = 0

  for (let row = 0; row < MOSAIC_ROWS.length; row += 1) {
    const spans = MOSAIC_ROWS[row] ?? []

    if (index < cursor + spans.length) {
      return { row, column: index - cursor, rowWidth: spans.length }
    }

    cursor += spans.length
  }

  return { row: 0, column: 0, rowWidth: 1 }
}

const MOSAIC_SPAN_CLASSES: Record<number, string> = {
  3: 'md:col-span-3',
  4: 'md:col-span-4',
  12: 'md:col-span-12',
}

const getMosaicSpan = (index: number, total: number): string =>
  index === total - 1 ? 'md:col-span-12' : (MOSAIC_SPAN_CLASSES[MOSAIC_UNITS[index] ?? 3] ?? 'md:col-span-3')

const useSequentialReveal = (order: string[]) => {
  const [revealedIds, setRevealedIds] = useState<ReadonlySet<string>>(() => new Set())
  const revealedRef = useRef<ReadonlySet<string>>(new Set())
  const pendingRef = useRef<string[]>([])
  const busyRef = useRef(false)
  const fallbackRef = useRef<number | undefined>(undefined)

  const processQueueRef = useRef<() => void>(() => undefined)
  const processQueue = useCallback(() => {
    if (busyRef.current) return

    const nextId = pendingRef.current.shift()
    if (!nextId) return

    busyRef.current = true
    revealedRef.current = new Set(revealedRef.current).add(nextId)
    setRevealedIds(revealedRef.current)

    fallbackRef.current = window.setTimeout(() => {
      busyRef.current = false
      processQueueRef.current()
    }, 8000)
  }, [])

  useEffect(() => {
    processQueueRef.current = processQueue
  }, [processQueue])

  const handleShown = useCallback(() => {
    if (!busyRef.current) return

    busyRef.current = false
    if (fallbackRef.current) window.clearTimeout(fallbackRef.current)
    window.setTimeout(() => processQueueRef.current(), 50)
  }, [])

  const enqueue = useCallback(
    (id: string) => {
      if (revealedRef.current.has(id) || pendingRef.current.includes(id)) return

      pendingRef.current.push(id)
      pendingRef.current.sort((a, b) => order.indexOf(a) - order.indexOf(b))
      processQueue()
    },
    [order, processQueue],
  )

  useEffect(
    () => () => {
      if (fallbackRef.current) window.clearTimeout(fallbackRef.current)
    },
    [],
  )

  return { revealedIds, enqueue, handleShown }
}

const ScrollRevealCase = ({
  item,
  index,
  isRevealed,
  onEnter,
  onShown,
}: {
  item: ContentItem
  index: number
  isRevealed: boolean
  onEnter: (id: string) => void
  onShown: () => void
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const isInView = useInView(ref, { once: true, margin: '0px 0px -18% 0px' })
  const needsTyping = !reduceMotion
  const [typed, setTyped] = useState(false)
  const isCardVisible = isRevealed && (!needsTyping || typed)

  useEffect(() => {
    if (isInView) onEnter(item.id)
  }, [isInView, item.id, onEnter])

  useEffect(() => {
    if (needsTyping || !isRevealed) return

    const timer = window.setTimeout(onShown, 200)
    return () => window.clearTimeout(timer)
  }, [needsTyping, isRevealed, onShown])

  return (
    <div ref={ref} className="relative isolate flex w-full flex-1 flex-col">
      <AnimatePresence>
        {isRevealed && needsTyping && !typed && (
          <m.div
            key="typing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
            className="absolute inset-0 z-20 flex items-center justify-center px-6 text-center"
          >
            <TypewriterText
              key={item.title}
              text={item.title ?? ''}
              speed={55}
              endDelay={200}
              onComplete={() => {
                setTyped(true)
                onShown()
              }}
              className="font-display text-xl leading-tight font-semibold text-accent italic drop-shadow-[0_0_18px_var(--accent)] md:text-2xl"
            />
          </m.div>
        )}
      </AnimatePresence>
      <m.div
        aria-hidden={!isCardVisible}
        initial={false}
        animate={isCardVisible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 24, scale: 0.94 }}
        transition={{ duration: 0.8, delay: isCardVisible ? 0.05 : 0, ease: EASE_OUT_EXPO }}
        className="relative flex w-full flex-1 flex-col"
      >
        <div
          className="h-full flex-1 animate-float transition-shadow duration-300 hover:[animation-play-state:paused]"
          style={{
            animationDelay: `${(index % 5) * 0.6}s`,
            animationDuration: `${6 + (index % 4)}s`,
          }}
        >
          {isCaseItem(item) ? <CaseCard item={item} /> : <ItemCard item={item} />}
        </div>
      </m.div>
    </div>
  )
}

const MosaicLayout = ({ items }: { items: ContentItem[] }) => {
  const { featured, rest, revealOrder } = useMemo(() => {
    const schools = items.filter(isSchoolCase)
    const fallback = items.filter(isCaseItem).slice(0, 2)
    const nextFeatured = schools.length > 0 ? schools : fallback
    const featuredIds = new Set(nextFeatured.map((item) => item.id))
    const nextRest = items.filter((item) => !featuredIds.has(item.id))

    const order = nextRest
      .map((item, index) => {
        const { row, column, rowWidth } = getMosaicPosition(index)
        const columnOrder = row % 2 === 0 ? column : rowWidth - 1 - column
        return { id: item.id, row, order: columnOrder }
      })
      .sort((a, b) => a.row - b.row || a.order - b.order)
      .map((entry) => entry.id)

    return { featured: nextFeatured, rest: nextRest, revealOrder: order }
  }, [items])

  const { revealedIds, enqueue, handleShown } = useSequentialReveal(revealOrder)

  return (
    <div className="relative">
      <div
        className="pointer-events-none absolute -top-16 left-1/2 -z-10 size-[26rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--accent)_8%,transparent)_0%,transparent_70%)] md:-top-24 md:size-[36rem]"
        aria-hidden
      />
      <Stagger className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-12 md:gap-4 [grid-auto-flow:dense]" stagger={0.06}>
        {featured.map((item, index) => (
          <StaggerItem key={item.id} className="h-full sm:col-span-2 md:col-span-6">
            <div className="h-full">{isCaseItem(item) ? <CaseCard item={item} featured index={index} /> : <ItemCard item={item} />}</div>
          </StaggerItem>
        ))}
        {rest.map((item, index) => (
          <StaggerItem key={item.id} className={cn('flex h-full', getMosaicSpan(index, rest.length))}>
            <ScrollRevealCase item={item} index={index} isRevealed={revealedIds.has(item.id)} onEnter={enqueue} onShown={handleShown} />
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  )
}

export const CardsBlock = ({ block }: { block: ContentBlock }) => {
  const items = block.items ?? []
  if (items.length === 0) return null

  if (block.layout === 'mosaic') {
    return (
      <BlockSection block={block}>
        <MosaicLayout items={items} />
      </BlockSection>
    )
  }

  if (block.layout === 'rows') {
    return (
      <BlockSection block={block}>
        <RowsLayout items={items} />
      </BlockSection>
    )
  }

  if (block.layout === 'carousel') {
    return (
      <BlockSection block={block}>
        <Carousel itemClassName="w-full md:w-[calc((100%-2.5rem)/3)]" ariaLabel={block.title}>
          {items.map((item) => (isCaseItem(item) ? <CaseCard key={item.id} item={item} /> : <ItemCard key={item.id} item={item} />))}
        </Carousel>
      </BlockSection>
    )
  }

  return (
    <BlockSection block={block}>
      <Stagger className="grid gap-3 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
        {items.map((item) => (
          <StaggerItem key={item.id} className="h-full">
            {isCaseItem(item) ? <CaseCard item={item} /> : <ItemCard item={item} />}
          </StaggerItem>
        ))}
      </Stagger>
    </BlockSection>
  )
}
