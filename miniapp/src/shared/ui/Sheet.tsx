import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import type { ComponentPropsWithoutRef, HTMLAttributes } from 'react'
import { cn } from '../lib'

export const Sheet = DialogPrimitive.Root
export const SheetTrigger = DialogPrimitive.Trigger
export const SheetClose = DialogPrimitive.Close
export const SheetPortal = DialogPrimitive.Portal

export type SheetSide = 'bottom' | 'top' | 'right' | 'left'

const SHEET_SIDE_CLASSES: Record<SheetSide, string> = {
  bottom: 'inset-x-0 bottom-0 rounded-t-lg border-t border-line max-h-[90vh]',
  top: 'inset-x-0 top-0 rounded-b-lg border-b border-line max-h-[90vh]',
  right: 'inset-y-0 right-0 h-full w-3/4 max-w-sm rounded-l-lg border-l border-line',
  left: 'inset-y-0 left-0 h-full w-3/4 max-w-sm rounded-r-lg border-r border-line',
}

export type SheetContentProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
  side?: SheetSide
}

export const SheetOverlay = ({ className, ...props }: ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>) => (
  <DialogPrimitive.Overlay
    className={cn('fixed inset-0 z-50 bg-black/40 backdrop-blur-xs transition-opacity duration-200', className)}
    {...props}
  />
)

export const SheetContent = ({ side = 'bottom', className, children, ...props }: SheetContentProps) => (
  <SheetPortal>
    <SheetOverlay />
    <DialogPrimitive.Content
      className={cn('fixed z-50 flex flex-col bg-panel p-6 shadow-float transition-all duration-200', SHEET_SIDE_CLASSES[side], className)}
      {...props}
    >
      {side === 'bottom' && <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-line" aria-hidden />}
      {children}
      <DialogPrimitive.Close
        className="absolute right-4 top-4 flex size-11 items-center justify-center rounded-sm text-muted hover:text-text focus-visible:outline-2 focus-visible:outline-accent"
        aria-label="Close"
      >
        <X className="size-4" aria-hidden />
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </SheetPortal>
)

export const SheetHeader = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col gap-1.5 text-left pb-4', className)} {...props} />
)

export const SheetTitle = ({ className, ...props }: ComponentPropsWithoutRef<typeof DialogPrimitive.Title>) => (
  <DialogPrimitive.Title className={cn('font-display text-lg font-semibold tracking-tight text-text', className)} {...props} />
)

export const SheetDescription = ({ className, ...props }: ComponentPropsWithoutRef<typeof DialogPrimitive.Description>) => (
  <DialogPrimitive.Description className={cn('text-sm text-muted text-balance', className)} {...props} />
)
