import type { HTMLAttributes } from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '../lib'

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  interactive?: boolean
  asChild?: boolean
}

export const Card = ({ className, interactive, asChild = false, ...props }: CardProps) => {
  const Comp = asChild ? Slot : 'div'

  return (
    <Comp
      className={cn(
        'rounded-lg border border-line/70 bg-panel p-5 text-text shadow-card',
        'transition-[transform,box-shadow,border-color] duration-300 ease-(--ease-spring)',
        interactive && 'cursor-pointer hover:-translate-y-0.5 hover:shadow-float active:scale-[0.98]',
        className,
      )}
      {...props}
    />
  )
}

export const CardHeader = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col gap-1.5 pb-3', className)} {...props} />
)

export const CardTitle = ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={cn('font-display text-xl font-semibold tracking-[-0.01em] text-text', className)} {...props} />
)

export const CardDescription = ({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn('text-body text-muted text-pretty', className)} {...props} />
)

export const CardContent = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => <div className={cn('pt-1', className)} {...props} />

export const CardFooter = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex items-center pt-4', className)} {...props} />
)
