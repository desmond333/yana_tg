import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../lib'

export type EmptyStateProps = HTMLAttributes<HTMLDivElement> & {
  icon?: ReactNode
  title: string
  description?: string
  action?: ReactNode
}

export const EmptyState = ({ icon, title, description, action, className, ...props }: EmptyStateProps) => (
  <div
    className={cn(
      'flex flex-col items-center justify-center rounded-lg border border-dashed border-line bg-panel/50 p-8 text-center',
      className,
    )}
    {...props}
  >
    {icon && (
      <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-panel-2 text-muted" aria-hidden>
        {icon}
      </div>
    )}
    <h3 className="font-display text-base font-semibold text-text">{title}</h3>
    {description && <p className="mt-1 max-w-sm text-body text-muted text-balance">{description}</p>}
    {action && <div className="mt-4">{action}</div>}
  </div>
)
