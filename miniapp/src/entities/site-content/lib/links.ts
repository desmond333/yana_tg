import { handleExternalLinkClick } from '@/shared/lib'
import { isExternalHref } from './text'

export type ExternalLinkProps = {
  target?: '_blank'
  rel?: string
  onClick?: typeof handleExternalLinkClick
}

export const getExternalLinkProps = (href: string): ExternalLinkProps =>
  isExternalHref(href) ? { target: '_blank', rel: 'noreferrer', onClick: handleExternalLinkClick } : {}
