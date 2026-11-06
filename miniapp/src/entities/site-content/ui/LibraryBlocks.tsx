import { useState } from 'react'
import {
  BookOpen,
  Bot,
  ChevronDown,
  Clock,
  FileText,
  Headphones,
  LayoutTemplate,
  Lightbulb,
  ListChecks,
  NotebookPen,
  PlayCircle,
  type LucideIcon,
} from 'lucide-react'
import { m } from 'motion/react'
import { formatDuration } from '@/shared/lib'
import { Button, CoverImage, EASE_OUT_EXPO, RichText, SectionTitle, Stagger, StaggerItem } from '@/shared/ui'
import { getExternalLinkProps } from '../lib/links'
import { parseMinutes } from '../lib/text'
import type { ContentBlock, ContentItem } from '../model/types'
import { BlockSection } from './BlockSection'

const MATERIAL_ICONS: Record<string, LucideIcon> = {
  шаблон: LayoutTemplate,
  промпт: Bot,
  видео: PlayCircle,
  pdf: FileText,
  инструкция: ListChecks,
  разбор: Lightbulb,
  конспект: NotebookPen,
}

const MaterialCard = ({ item }: { item: ContentItem }) => {
  const Icon = MATERIAL_ICONS[(item.badge ?? '').trim().toLowerCase()] ?? BookOpen
  const content = (
    <>
      <div className="relative w-28 shrink-0 overflow-hidden rounded-md md:w-full md:rounded-none">
        <CoverImage
          src={item.imageUrl}
          alt=""
          className="h-full min-h-24 w-full transition-transform duration-700 ease-(--ease-out-expo) group-hover:scale-105 md:aspect-[16/10] md:h-auto"
        />
        <span className="bg-accent-gradient absolute top-2 left-2 flex size-8 items-center justify-center rounded-full text-accent-text shadow-glow md:top-3 md:left-3 md:size-10">
          <Icon className="size-4 md:size-5" aria-hidden />
        </span>
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-1.5 py-1 md:gap-2 md:p-5">
        {item.badge && <span className="text-eyebrow text-accent uppercase">{item.badge}</span>}
        <h3 className="line-clamp-3 font-display text-base leading-snug font-semibold tracking-tight text-balance md:text-lg">
          {item.title}
        </h3>
        {item.text && <RichText text={item.text} className="line-clamp-3 text-body leading-relaxed text-muted md:line-clamp-4" />}
        {item.href && (
          <span className="mt-auto pt-1 text-sm font-semibold text-accent underline-offset-4 group-hover:underline">
            {item.buttonLabel ?? 'Открыть материал'} →
          </span>
        )}
      </div>
    </>
  )

  const classes =
    'group flex h-full gap-3.5 overflow-hidden rounded-lg border border-line/70 bg-panel p-2.5 shadow-card transition-shadow duration-300 hover:shadow-float md:flex-col md:gap-0 md:p-0'

  if (!item.href) return <div className={classes}>{content}</div>

  return (
    <a href={item.href} className={classes} {...getExternalLinkProps(item.href)}>
      {content}
    </a>
  )
}

export const MaterialsBlock = ({ block }: { block: ContentBlock }) => (
  <BlockSection block={block}>
    <Stagger className="grid gap-3 md:grid-cols-2 md:gap-5 lg:grid-cols-3" stagger={0.06}>
      {(block.items ?? []).map((item) => (
        <StaggerItem key={item.id} className="h-full">
          <MaterialCard item={item} />
        </StaggerItem>
      ))}
    </Stagger>
  </BlockSection>
)

const Equalizer = () => (
  <span className="flex h-5 items-end gap-0.5" aria-hidden>
    {[0, 0.2, 0.4, 0.1, 0.3].map((delay) => (
      <span
        key={delay}
        className="w-1 origin-bottom animate-equalizer rounded-full bg-accent-2"
        style={{ height: '100%', animationDelay: `${delay}s` }}
      />
    ))}
  </span>
)

