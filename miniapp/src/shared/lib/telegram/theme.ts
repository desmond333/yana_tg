import { miniApp } from '@tma.js/sdk'
import { isTelegramEnv } from './core'

const HEX_COLOR = /^#[0-9a-f]{6}$/i

export const syncTelegramChromeColor = (color: string): void => {
  if (!isTelegramEnv() || !HEX_COLOR.test(color)) return

  try {
    if (miniApp.setHeaderColor.isAvailable()) miniApp.setHeaderColor(color)
    if (miniApp.setBgColor.isAvailable()) miniApp.setBgColor(color)
    if (miniApp.setBottomBarColor.isAvailable()) miniApp.setBottomBarColor(color)
  } catch {
    return
  }
}
