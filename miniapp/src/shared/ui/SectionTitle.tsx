import type { ReactNode } from 'react'
import { cn } from '../lib'
import { Reveal } from './motion/Reveal'

export type SectionTitleProps = {
  title: string
  subtitle?: ReactNode
  eyebrow?: string
  action?: ReactNode
  className?: string
}

export const SectionTitle = ({ title, subtitle, eyebrow, action, className }: SectionTitleProps) => (
  <Reveal y={20} className={cn('flex items-end justify-between gap-4 pb-1', className)}>
    <div className="flex min-w-0 flex-col gap-1.5">
      {eyebrow && <span className="text-eyebrow text-accent uppercase">{eyebrow}</span>}
      <h2 className="font-display text-[1.75rem] leading-[1.08] font-semibold tracking-[-0.015em] text-balance md:text-[2.6rem]">
        {title}
      </h2>
      {subtitle && <div className="text-body text-muted text-pretty md:text-lead">{subtitle}</div>}
    </div>
    {action && <div className="shrink-0 pb-0.5">{action}</div>}
  </Reveal>
)
