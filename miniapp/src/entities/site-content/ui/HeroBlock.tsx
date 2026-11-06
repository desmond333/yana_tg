import { m } from 'motion/react'
import { cn } from '@/shared/lib'
import { CountUp, CoverImage, EASE_OUT_EXPO, OrbitDecoration, Reveal, RichText, Stagger, StaggerItem, TextReveal } from '@/shared/ui'
import type { ContentBlock } from '../model/types'
import { ContentAction } from './ContentAction'

const HeroStats = ({ block }: { block: ContentBlock }) => {
  const stats = block.items ?? []
  if (stats.length === 0) return null

  return (
    <Stagger className="grid grid-cols-2 gap-2.5 md:grid-cols-4 md:gap-4">
      {stats.map((stat, index) => (
        <StaggerItem
          key={stat.id}
          className={cn(
            'flex flex-col gap-1.5 rounded-lg border border-line/70 bg-panel/80 p-4 shadow-card backdrop-blur-sm md:p-5',
            index === 0 && 'bg-accent-gradient border-transparent text-accent-text shadow-glow',
          )}
        >
          <CountUp
            value={stat.value ?? ''}
            className={cn('font-display text-2xl leading-none font-bold md:text-4xl', index === 0 ? 'text-accent-text' : 'text-accent')}
          />
          <span className={cn('text-sm leading-snug', index === 0 ? 'text-accent-text/85' : 'text-muted')}>{stat.title}</span>
        </StaggerItem>
      ))}
    </Stagger>
  )
}

const HeroIntro = ({ block }: { block: ContentBlock }) => (
  <section className="relative isolate flex flex-col gap-5 overflow-hidden rounded-xl border border-line/60 bg-panel/60 px-5 py-10 shadow-card backdrop-blur-sm md:px-14 md:py-20">
    <m.div
      aria-hidden
      className="bg-accent-gradient absolute -top-24 -right-20 -z-10 size-64 rounded-full opacity-25 blur-3xl md:size-96"
      animate={{ scale: [1, 1.15, 1], rotate: [0, 30, 0] }}
      transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
    />
    <OrbitDecoration className="pointer-events-none absolute -bottom-28 -left-28 -z-10 size-72 overflow-visible md:-bottom-36 md:-left-36 md:size-[28rem]" />
    {block.eyebrow && (
      <Reveal y={12} className="w-fit rounded-full bg-accent-soft px-3 py-1 text-eyebrow text-accent uppercase">
        {block.eyebrow}
      </Reveal>
    )}
    <TextReveal
      text={block.title ?? ''}
      className="max-w-3xl font-display text-[2.3rem] leading-[1.05] font-bold tracking-[-0.015em] text-balance md:text-6xl"
    />
    {block.subtitle && (
      <Reveal delay={0.25}>
        <RichText text={block.subtitle} className="max-w-2xl text-body leading-relaxed text-muted text-pretty md:text-lead" />
      </Reveal>
    )}
    {block.buttons && block.buttons.length > 0 && (
      <Reveal delay={0.4} className="flex flex-col gap-2 pt-2 md:flex-row">
        {block.buttons.map((link) => (
          <ContentAction key={link.id} link={link} size="lg" />
        ))}
      </Reveal>
    )}
  </section>
)

const HeroCover = ({ block }: { block: ContentBlock }) => (
  <section className="relative md:grid md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:items-center md:gap-12">
    <m.div
      className="relative isolate md:col-start-2 md:row-start-1 md:rotate-2"
      initial={{ opacity: 0, scale: 0.94, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.9, ease: EASE_OUT_EXPO }}
    >
      <div className="relative isolate animate-float [animation-duration:9s]">
        <OrbitDecoration className="pointer-events-none absolute top-1/2 left-1/2 -z-20 h-[120%] w-[134%] -translate-x-1/2 -translate-y-1/2 opacity-80" />
        <div aria-hidden className="absolute -inset-3 -z-10 animate-breathe rounded-[2.25rem] bg-accent/15 blur-2xl md:-inset-7" />
        <div className="relative overflow-hidden rounded-xl p-[2px] shadow-float">
          <div aria-hidden className="absolute inset-0 flex items-center justify-center">
            <div
              className="aspect-square w-[200%] shrink-0 animate-spin-slow"
              style={{
                backgroundImage:
                  'conic-gradient(from 0deg, color-mix(in srgb, var(--accent) 14%, transparent) 0deg, color-mix(in srgb, var(--accent) 14%, transparent) 270deg, var(--accent) 318deg, var(--accent-2) 338deg, color-mix(in srgb, var(--accent) 14%, transparent) 360deg)',
                animationDuration: '16s',
              }}
            />
          </div>
          <div className="relative isolate overflow-hidden rounded-[calc(var(--radius-xl)-2px)] border border-line/70">
            <CoverImage src={block.imageUrl} alt={block.title ?? ''} priority className="aspect-[4/5] w-full md:aspect-[4/5]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/5 md:hidden" aria-hidden />
            <span className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
              <span className="absolute inset-y-0 -left-1/3 w-1/3 animate-glint bg-[linear-gradient(90deg,transparent,rgb(255_255_255/18%),transparent)]" />
            </span>
          </div>
        </div>
        <span
          aria-hidden
          className="absolute top-10 -right-1 size-1.5 animate-pulse rounded-full bg-accent-2 shadow-[0_0_10px_var(--accent)]"
        />
        <span
          aria-hidden
          className="absolute bottom-20 -left-1.5 size-1 animate-pulse rounded-full bg-accent/70 shadow-[0_0_8px_var(--accent)] [animation-delay:1.6s]"
        />
      </div>
    </m.div>

    <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-5 text-white md:static md:col-start-1 md:row-start-1 md:gap-5 md:p-0 md:text-text">
      {block.eyebrow && (
        <span className="w-fit rounded-full bg-white/15 px-2.5 py-1 text-eyebrow uppercase backdrop-blur-md md:bg-accent-soft md:px-3 md:text-accent">
          {block.eyebrow}
        </span>
      )}
      <TextReveal
        text={block.title ?? ''}
        delay={0.15}
        className="font-display text-[2.15rem] leading-[1.05] font-bold tracking-[-0.015em] text-balance md:text-6xl"
      />
      {block.subtitle && (
        <Reveal delay={0.35} blur={false} y={12}>
          <RichText
            text={block.subtitle}
            className="max-w-prose text-body leading-relaxed text-white/85 text-pretty md:text-lead md:text-muted"
          />
        </Reveal>
      )}
      {block.buttons && block.buttons.length > 0 && (
        <Reveal delay={0.5} blur={false} y={12} className="flex flex-col gap-2 pt-1 md:flex-row">
          {block.buttons.map((link) => (
            <ContentAction
              key={link.id}
              link={link}
              variant="glass"
              size="lg"
              className="md:bg-accent-gradient md:border-transparent md:text-accent-text md:shadow-glow"
            />
          ))}
        </Reveal>
      )}
    </div>
  </section>
)

export const HeroBlock = ({ block }: { block: ContentBlock }) => (
  <div className="flex flex-col gap-4 md:gap-10">
    {block.imageUrl ? <HeroCover block={block} /> : <HeroIntro block={block} />}
    <HeroStats block={block} />
  </div>
)
