import { useEffect, useRef } from 'react'
import { animate, useInView, useReducedMotion } from 'motion/react'
import { EASE_OUT_EXPO } from './easing'

const NUMBER_PATTERN = /^(\D*)(\d[\d\s]*\d|\d)(.*)$/

const numberFormatter = new Intl.NumberFormat('ru-RU')

export type CountUpProps = {
  value: string
  className?: string
  duration?: number
}

export const CountUp = ({ value, className, duration = 1.8 }: CountUpProps) => {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '0px 0px -40px 0px' })
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const node = ref.current
    const match = NUMBER_PATTERN.exec(value)
    if (!node || !match || !isInView || reduceMotion) return

    const [, prefix, digits, suffix] = match
    const target = Number(digits?.replace(/\D/g, ''))
    const useGrouping = /\s/.test(digits ?? '')

    const controls = animate(0, target, {
      duration,
      ease: EASE_OUT_EXPO,
      onUpdate: (latest) => {
        const rounded = Math.round(latest)
        node.textContent = `${prefix}${useGrouping ? numberFormatter.format(rounded) : rounded}${suffix}`
      },
    })

    return () => controls.stop()
  }, [duration, isInView, reduceMotion, value])

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  )
}
