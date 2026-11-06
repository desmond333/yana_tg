import { useEffect, useRef, useState, type ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'
import { m, useInView } from 'motion/react'
import { Link } from 'react-router-dom'
import { cn } from '@/shared/lib'
import { Button, CoverImage, EASE_OUT_EXPO, RichText, SPRING_SOFT, TypewriterText } from '@/shared/ui'
import { getServiceHref, splitLabel } from '../lib/text'
import type { ContentBlock } from '../model/types'

const TYPING_START_DELAY = 250
const HOLD_AFTER_TYPING = 1100

const TYPING_SPEED = {
  title: 28,
  subtitle: 9,
}

type TypingPhase = 'hidden' | 'typing' | 'shown'

const getTeaserFacts = (block: ContentBlock): string[] =>
  (block.items ?? [])
    .find((item) => item.kind === 'facts')
    ?.bullets?.filter(Boolean)
    .slice(0, 3) ?? []

const TypedField = ({
  text,
  phase,
  speed,
  startDelay = TYPING_START_DELAY,
  onComplete,
  className,
  children,
}: {
  text: string
  phase: TypingPhase
  speed: number
  startDelay?: number
  onComplete?: () => void
  className?: string
  children?: ReactNode
}) => {
  const content = children ?? text

  if (phase !== 'typing') {
    return <span className={cn('relative', phase === 'hidden' && 'invisible', className)}>{content}</span>
  }

  return (
    <span className={cn('relative', className)}>
      <span className="invisible" aria-hidden>
        {content}
      </span>
      <TypewriterText
        text={text}
        active
        speed={speed}
        startDelay={startDelay}
        endDelay={60}
        onComplete={onComplete}
        className="absolute inset-0"
      />
    </span>
  )
}

export const ServiceCard = ({
  block,
  active = false,
  showText = false,
  ready = true,
  hoverEnabled = true,
  onTyped,
}: {
  block: ContentBlock
  active?: boolean
  showText?: boolean
  ready?: boolean
  hoverEnabled?: boolean
  onTyped?: () => void
}) => {
  const href = getServiceHref(block.id)
  const facts = getTeaserFacts(block)
  const cleanTitle = block.title ?? ''
  const cleanSubtitle = block.subtitle ? block.subtitle.replace(/\*\*/g, '') : ''

  const [titleDone, setTitleDone] = useState(false)
  const [subtitleDone, setSubtitleDone] = useState(!block.subtitle)
  const [hasTyped, setHasTyped] = useState(false)

  const activeNow = active && ready
  const isComplete = hasTyped || showText
  const ctaVisible = isComplete || (titleDone && subtitleDone)

  const subtitleClass = cn(
    'block text-body leading-relaxed text-pretty transition-colors duration-800',
    activeNow ? 'text-text/85' : 'text-muted',
  )

  const resolvePhase = (isDone: boolean): TypingPhase => {
    if (isComplete || isDone) return 'shown'
    if (activeNow) return 'typing'
    return 'hidden'
  }

  const titlePhase = resolvePhase(titleDone)
  const subtitlePhase = resolvePhase(subtitleDone)

  const checkBothDone = (nextTitleDone: boolean, nextSubDone: boolean) => {
    if (nextTitleDone && nextSubDone && !hasTyped) {
      setHasTyped(true)
      onTyped?.()
    }
  }

  const handleTitleDone = () => {
    setTitleDone(true)
    const subDone = !cleanSubtitle || subtitleDone
    checkBothDone(true, subDone)
  }

  const handleSubtitleDone = () => {
    setSubtitleDone(true)
    checkBothDone(titleDone, true)
  }

  return (
    <m.article
      id={block.id}
      className={cn(
        'relative flex h-full scroll-mt-24 flex-col overflow-hidden rounded-xl border bg-panel transition-[border-color,box-shadow] duration-800 ease-in-out',
        hoverEnabled && 'group',
        active ? 'border-accent/40 shadow-float' : 'border-line/70 shadow-card',
      )}
      whileHover={hoverEnabled ? { y: -6 } : undefined}
      transition={SPRING_SOFT}
    >
      {active && (
        <span
          className="pointer-events-none absolute inset-x-6 top-0 z-10 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent"
          aria-hidden
        />
      )}
      <Link to={href} className="relative block overflow-hidden" tabIndex={-1} aria-hidden>
        <CoverImage
          src={block.imageUrl}
          alt=""
          className="h-44 w-full transition-transform duration-700 ease-(--ease-out-expo) group-hover:scale-105 md:h-48"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        {block.eyebrow && (
          <span
            className={cn(
              'absolute top-3 left-3 rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-[0.14em] text-white uppercase backdrop-blur-md transition-colors duration-800',
              active ? 'bg-accent/85' : 'bg-black/40',
            )}
          >
            {block.eyebrow}
          </span>
        )}
        {block.badge && (
          <span className="glass absolute right-3 bottom-3 rounded-full border px-3 py-1.5 font-display text-sm font-bold text-text shadow-card">
            {block.badge}
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-5 md:p-6">
        <h2
          className={cn(
            'font-display text-[1.45rem] leading-tight font-bold tracking-tight text-balance transition-colors duration-800',
            activeNow ? 'text-accent' : 'text-text',
          )}
        >
          <TypedField text={cleanTitle} phase={titlePhase} speed={TYPING_SPEED.title} onComplete={handleTitleDone} className="block" />
        </h2>
        {block.subtitle && (
          <TypedField
            text={cleanSubtitle}
            phase={subtitlePhase}
            speed={TYPING_SPEED.subtitle}
            onComplete={handleSubtitleDone}
            className={subtitleClass}
          >
            <RichText as="span" text={block.subtitle} />
          </TypedField>
        )}

        {facts.length > 0 && (
          <div
            className={cn(
              'mt-1 flex flex-col border-y border-line/60 transition-[opacity,translate] duration-700 ease-(--ease-out-expo)',
              !ctaVisible && 'pointer-events-none translate-y-2 opacity-0',
            )}
          >
            {facts.map((fact) => {
              const { lead, rest } = splitLabel(fact)
              return (
                <div key={fact} className="flex items-baseline justify-between gap-3 border-t border-line/50 py-2.5 first:border-t-0">
                  <span className="flex items-baseline gap-2">
                    <span className="size-1 shrink-0 rounded-full bg-accent/45" aria-hidden />
                    <span
                      className={cn(
                        'font-display text-[15px] leading-none font-semibold tracking-[-0.01em] tabular-nums transition-colors duration-800',
                        activeNow ? 'text-accent' : 'text-text',
                      )}
                    >
                      {lead || rest}
                    </span>
                  </span>
                  {lead && <span className="text-right text-xs leading-snug text-muted">{rest}</span>}
                </div>
              )
            })}
          </div>
        )}

        <div
          className={cn(
            'mt-auto pt-3 transition-[opacity,translate] duration-700 ease-(--ease-out-expo)',
            !ctaVisible && 'pointer-events-none translate-y-2 opacity-0',
          )}
        >
          <Button asChild size="md" className="w-full">
            <Link to={href}>
              Читать подробнее
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
            </Link>
          </Button>
        </div>
      </div>
    </m.article>
  )
}

const getSpotlightState = (isActive: boolean, activeIndex: number) => {
  if (activeIndex === -1) return { opacity: 1, scale: 1, y: 0 }
  if (isActive) return { opacity: 1, scale: 1.035, y: -6 }
  return { opacity: 0.78, scale: 0.985, y: 0 }
}

export const ServiceGrid = ({ blocks }: { blocks: ContentBlock[] }) => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '0px 0px -45% 0px' })
  const [activeIndex, setActiveIndex] = useState(0)
  const holdTimer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(holdTimer.current), [])

  const handleCardTyped = (index: number) => {
    const next = index + 1 < blocks.length ? index + 1 : -1
    holdTimer.current = window.setTimeout(() => setActiveIndex(next), HOLD_AFTER_TYPING)
  }

  return (
    <div ref={ref} className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {blocks.map((block, index) => {
        const isActive = activeIndex === index

        return (
          <div key={block.id} className="relative isolate flex h-full">
            <m.div
              aria-hidden
              className="pointer-events-none absolute -inset-3 -z-10 rounded-[2rem] bg-[radial-gradient(circle,color-mix(in_srgb,var(--accent)_30%,transparent)_0%,transparent_70%)]"
              initial={false}
              animate={{ opacity: isInView && isActive ? 0.75 : 0, scale: isActive ? 1 : 0.96 }}
              transition={{ duration: 1.2, ease: EASE_OUT_EXPO }}
            />
            <m.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.7, delay: index * 0.08, ease: EASE_OUT_EXPO }}
              className="relative h-full w-full"
            >
              <m.div
                initial={false}
                animate={getSpotlightState(isActive, activeIndex)}
                transition={{ duration: 1.2, ease: EASE_OUT_EXPO }}
                className="h-full transform-gpu will-change-transform"
              >
                <ServiceCard
                  block={block}
                  active={isActive}
                  showText={activeIndex === -1}
                  ready={isInView}
                  hoverEnabled={activeIndex === -1}
                  onTyped={() => handleCardTyped(index)}
                />
              </m.div>
            </m.div>
          </div>
        )
      })}
    </div>
  )
}
