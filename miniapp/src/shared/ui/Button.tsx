import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '../lib'

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'soft' | 'glass' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon'

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: 'bg-accent-gradient text-accent-text shadow-glow hover:brightness-105',
  secondary: 'bg-panel-2 text-text hover:bg-line',
  outline: 'border border-line bg-transparent text-text hover:bg-panel-2',
  ghost: 'bg-transparent text-text hover:bg-panel-2',
  soft: 'bg-accent-soft text-accent hover:brightness-105',
  glass: 'glass border text-text shadow-card hover:border-accent/35 hover:shadow-float',
  danger: 'bg-danger text-white hover:brightness-105',
}

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'min-h-9 px-3.5 text-xs rounded-full gap-1.5',
  md: 'min-h-11 px-5 text-[15px] font-semibold rounded-full gap-2',
  lg: 'min-h-13 px-6 text-[15px] font-semibold rounded-full gap-2.5',
  icon: 'size-11 p-0 rounded-full shrink-0 justify-center',
}

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
  asChild?: boolean
  shine?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  asChild = false,
  shine = false,
  leftIcon,
  rightIcon,
  className,
  children,
  type = 'button',
  disabled,
  ...props
}: ButtonProps) => {
  const commonClasses = cn(
    'inline-flex items-center justify-center select-none font-medium whitespace-nowrap',
    'transition-[transform,filter,background-color,box-shadow] duration-300 ease-(--ease-spring) active:scale-[0.95]',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
    'disabled:pointer-events-none disabled:opacity-50',
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    shine && 'shine',
    className,
  )

  if (asChild) {
    return (
      <Slot className={commonClasses} {...props}>
        {children}
      </Slot>
    )
  }

  return (
    <button type={type} disabled={disabled} aria-disabled={disabled} className={commonClasses} {...props}>
      {leftIcon && (
        <span className="shrink-0" aria-hidden>
          {leftIcon}
        </span>
      )}
      {children}
      {rightIcon && (
        <span className="shrink-0" aria-hidden>
          {rightIcon}
        </span>
      )}
    </button>
  )
}
