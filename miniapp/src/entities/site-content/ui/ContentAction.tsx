import { ArrowRight, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button, type ButtonSize, type ButtonVariant } from '@/shared/ui'
import { getExternalLinkProps } from '../lib/links'
import { isExternalHref } from '../lib/text'
import type { ContentLink } from '../model/types'

export type ContentActionProps = {
  link: ContentLink
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
}

export const ContentAction = ({ link, variant = 'primary', size = 'md', className }: ContentActionProps) => {
  if (!link.href) {
    return (
      <Button variant="outline" size={size} disabled className={className}>
        {link.label}
      </Button>
    )
  }

  if (isExternalHref(link.href)) {
    return (
      <Button asChild variant={variant} size={size} className={className}>
        <a href={link.href} {...getExternalLinkProps(link.href)}>
          {link.label}
          <ExternalLink className="size-4" aria-hidden />
        </a>
      </Button>
    )
  }

  return (
    <Button asChild variant={variant} size={size} className={className}>
      <Link to={link.href}>
        {link.label}
        <ArrowRight className="size-4" aria-hidden />
      </Link>
    </Button>
  )
}
