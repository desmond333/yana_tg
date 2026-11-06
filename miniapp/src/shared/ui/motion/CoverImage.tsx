import { useState } from 'react'
import { cn } from '../../lib'

export type CoverImageProps = {
  src?: string
  alt: string
  className?: string
  imgClassName?: string
  priority?: boolean
}

export const CoverImage = ({ src, alt, className, imgClassName, priority = false }: CoverImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const showImage = Boolean(src) && !hasError

  const syncCachedImage = (node: HTMLImageElement | null) => {
    if (node?.complete && node.naturalWidth > 0) setIsLoaded(true)
  }

  return (
    <div className={cn('relative overflow-hidden bg-[linear-gradient(135deg,var(--accent-soft),var(--panel-2))]', className)}>
      {showImage && (
        <img
          ref={syncCachedImage}
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={cn(
            'size-full object-cover transition-[opacity,transform] duration-900 ease-(--ease-out-expo)',
            isLoaded ? 'scale-100 opacity-100' : 'scale-[1.08] opacity-0',
            imgClassName,
          )}
        />
      )}
    </div>
  )
}
