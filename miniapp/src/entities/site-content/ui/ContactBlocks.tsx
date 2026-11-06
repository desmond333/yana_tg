import { ArrowUpRight, AtSign, Link2, Play, Send, type LucideIcon } from 'lucide-react'
import { Badge, CtaBanner, RichText, Stagger, StaggerItem } from '@/shared/ui'
import { getExternalLinkProps } from '../lib/links'
import type { ContentBlock } from '../model/types'
import { BlockSection } from './BlockSection'
import { ContentAction } from './ContentAction'

const CONTACT_ICONS: { match: string; icon: LucideIcon }[] = [
  { match: 'telegram', icon: Send },
  { match: 'instagram', icon: AtSign },
  { match: 'youtube', icon: Play },
  { match: 'threads', icon: AtSign },
]

const getContactIcon = (title = ''): LucideIcon => CONTACT_ICONS.find((entry) => title.toLowerCase().includes(entry.match))?.icon ?? Link2

const CONTACT_CLASSES = 'group flex w-full items-center gap-4 rounded-lg border border-line/70 bg-panel p-4 text-left shadow-card'

export const ContactsBlock = ({ block }: { block: ContentBlock }) => (
  <BlockSection block={block}>
    <Stagger className="grid gap-2.5 md:grid-cols-2 md:gap-4">
      {(block.items ?? []).map((item) => {
        const Icon = getContactIcon(item.title)
        const content = (
          <>
            <span className="bg-accent-gradient flex size-11 shrink-0 items-center justify-center rounded-full text-accent-text shadow-glow">
              <Icon className="size-5" aria-hidden />
            </span>
            <span className="flex min-w-0 flex-1 flex-col">
              <span className="font-display text-base font-semibold">{item.title}</span>
              {item.subtitle && <span className="truncate text-sm text-muted">{item.subtitle}</span>}
            </span>
            {item.href ? (
              <ArrowUpRight
                className="size-5 text-muted transition-transform duration-300 ease-(--ease-spring) group-hover:rotate-45 group-hover:text-accent"
                aria-hidden
              />
            ) : (
              <Badge variant="outline" className="text-[10px]">
                Скоро
              </Badge>
            )}
          </>
        )

        return (
          <StaggerItem key={item.id}>
            {item.href ? (
              <a
                href={item.href}
                {...getExternalLinkProps(item.href)}
                className={`${CONTACT_CLASSES} transition-[transform,box-shadow] duration-300 ease-(--ease-spring) hover:shadow-float active:scale-[0.97]`}
              >
                {content}
              </a>
            ) : (
              <div className={CONTACT_CLASSES}>{content}</div>
            )}
          </StaggerItem>
        )
      })}
    </Stagger>
  </BlockSection>
)

export const CtaBlock = ({ block }: { block: ContentBlock }) => (
  <CtaBanner
    eyebrow={block.eyebrow}
    title={block.title ?? ''}
    subtitle={
      block.subtitle ? (
        <RichText text={block.subtitle} markClassName="bg-[linear-gradient(transparent_58%,rgb(255_255_255/35%)_58%)]" />
      ) : undefined
    }
    action={
      <div className="flex flex-col gap-2 md:flex-row">
        {(block.buttons ?? []).map((link) => (
          <ContentAction key={link.id} link={link} variant="glass" size="lg" />
        ))}
      </div>
    }
  />
)
