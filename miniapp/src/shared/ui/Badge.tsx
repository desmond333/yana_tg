import type { HTMLAttributes } from 'react'
import { cn } from '../lib'

export type BadgeVariant = 'default' | 'accent' | 'soft' | 'outline' | 'glass' | 'success' | 'danger'

const BADGE_VARIANTS: Record<BadgeVariant, string> = {
  default: 'bg-panel-2 text-text border-transparent',
  accent: 'bg-accent-gradient text-accent-text border-transparent',
  soft: 'bg-accent-soft text-accent border-transparent',
  outline: 'bg-transparent text-muted border-line',
  glass: 'bg-black/35 text-white border-white/20 backdrop-blur-md',
  success: 'bg-emerald-500/15 text-emerald-700 border-transparent',
  danger: 'bg-danger/15 text-danger border-transparent',
}

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant
}

export const Badge = ({ className, variant = 'default', ...props }: BadgeProps) => (
  <span
    className={cn(
      'inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] leading-none font-semibold whitespace-nowrap transition-colors',
      BADGE_VARIANTS[variant],
      className,
    )}
    {...props}
  />
)
