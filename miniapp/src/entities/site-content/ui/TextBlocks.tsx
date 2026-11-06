import { m } from 'motion/react'
import { cn } from '@/shared/lib'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  CountUp,
  EASE_OUT_EXPO,
  Reveal,
  RichText,
  Stagger,
  StaggerItem,
} from '@/shared/ui'
import type { ContentBlock } from '../model/types'
import { BlockSection } from './BlockSection'
import { ChatThread } from './ChatThread'
import { ContentAction } from './ContentAction'

const formatIndex = (index: number): string => String(index + 1).padStart(2, '0')

export const StatsBlock = ({ block }: { block: ContentBlock }) => (
  <BlockSection block={block}>
    <Stagger className="grid grid-cols-2 gap-2.5 md:grid-cols-3 md:gap-4">
      {(block.items ?? []).map((item, index) => (
        <StaggerItem
          key={item.id}
          className={cn(
            'flex flex-col gap-1.5 rounded-lg border border-line/70 bg-panel p-4 shadow-card md:p-6',
            index === 0 && 'bg-accent-gradient col-span-2 border-transparent text-accent-text shadow-glow md:col-span-1',
          )}
        >
          <CountUp
            value={item.value ?? ''}
            className={cn('font-display text-2xl leading-none font-bold md:text-4xl', index === 0 ? 'text-accent-text' : 'text-accent')}
          />
          <span className={cn('text-sm leading-snug', index === 0 ? 'text-accent-text/85' : 'text-muted')}>{item.title}</span>
        </StaggerItem>
      ))}
    </Stagger>
  </BlockSection>
)

export const PainsBlock = ({ block }: { block: ContentBlock }) => (
  <BlockSection block={block} split>
    <div className="flex flex-col gap-4">
      <ChatThread
        messages={(block.items ?? [])
          .filter((item) => Boolean(item.title))
          .map((item) => ({ id: item.id, text: item.title ?? '', avatarUrl: item.imageUrl }))}
        reply={block.text}
      />
      {block.buttons && block.buttons.length > 0 && (
        <Reveal delay={0.3} className="flex flex-col gap-2 md:flex-row md:justify-end">
          {block.buttons.map((link) => (
            <ContentAction key={link.id} link={link} variant="soft" />
          ))}
        </Reveal>
      )}
    </div>
  </BlockSection>
)

export const BulletsBlock = ({ block }: { block: ContentBlock }) => (
  <BlockSection block={block} split>
    <ol className="flex flex-col">
      {(block.items ?? []).map((item, index) => (
        <m.li
          key={item.id}
          className="group grid grid-cols-[auto_1fr] gap-x-4 border-t border-line/70 py-5 first:border-t-0 first:pt-1 md:gap-x-6 md:py-7"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -60px 0px' }}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
        >
          <m.span
            className="text-gradient font-display text-4xl leading-none font-bold md:text-6xl"
            initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE_OUT_EXPO }}
          >
            {formatIndex(index)}
          </m.span>
          <div className="flex min-w-0 flex-col gap-1.5 pt-1">
            <h3 className="font-display text-lg leading-snug font-semibold tracking-tight text-balance md:text-2xl">{item.title}</h3>
            {item.text && <RichText text={item.text} className="text-body leading-relaxed text-muted text-pretty md:text-base" />}
            {item.href && item.buttonLabel && (
              <div className="pt-2">
                <ContentAction link={{ id: item.id, label: item.buttonLabel, href: item.href }} variant="soft" size="sm" />
              </div>
            )}
          </div>
        </m.li>
      ))}
    </ol>
  </BlockSection>
)

export const StepsBlock = ({ block }: { block: ContentBlock }) => (
  <BlockSection block={block}>
    <Stagger className="grid gap-3 md:grid-cols-2 md:gap-4">
      {(block.items ?? []).map((item, index) => (
        <StaggerItem key={item.id} className="flex gap-3 rounded-lg border border-line/70 bg-panel p-4 shadow-card md:p-6">
          <span className="bg-accent-gradient flex size-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-accent-text shadow-glow">
            {index + 1}
          </span>
          <div className="flex min-w-0 flex-col gap-1">
            <span className="text-[15px] font-semibold text-text md:text-base">{item.title}</span>
            {item.text && <RichText text={item.text} className="text-body leading-relaxed text-muted text-pretty md:text-base" />}
          </div>
        </StaggerItem>
      ))}
    </Stagger>
  </BlockSection>
)

export const TextBlock = ({ block }: { block: ContentBlock }) => {
  if (!block.text) return null
  const paragraphs = block.text.split(/\n{2,}/).filter(Boolean)

  return (
    <BlockSection block={block} split>
      <Reveal className="relative flex flex-col gap-4 border-l-2 border-accent/40 pl-5 md:pl-8">
        {paragraphs.map((paragraph, index) => (
          <RichText
            key={`${block.id}-${index}`}
            text={paragraph}
            className={cn(
              'text-base leading-relaxed text-pretty md:text-lg',
              index === 0 ? 'text-text/90' : 'text-muted',
              index === 0 &&
                'first-letter:float-left first-letter:mr-2 first-letter:font-display first-letter:text-5xl first-letter:leading-[0.9] first-letter:font-bold first-letter:text-accent',
            )}
          />
        ))}
      </Reveal>
    </BlockSection>
  )
}

export const AccordionBlock = ({ block }: { block: ContentBlock }) => (
  <BlockSection block={block} split>
    <Reveal className="rounded-lg border border-line/70 bg-panel px-4 shadow-card md:px-6">
      <Accordion type="single" collapsible>
        {(block.items ?? []).map((item) => (
          <AccordionItem key={item.id} value={item.id}>
            <AccordionTrigger>{item.title}</AccordionTrigger>
            <AccordionContent>
              <RichText text={item.text ?? ''} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Reveal>
  </BlockSection>
)

export const NoteBlock = ({ block }: { block: ContentBlock }) => (
  <p className="px-1 text-xs leading-relaxed text-muted text-pretty">{block.text}</p>
)
