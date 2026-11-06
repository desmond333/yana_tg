import { useEffect, useRef, useState } from 'react'
import { cn } from '../../lib'

export type TypewriterTextProps = {
  text: string
  className?: string
  speed?: number
  startDelay?: number
  endDelay?: number
  active?: boolean
  onComplete?: () => void
}

export const TypewriterText = ({
  text,
  className,
  speed = 30,
  startDelay = 0,
  endDelay = 100,
  active = true,
  onComplete,
}: TypewriterTextProps) => {
  const [visibleChars, setVisibleChars] = useState(0)
  const onCompleteRef = useRef(onComplete)

  useEffect(() => {
    onCompleteRef.current = onComplete
  })

  useEffect(() => {
    if (!active || !text) return

    let index = 0
    let typingTimer: number | undefined
    let completeTimer: number | undefined
    const startTimer = window.setTimeout(() => {
      typingTimer = window.setInterval(() => {
        index += 1
        setVisibleChars(index)

        if (index >= text.length) {
          if (typingTimer) window.clearInterval(typingTimer)
          completeTimer = window.setTimeout(() => onCompleteRef.current?.(), endDelay)
        }
      }, speed)
    }, startDelay)

    return () => {
      window.clearTimeout(startTimer)
      if (typingTimer) window.clearInterval(typingTimer)
      if (completeTimer) window.clearTimeout(completeTimer)
    }
  }, [text, speed, startDelay, endDelay, active])

  const visibleText = active ? text.slice(0, visibleChars) : text
  const showCaret = active && visibleChars > 0 && visibleChars < text.length

  return (
    <span className={cn('inline', className)}>
      {visibleText}
      {showCaret && <span className="ml-0.5 inline-block h-[1em] w-0.5 animate-pulse bg-current align-[-0.1em]" aria-hidden />}
    </span>
  )
}
