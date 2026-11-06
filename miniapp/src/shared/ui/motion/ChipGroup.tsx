import { m } from 'motion/react'
import { cn } from '../../lib'
import { SPRING_SNAPPY } from './easing'

export type ChipGroupOption<TValue extends string> = {
  value: TValue
  label: string
}

export type ChipGroupProps<TValue extends string> = {
  options: ChipGroupOption<TValue>[]
  value: TValue
  onChange: (value: TValue) => void
  layoutId: string
  className?: string
  ariaLabel?: string
}

export const ChipGroup = <TValue extends string>({ options, value, onChange, layoutId, className, ariaLabel }: ChipGroupProps<TValue>) => (
  <div role="group" aria-label={ariaLabel} className={cn('no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 py-1', className)}>
    {options.map((option) => {
      const isActive = option.value === value
      return (
        <button
          key={option.value}
          type="button"
          aria-pressed={isActive}
          onClick={() => onChange(option.value)}
          className={cn(
            'relative inline-flex min-h-10 shrink-0 items-center rounded-full border px-4 text-sm font-semibold whitespace-nowrap transition-colors duration-200',
            isActive ? 'border-transparent text-accent-text' : 'border-line bg-panel/70 text-muted hover:text-text',
          )}
        >
          {isActive && (
            <m.span
              layoutId={layoutId}
              className="bg-accent-gradient absolute inset-0 rounded-full shadow-glow"
              transition={SPRING_SNAPPY}
            />
          )}
          <span className="relative">{option.label}</span>
        </button>
      )
    })}
  </div>
)
