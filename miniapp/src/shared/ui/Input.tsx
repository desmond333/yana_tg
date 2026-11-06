import type { InputHTMLAttributes } from 'react'
import { cn } from '../lib'

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean
}

export const Input = ({ className, error, type = 'text', ...props }: InputProps) => (
  <input
    aria-invalid={error || undefined}
    type={type}
    className={cn(
      'flex min-h-12 w-full rounded-md border border-line bg-panel px-4 py-3 text-base text-text shadow-xs transition-[border-color,box-shadow] duration-200',
      'placeholder:text-muted/70',
      'focus-visible:border-accent focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/15',
      'disabled:cursor-not-allowed disabled:opacity-50',
      error && 'border-danger focus-visible:border-danger focus-visible:ring-danger',
      className,
    )}
    {...props}
  />
)
