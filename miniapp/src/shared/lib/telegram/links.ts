import type { MouseEvent } from 'react'
import { openLink, openTelegramLink as tmaOpenTelegramLink } from '@tma.js/sdk'
import { isTelegramEnv } from './core'

export const openExternalLink = (url: string): void => {
  if (isTelegramEnv()) {
    openLink(url)
    return
  }

  window.open(url, '_blank', 'noopener,noreferrer')
}

export const openTelegramLink = (url: string): void => {
  if (isTelegramEnv()) {
    try {
      tmaOpenTelegramLink(url)
      return
    } catch {
      openLink(url)
      return
    }
  }

  window.open(url, '_blank', 'noopener,noreferrer')
}

export const isTelegramHref = (url: string): boolean => /^https?:\/\/t\.me\//i.test(url)

export const handleExternalLinkClick = (event: MouseEvent<HTMLAnchorElement>): void => {
  if (!isTelegramEnv()) return
  event.preventDefault()
  const url = event.currentTarget.href
  if (isTelegramHref(url)) {
    openTelegramLink(url)
    return
  }
  openExternalLink(url)
}
