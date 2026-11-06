import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '../lib'

export type ChipProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean
  icon?: ReactNode
  badge?: ReactNode
}

const getChipClass = (active: boolean): string => {
  if (active) {
    return 'border-accent bg-accent text-accent-text shadow-sm'
  }
  return 'border-line bg-panel text-muted hover:border-accent hover:text-text'
}

const getBadgeClass = (active: boolean): string => {
  if (active) {
    return 'bg-white/20 text-accent-text'
  }
  return 'bg-panel-2 text-muted'
}

export const Chip = ({ active = false, icon, badge, className, children, type = 'button', ...props }: ChipProps) => (
  <button
    type={type}
    aria-pressed={active}
    className={cn(
      'inline-flex min-h-11 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-150 select-none',
      'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
      'disabled:pointer-events-none disabled:opacity-50 active:scale-[0.97]',
      getChipClass(active),
      className,
    )}
    {...props}
  >
    {icon && (
      <span className="shrink-0" aria-hidden>
        {icon}
      </span>
    )}
    <span>{children}</span>
    {badge !== undefined && (
      <span className={cn('ml-0.5 rounded-full px-1.5 py-0.5 text-xs font-semibold', getBadgeClass(active))}>{badge}</span>
    )}
  </button>
)
