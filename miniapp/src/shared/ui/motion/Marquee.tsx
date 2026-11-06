import { Sparkle } from 'lucide-react'
import { cn } from '../../lib'

export type MarqueeProps = {
  items: string[]
  className?: string
  reverse?: boolean
}

export const Marquee = ({ items, className, reverse = false }: MarqueeProps) => {
  const loop = [...items, ...items]

  return (
    <div
      className={cn(
        'relative -mx-4 overflow-hidden py-3 [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]',
        className,
      )}
      aria-label={items.join(', ')}
    >
      <div className={cn('flex w-max animate-marquee items-center gap-6', reverse && '[animation-direction:reverse]')} aria-hidden>
        {loop.map((item, index) => (
          <span key={`${item}-${index}`} className="flex items-center gap-6 font-display text-xl font-semibold tracking-tight text-text/85">
            {item}
            <Sparkle className="size-4 fill-current text-accent" />
          </span>
        ))}
      </div>
    </div>
  )
}
