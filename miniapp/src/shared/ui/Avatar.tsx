import * as AvatarPrimitive from '@radix-ui/react-avatar'
import type { ComponentPropsWithoutRef } from 'react'
import { cn } from '../lib'

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl'

const AVATAR_SIZE_CLASSES: Record<AvatarSize, string> = {
  sm: 'size-8 text-xs',
  md: 'size-11 text-sm',
  lg: 'size-16 text-base',
  xl: 'size-24 text-xl',
}

export type AvatarProps = ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> & {
  size?: AvatarSize
}

export const Avatar = ({ size = 'md', className, ...props }: AvatarProps) => (
  <AvatarPrimitive.Root
    className={cn(
      'relative flex shrink-0 overflow-hidden rounded-full border border-line bg-panel-2 font-medium',
      AVATAR_SIZE_CLASSES[size],
      className,
    )}
    {...props}
  />
)

export const AvatarImage = ({ className, ...props }: ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>) => (
  <AvatarPrimitive.Image className={cn('aspect-square size-full object-cover', className)} {...props} />
)

export const AvatarFallback = ({ className, ...props }: ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>) => (
  <AvatarPrimitive.Fallback
    className={cn('flex size-full items-center justify-center bg-accent-soft text-accent font-semibold select-none', className)}
    {...props}
  />
)
