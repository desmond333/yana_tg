import type { ReactNode } from 'react'
import { cn } from '@/shared/lib'
import { RichText, SectionTitle } from '@/shared/ui'
import type { ContentBlock } from '../model/types'

export type BlockSectionProps = {
  block: ContentBlock
  children: ReactNode
  split?: boolean
  className?: string
}

export const BlockSection = ({ block, children, split = false, className }: BlockSectionProps) => {
  if (!block.title && !block.eyebrow && !block.subtitle) return <section className={className}>{children}</section>

  return (
    <section
      id={block.id}
      className={cn(
        'flex scroll-mt-24 flex-col gap-5',
        split && 'md:grid md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:items-start md:gap-12',
        className,
      )}
    >
      <SectionTitle
        eyebrow={block.eyebrow}
        title={block.title ?? ''}
        subtitle={block.subtitle ? <RichText text={block.subtitle} /> : undefined}
        className={cn(split && 'md:sticky md:top-24')}
      />
      <div className="min-w-0">{children}</div>
    </section>
  )
}
