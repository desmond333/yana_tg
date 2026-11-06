import { backButton } from '@tma.js/sdk'
import { isTelegramEnv } from './core'

export const mountBackButton = (onClick: () => void): (() => void) => {
  if (!isTelegramEnv()) return () => undefined

  if (!backButton.isMounted()) backButton.mount()

  const off = backButton.onClick(onClick)

  return () => {
    if (off) {
      off()
    } else {
      backButton.offClick(onClick)
    }
    backButton.hide()
  }
}

export const setBackButtonVisible = (visible: boolean): void => {
  if (!isTelegramEnv()) return

  if (visible) {
    backButton.show()
    return
  }

  backButton.hide()
}
