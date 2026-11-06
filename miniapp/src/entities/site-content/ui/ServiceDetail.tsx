import { ArrowLeft } from 'lucide-react'
import { m, useScroll, useSpring } from 'motion/react'
import { Link } from 'react-router-dom'
import { ROUTES } from '@/shared/config'
import { cn } from '@/shared/lib'
import { CoverImage, EASE_OUT_EXPO, Reveal, RichText, TextReveal } from '@/shared/ui'
import type { ContentBlock, ContentItem } from '../model/types'
import { ContentAction } from './ContentAction'
import { ServiceSection } from './ServiceSections'

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28 })

  return <m.div className="bg-accent-gradient fixed inset-x-0 top-0 z-40 h-1 origin-left shadow-glow" style={{ scaleX }} aria-hidden />
}

const ServiceCta = ({ block, className }: { block: ContentBlock; className?: string }) => (
  <Reveal className={cn('flex flex-col gap-4 rounded-xl border border-line/70 bg-panel p-5 shadow-float md:p-6', className)}>
    <div className="flex flex-col gap-1">
      <span className="text-eyebrow text-muted uppercase">{block.title}</span>
      <span className="font-display text-2xl font-bold text-accent">{block.badge}</span>
    </div>
    {block.text && <RichText text={block.text} className="text-body leading-relaxed text-muted text-pretty" />}
    <div className="flex flex-col gap-2">
      {(block.buttons ?? []).map((link) => (
        <ContentAction key={link.id} link={link} size="lg" className="w-full" />
      ))}
    </div>
  </Reveal>
)

const numberSections = (items: ContentItem[]): { section: ContentItem; index: number }[] => {
  let counter = 0
  return items.map((section) => {
    if (section.kind !== 'facts' && section.kind !== 'highlight') counter += 1
    return { section, index: counter }
  })
}

export const ServiceDetail = ({ block }: { block: ContentBlock }) => (
  <article className="flex flex-col gap-8 pb-6 md:gap-14">
    <ScrollProgress />

    <Link
      to={ROUTES.services}
      className="group flex w-fit items-center gap-2 text-sm font-semibold text-muted transition-colors hover:text-accent"
    >
      <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" aria-hidden />
      Все услуги
    </Link>

    <header className="flex flex-col gap-5 md:grid md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] md:items-center md:gap-12">
      <m.div
        className="relative overflow-hidden rounded-xl border border-line/70 shadow-float md:order-2"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE_OUT_EXPO }}
      >
        <CoverImage src={block.imageUrl} alt={block.title ?? ''} priority className="aspect-[16/10] w-full" />
        {block.badge && (
          <span className="glass absolute right-3 bottom-3 rounded-full border px-3.5 py-1.5 font-display text-base font-bold text-text shadow-card">
            {block.badge}
          </span>
        )}
      </m.div>
      <div className="flex flex-col gap-4">
        {block.eyebrow && (
          <span className="w-fit rounded-full bg-accent-soft px-3 py-1 text-eyebrow text-accent uppercase">{block.eyebrow}</span>
        )}
        <TextReveal
          text={block.title ?? ''}
          className="font-display text-[2.2rem] leading-[1.05] font-semibold tracking-[-0.015em] text-balance md:text-5xl"
        />
        {block.subtitle && (
          <Reveal delay={0.3} y={12}>
            <RichText text={block.subtitle} className="text-body leading-relaxed text-muted text-pretty md:text-lead" />
          </Reveal>
        )}
      </div>
    </header>

    <div className="flex flex-col gap-12 lg:grid lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start lg:gap-14">
      <div className="flex min-w-0 flex-col gap-12 md:gap-16">
        {numberSections(block.items ?? []).map(({ section, index }) => (
          <ServiceSection key={section.id} section={section} index={index} />
        ))}
      </div>

      <aside className="hidden lg:sticky lg:top-24 lg:block">
        <ServiceCta block={block} />
      </aside>
    </div>

    <ServiceCta block={block} className="lg:hidden" />
  </article>
)
