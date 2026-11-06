import { Fragment } from 'react'
import { m } from 'motion/react'
import { cn } from '../lib'
import { EASE_OUT_EXPO } from './motion/easing'

const HIGHLIGHT_PATTERN = /\*\*(.+?)\*\*/g

export type RichTextProps = {
  text: string
  className?: string
  markClassName?: string
  as?: 'p' | 'span'
}

const splitHighlights = (text: string): { value: string; highlighted: boolean }[] =>
  text.split(HIGHLIGHT_PATTERN).map((value, index) => ({ value, highlighted: index % 2 === 1 }))

export const RichText = ({ text, className, markClassName, as = 'p' }: RichTextProps) => {
  const Tag = as

  return (
    <Tag className={className}>
      {splitHighlights(text).map((part, index) => {
        if (!part.highlighted) return <Fragment key={index}>{part.value}</Fragment>

        return (
          <m.mark
            key={index}
            className={cn(
              'box-decoration-clone bg-transparent bg-[linear-gradient(transparent_58%,color-mix(in_srgb,var(--accent)_30%,transparent)_58%)] bg-no-repeat px-0.5 font-semibold text-inherit',
              markClassName,
            )}
            initial={{ backgroundSize: '0% 100%' }}
            whileInView={{ backgroundSize: '100% 100%' }}
            viewport={{ once: true, margin: '0px 0px -40px 0px' }}
            transition={{ duration: 0.9, delay: 0.25, ease: EASE_OUT_EXPO }}
          >
            {part.value}
          </m.mark>
        )
      })}
    </Tag>
  )
}
