import { m, type HTMLMotionProps, type Variants } from 'motion/react'
import { EASE_OUT_EXPO } from './easing'

const containerVariants: Variants = {
  hidden: {},
  show: (stagger: number) => ({ transition: { staggerChildren: stagger, delayChildren: 0.05 } }),
}

const itemVariants: Variants = {
  hidden: (direction: 'up' | 'right') => ({
    opacity: 0,
    y: direction === 'up' ? 32 : 0,
    x: direction === 'right' ? 48 : 0,
    scale: 0.96,
  }),
  show: { opacity: 1, y: 0, x: 0, scale: 1, transition: { duration: 0.65, ease: EASE_OUT_EXPO } },
}

export type StaggerProps = HTMLMotionProps<'div'> & {
  stagger?: number
}

export const Stagger = ({ stagger = 0.08, children, ...props }: StaggerProps) => (
  <m.div
    variants={containerVariants}
    custom={stagger}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, margin: '0px 0px -40px 0px' }}
    {...props}
  >
    {children}
  </m.div>
)

export type StaggerItemProps = HTMLMotionProps<'div'> & {
  direction?: 'up' | 'right'
}

export const StaggerItem = ({ direction = 'up', children, ...props }: StaggerItemProps) => (
  <m.div variants={itemVariants} custom={direction} {...props}>
    {children}
  </m.div>
)
