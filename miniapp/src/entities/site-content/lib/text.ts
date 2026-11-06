import { ROUTES } from '@/shared/config'

export type SplitText = {
  lead: string
  rest: string
}

const MAX_LABEL_LENGTH = 40

export const splitLabel = (text: string): SplitText => {
  const index = text.indexOf(':')
  if (index <= 0 || index > MAX_LABEL_LENGTH) return { lead: '', rest: text }
  return { lead: text.slice(0, index).trim(), rest: text.slice(index + 1).trim() }
}

export const splitSentence = (text: string): SplitText => {
  const index = text.indexOf('. ')
  if (index <= 0) return { lead: text.replace(/\.$/, ''), rest: '' }
  return { lead: text.slice(0, index).trim(), rest: text.slice(index + 2).trim() }
}

export const parseMinutes = (duration?: string): number => {
  const match = /\d+/.exec(duration ?? '')
  return match ? Number(match[0]) : 0
}

export const isExternalHref = (href: string): boolean => href.startsWith('http')

export const getServiceHref = (blockId: string): string => ROUTES.service.replace(':serviceId', encodeURIComponent(blockId))
