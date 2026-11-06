import { hapticFeedback } from '@tma.js/sdk'
import { isTelegramEnv } from './core'

export const haptics = {
  tap: () => {
    if (isTelegramEnv()) {
      try {
        hapticFeedback.impactOccurred('light')
      } catch {
        // ignore
      }
    }
  },
  select: () => {
    if (isTelegramEnv()) {
      try {
        hapticFeedback.selectionChanged()
      } catch {
        // ignore
      }
    }
  },
  success: () => {
    if (isTelegramEnv()) {
      try {
        hapticFeedback.notificationOccurred('success')
      } catch {
        // ignore
      }
    }
  },
  error: () => {
    if (isTelegramEnv()) {
      try {
        hapticFeedback.notificationOccurred('error')
      } catch {
        // ignore
      }
    }
  },
}
