import { m } from 'motion/react'
import { cn } from '../../lib'
import { EASE_OUT_EXPO } from './easing'

export type TextRevealProps = {
  text: string
  className?: string
  delay?: number
  as?: 'h1' | 'h2' | 'p'
}

const MOTION_TAGS = { h1: m.h1, h2: m.h2, p: m.p } as const

export const TextReveal = ({ text, className, delay = 0, as = 'h1' }: TextRevealProps) => {
  const Tag = MOTION_TAGS[as]
  const words = text.split(' ')

  return (
    <Tag
      className={cn('flex flex-wrap gap-x-[0.28em]', className)}
      aria-label={text}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: delay } } }}
    >
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="inline-block overflow-hidden pb-[0.08em]" aria-hidden>
          <m.span
            className="inline-block"
            variants={{
              hidden: { y: '110%', rotate: 4 },
              show: { y: '0%', rotate: 0, transition: { duration: 0.8, ease: EASE_OUT_EXPO } },
            }}
          >
            {word}
          </m.span>
        </span>
      ))}
    </Tag>
  )
}
