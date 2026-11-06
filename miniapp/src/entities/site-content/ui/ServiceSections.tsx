import { useRef, type ComponentType } from 'react'
import { ArrowUpRight, Award, Check, Flag, MapIcon, MessageCircle, Sparkles, Target, TrendingUp, type LucideIcon } from 'lucide-react'
import { m, useScroll, useSpring } from 'motion/react'
import { cn } from '@/shared/lib'
import { EASE_OUT_EXPO, Reveal, RichText, SPRING_SOFT, Stagger, StaggerItem } from '@/shared/ui'
import { splitLabel, splitSentence } from '../lib/text'
import type { ContentItem, SectionKind } from '../model/types'
import { ChatThread } from './ChatThread'

const RESULT_ICONS: LucideIcon[] = [Target, MapIcon, Sparkles, MessageCircle, TrendingUp, Award]

const PainsSection = ({ bullets }: { bullets: string[] }) => (
  <ChatThread messages={bullets.map((bullet, index) => ({ id: `${index}-${bullet}`, text: bullet }))} />
)

const RouteSection = ({ bullets }: { bullets: string[] }) => {
  const ref = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 })

  return (
    <ol ref={ref} className="relative flex flex-col gap-6 pl-14 md:gap-8 md:pl-20">
      <div className="absolute top-2 bottom-2 left-[1.15rem] w-0.5 rounded-full bg-line md:left-[1.65rem]" aria-hidden />
      <m.div
        className="bg-accent-gradient absolute top-2 bottom-2 left-[1.15rem] w-0.5 origin-top rounded-full md:left-[1.65rem]"
        style={{ scaleY: progress }}
        aria-hidden
      />
      {bullets.map((bullet, index) => {
        const { lead, rest } = splitSentence(bullet)
        return (
          <m.li
            key={bullet}
            className="relative"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '0px 0px -80px 0px' }}
            transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
          >
            <m.span
              className="bg-accent-gradient absolute top-0 -left-14 flex size-10 items-center justify-center rounded-full font-display text-sm font-bold text-accent-text shadow-glow ring-4 ring-bg md:-left-20 md:size-14 md:text-lg"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, margin: '0px 0px -80px 0px' }}
              transition={{ ...SPRING_SOFT, delay: 0.1 }}
            >
              {index + 1}
            </m.span>
            <div className="flex flex-col gap-1.5 rounded-lg border border-line/70 bg-panel p-4 shadow-card md:p-6">
              <span className="text-eyebrow text-accent uppercase">
                Шаг {index + 1} из {bullets.length}
              </span>
              <h4 className="font-display text-lg leading-snug font-semibold tracking-tight text-balance md:text-xl">
                <RichText as="span" text={lead} />
              </h4>
              {rest && <RichText text={rest} className="text-body leading-relaxed text-muted text-pretty md:text-base" />}
            </div>
          </m.li>
        )
      })}
      <m.li
        className="relative flex items-center gap-3"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
      >
        <span className="absolute -left-14 flex size-10 items-center justify-center rounded-full border-2 border-accent bg-panel text-accent ring-4 ring-bg md:-left-20 md:size-14">
          <Flag className="size-4 md:size-5" aria-hidden />
        </span>
        <span className="font-display text-base font-semibold text-accent md:text-lg">Финиш: система работает</span>
      </m.li>
    </ol>
  )
}

const ResultsSection = ({ bullets }: { bullets: string[] }) => (
  <Stagger className="grid gap-3 sm:grid-cols-2 md:gap-4" stagger={0.1}>
    {bullets.map((bullet, index) => {
      const Icon = RESULT_ICONS[index % RESULT_ICONS.length] ?? Sparkles
      const { lead, rest } = splitLabel(bullet)
      return (
        <StaggerItem
          key={bullet}
          className="group relative flex flex-col gap-3 overflow-hidden rounded-lg border border-line/70 bg-panel p-5 shadow-card"
        >
          <div className="bg-accent-gradient absolute -top-10 -right-10 size-28 rounded-full opacity-10 transition-transform duration-700 group-hover:scale-150" />
          <span className="flex size-11 items-center justify-center rounded-md bg-accent-soft text-accent">
            <Icon className="size-5" aria-hidden />
          </span>
          {lead && <span className="font-display text-lg leading-tight font-semibold">{lead}</span>}
          <RichText text={rest} className={cn('text-body leading-relaxed text-pretty', lead ? 'text-muted' : 'font-medium text-text')} />
        </StaggerItem>
      )
    })}
  </Stagger>
)

const TagsSection = ({ bullets }: { bullets: string[] }) => (
  <Stagger className="flex flex-wrap gap-2" stagger={0.04}>
    {bullets.map((bullet) => (
      <StaggerItem
        key={bullet}
        className="inline-flex items-center gap-2 rounded-full border border-line/80 bg-panel px-3.5 py-2 text-sm font-medium text-text shadow-xs"
      >
        <span className="flex size-4 items-center justify-center rounded-full bg-accent text-accent-text">
          <Check className="size-2.5" strokeWidth={3.5} aria-hidden />
        </span>
        <RichText as="span" text={bullet} />
      </StaggerItem>
    ))}
  </Stagger>
)

