import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { Check } from 'lucide-react'
import type { ComponentPropsWithoutRef } from 'react'
import { cn } from '../lib'

export type CheckboxProps = ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & {
  label?: string
  description?: string
  error?: boolean
}

export const Checkbox = ({ className, label, description, error, id, ...props }: CheckboxProps) => {
  const checkboxControl = (
    <CheckboxPrimitive.Root
      id={id}
      className={cn(
        'peer size-5 shrink-0 rounded-sm border border-line bg-panel transition-colors',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'data-[state=checked]:border-accent data-[state=checked]:bg-accent data-[state=checked]:text-accent-text',
        error && 'border-danger',
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
        <Check className="size-3.5 stroke-[3]" aria-hidden />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )

  if (!label && !description) {
    return checkboxControl
  }

  return (
    <label htmlFor={id} className="flex min-h-11 cursor-pointer items-start gap-3 select-none py-1">
      <div className="pt-0.5">{checkboxControl}</div>
      <div className="flex flex-col gap-0.5">
        {label && <span className="text-sm font-medium text-text">{label}</span>}
        {description && <span className="text-xs text-muted leading-relaxed">{description}</span>}
      </div>
    </label>
  )
}
