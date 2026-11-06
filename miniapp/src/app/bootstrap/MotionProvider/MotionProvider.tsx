import type { ReactNode } from 'react'
import { LazyMotion, MotionConfig } from 'motion/react'

const loadFeatures = () => import('./features').then((module) => module.default)

export const MotionProvider = ({ children }: { children: ReactNode }) => (
  <LazyMotion features={loadFeatures} strict>
    <MotionConfig reducedMotion="user">{children}</MotionConfig>
  </LazyMotion>
)
