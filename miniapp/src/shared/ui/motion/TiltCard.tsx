import type { PointerEvent, ReactNode } from 'react'
import { m, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react'
import { cn } from '../../lib'
import { SPRING_SOFT } from './easing'

export type TiltCardProps = {
  children: ReactNode
  className?: string
  maxTilt?: number
  glare?: boolean
}

export const TiltCard = ({ children, className, maxTilt = 9, glare = true }: TiltCardProps) => {
  const reduceMotion = useReducedMotion()
  const pointerX = useMotionValue(0.5)
  const pointerY = useMotionValue(0.5)
  const rotateX = useSpring(useTransform(pointerY, [0, 1], [maxTilt, -maxTilt]), SPRING_SOFT)
  const rotateY = useSpring(useTransform(pointerX, [0, 1], [-maxTilt, maxTilt]), SPRING_SOFT)
  const glareX = useTransform(pointerX, [0, 1], ['0%', '100%'])
  const glareY = useTransform(pointerY, [0, 1], ['0%', '100%'])
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgb(255 255 255 / 28%), transparent 55%)`
  const glareOpacity = useSpring(0, SPRING_SOFT)

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reduceMotion) return
    const rect = event.currentTarget.getBoundingClientRect()
    pointerX.set((event.clientX - rect.left) / rect.width)
    pointerY.set((event.clientY - rect.top) / rect.height)
    glareOpacity.set(1)
  }

  const handlePointerLeave = () => {
    pointerX.set(0.5)
    pointerY.set(0.5)
    glareOpacity.set(0)
  }

  return (
    <m.div
      className={cn('relative [transform-style:preserve-3d]', className)}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      whileTap={{ scale: 0.97 }}
      transition={SPRING_SOFT}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerCancel={handlePointerLeave}
    >
      {children}
      {glare && (
        <m.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] mix-blend-soft-light"
          style={{ background: glareBackground, opacity: glareOpacity }}
        />
      )}
    </m.div>
  )
}