const PodcastRow = ({ item }: { item: ContentItem }) => {
  const content = (
    <>
      <span className="font-display text-3xl leading-none font-bold text-accent-2 tabular-nums md:text-4xl">{item.value}</span>
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <h3 className="font-display text-base leading-snug font-semibold tracking-tight text-balance md:text-lg">{item.title}</h3>
        {item.text && <RichText text={item.text} className="text-body leading-relaxed text-muted text-pretty" />}
        <div className="flex flex-wrap items-center gap-2 pt-1.5">
          {item.href && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1.5 text-xs font-semibold text-accent-text transition-transform duration-300 ease-(--ease-spring) group-hover:scale-105">
              <Headphones className="size-3.5" aria-hidden />
              {item.buttonLabel ?? 'Слушать'}
            </span>
          )}
          {item.duration && (
            <span className="inline-flex items-center gap-1 rounded-full bg-panel-2 px-2 py-1 text-[11px] font-semibold text-muted">
              <Clock className="size-3" aria-hidden />
              {item.duration}
            </span>
          )}
        </div>
      </div>
    </>
  )

  const classes =
    'group flex h-full items-start gap-4 rounded-lg border border-line/70 bg-panel p-4 shadow-card transition-colors duration-300 hover:border-accent/50'

  if (!item.href) return <div className={classes}>{content}</div>

  return (
    <a
      href={item.href}
      className={classes}
      aria-label={`${item.buttonLabel ?? 'Слушать'}: ${item.title ?? ''}`}
      {...getExternalLinkProps(item.href)}
    >
      {content}
    </a>
  )
}

const PREVIEW_COUNT = 6

export const PodcastsBlock = ({ block }: { block: ContentBlock }) => {
  const items = block.items ?? []
  const [isExpanded, setIsExpanded] = useState(false)
  const totalMinutes = items.reduce((sum, item) => sum + parseMinutes(item.duration), 0)
  const visible = isExpanded ? items : items.slice(0, PREVIEW_COUNT)

  return (
    <section
      id={block.id}
      data-surface="inverse"
      className="-mx-4 flex scroll-mt-24 flex-col gap-6 bg-bg px-4 py-10 text-text shadow-float md:mx-0 md:rounded-xl md:px-12 md:py-14"
    >
      <div className="flex flex-col gap-4">
        <SectionTitle
          eyebrow={block.eyebrow}
          title={block.title ?? ''}
          subtitle={block.subtitle ? <RichText text={block.subtitle} /> : undefined}
        />
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-muted">
          <Equalizer />
          <span className="inline-flex items-center gap-1.5 rounded-full bg-panel-2 px-3 py-1.5">
            <Headphones className="size-3.5" aria-hidden />
            {items.length} выпусков
          </span>
          {totalMinutes > 0 && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-panel-2 px-3 py-1.5">
              <Clock className="size-3.5" aria-hidden />
              {formatDuration(totalMinutes * 60)} полезного звука
            </span>
          )}
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2 md:gap-4">
        {visible.map((item, index) => (
          <m.div
            key={item.id}
            className="h-full"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -40px 0px' }}
            transition={{ duration: 0.55, delay: (index % PREVIEW_COUNT) * 0.05, ease: EASE_OUT_EXPO }}
          >
            <PodcastRow item={item} />
          </m.div>
        ))}
      </div>

      {items.length > PREVIEW_COUNT && (
        <Button
          variant="outline"
          className="self-center"
          onClick={() => setIsExpanded((value) => !value)}
          rightIcon={<ChevronDown className={isExpanded ? 'size-4 rotate-180 transition-transform' : 'size-4 transition-transform'} />}
        >
          {isExpanded ? 'Свернуть' : `Показать все ${items.length} выпусков`}
        </Button>
      )}
    </section>
  )
}
