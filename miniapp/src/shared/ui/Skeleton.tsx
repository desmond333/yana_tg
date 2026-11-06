import type { HTMLAttributes } from 'react'
import { cn } from '../lib'

export const Skeleton = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'animate-shimmer rounded-md bg-[linear-gradient(90deg,var(--panel-2)_0%,var(--panel)_50%,var(--panel-2)_100%)] bg-size-[200%_100%]',
      className,
    )}
    aria-hidden
    {...props}
  />
)
