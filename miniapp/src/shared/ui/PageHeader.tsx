import { type ReactNode } from 'react'
import { ChevronLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from '../lib'
import { Reveal } from './motion/Reveal'
import { TextReveal } from './motion/TextReveal'

export type PageHeaderProps = {
  title: string
  subtitle?: string
  eyebrow?: string
  backTo?: string
  backLabel?: string
  action?: ReactNode
  className?: string
}

export const PageHeader = ({ title, subtitle, eyebrow, backTo, backLabel, action, className }: PageHeaderProps) => (
  <header className={cn('flex flex-col gap-2', className)}>
    {(backTo || action) && (
      <div className="flex items-center justify-between gap-2">
        {backTo ? (
          <Link
            to={backTo}
            className="glass -ml-1 inline-flex min-h-9 w-fit items-center gap-1 rounded-full border py-1 pr-3.5 pl-2 text-sm font-medium text-muted transition-[color,border-color,transform] duration-300 ease-(--ease-spring) hover:border-accent/35 hover:text-text active:scale-95"
            aria-label={backLabel}
          >
            <ChevronLeft className="size-4" aria-hidden />
            <span>{backLabel}</span>
          </Link>
        ) : (
          <span />
        )}
        {action && <div className="shrink-0">{action}</div>}
      </div>
    )}
    {eyebrow && (
      <Reveal y={10} blur={false} className="text-eyebrow text-accent uppercase">
        {eyebrow}
      </Reveal>
    )}
    <TextReveal text={title} className="font-display text-[2.25rem] leading-[1.06] font-semibold tracking-[-0.015em] md:text-5xl" />
    {subtitle && (
      <Reveal delay={0.15} y={12} className="text-body text-muted text-pretty md:text-lead">
        {subtitle}
      </Reveal>
    )}
  </header>
)
