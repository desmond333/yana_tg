import { useRef, type ReactNode } from 'react'
import { m, useScroll, useTransform } from 'motion/react'

export type ParallaxProps = {
  children: ReactNode
  offset?: number
  className?: string
}

export const Parallax = ({ children, offset = 40, className }: ParallaxProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset])

  return (
    <div ref={ref} className={className}>
      <m.div style={{ y }} className="size-full">
        {children}
      </m.div>
    </div>
  )
}
