import { m, type HTMLMotionProps } from 'motion/react'
import { EASE_OUT_EXPO } from './easing'

export type RevealProps = HTMLMotionProps<'div'> & {
  delay?: number
  y?: number
  blur?: boolean
}

export const Reveal = ({ delay = 0, y = 28, blur = true, children, ...props }: RevealProps) => (
  <m.div
    initial={{ opacity: 0, y, filter: blur ? 'blur(8px)' : 'blur(0px)' }}
    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    viewport={{ once: true, margin: '0px 0px -48px 0px' }}
    transition={{ duration: 0.7, delay, ease: EASE_OUT_EXPO }}
    {...props}
  >
    {children}
  </m.div>
)