const FactsSection = ({ bullets }: { bullets: string[] }) => (
  <Stagger className="grid grid-cols-3 gap-2 md:gap-3">
    {bullets.map((bullet) => {
      const { lead, rest } = splitLabel(bullet)
      return (
        <StaggerItem
          key={bullet}
          className="flex flex-col gap-1 rounded-lg border border-line/70 bg-panel/80 p-3 text-center shadow-card md:p-5"
        >
          <span className="font-display text-lg leading-tight font-bold text-accent md:text-2xl">{lead || rest}</span>
          {lead && <span className="text-xs leading-snug text-muted md:text-sm">{rest}</span>}
        </StaggerItem>
      )
    })}
  </Stagger>
)

const ContrastSection = ({ bullets }: { bullets: string[] }) => (
  <Stagger className="flex flex-col gap-3 rounded-xl bg-text p-5 text-bg shadow-float md:p-8">
    {bullets.map((bullet) => (
      <StaggerItem key={bullet} className="flex items-start gap-3 text-base leading-relaxed md:text-lg">
        <Sparkles className="mt-1 size-4 shrink-0 text-accent-2" aria-hidden />
        <RichText as="span" text={bullet} />
      </StaggerItem>
    ))}
  </Stagger>
)

const ListSection = ({ bullets }: { bullets: string[] }) => (
  <Stagger className="flex flex-col gap-2.5">
    {bullets.map((bullet) => (
      <StaggerItem key={bullet} className="flex items-start gap-3 rounded-lg border border-line/60 bg-panel/70 p-4 shadow-xs">
        <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
          <Check className="size-3" strokeWidth={3} aria-hidden />
        </span>
        <RichText text={bullet} className="text-body leading-relaxed text-text/90 text-pretty md:text-base" />
      </StaggerItem>
    ))}
  </Stagger>
)

const HighlightSection = ({ bullets, title }: SectionRendererProps) => (
  <Reveal className="bg-accent-gradient relative isolate flex flex-col gap-4 overflow-hidden rounded-xl p-6 text-accent-text shadow-glow md:p-9">
    <div className="absolute -top-16 -right-12 -z-10 size-48 rounded-full bg-white/15 blur-2xl" aria-hidden />
    <div className="absolute -bottom-20 -left-10 -z-10 size-40 rounded-full border-2 border-dashed border-white/25" aria-hidden />
    {title && (
      <span className="flex items-center gap-2 text-eyebrow uppercase opacity-90">
        <Sparkles className="size-4" aria-hidden />
        {title}
      </span>
    )}
    <ul className="flex flex-col gap-3">
      {bullets.map((bullet) => (
        <li key={bullet} className="flex items-start gap-3 font-display text-lg leading-snug font-semibold text-pretty md:text-2xl">
          <ArrowUpRight className="mt-1 size-5 shrink-0 opacity-80" aria-hidden />
          <RichText as="span" text={bullet} markClassName="bg-[linear-gradient(transparent_58%,rgb(255_255_255/35%)_58%)]" />
        </li>
      ))}
    </ul>
  </Reveal>
)

type SectionRendererProps = {
  bullets: string[]
  title?: string
}

const SECTION_RENDERERS: Record<SectionKind, ComponentType<SectionRendererProps>> = {
  pains: PainsSection,
  route: RouteSection,
  results: ResultsSection,
  highlight: HighlightSection,
  tags: TagsSection,
  facts: FactsSection,
  contrast: ContrastSection,
  list: ListSection,
}

const UNTITLED_KINDS = new Set<SectionKind>(['facts', 'highlight'])

export const ServiceSection = ({ section, index }: { section: ContentItem; index: number }) => {
  const bullets = (section.bullets ?? []).map((bullet) => bullet.trim()).filter(Boolean)
  if (bullets.length === 0) return null
  const kind = section.kind ?? 'list'
  const Renderer = SECTION_RENDERERS[kind]
  const isUntitled = UNTITLED_KINDS.has(kind)

  return (
    <section className={cn('flex flex-col gap-4 md:gap-6', kind === 'highlight' && '-mt-6 md:-mt-10')}>
      {!isUntitled && (
        <m.div
          className="flex items-baseline gap-3"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -40px 0px' }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
        >
          <span className="font-display text-sm font-bold text-accent/70 md:text-base">{String(index).padStart(2, '0')}</span>
          <h3 className="font-display text-2xl leading-tight font-bold tracking-tight text-balance md:text-3xl">{section.title}</h3>
        </m.div>
      )}
      {section.text && <RichText text={section.text} className="text-body leading-relaxed text-muted md:text-base" />}
      <Renderer bullets={bullets} title={section.title} />
    </section>
  )
}
