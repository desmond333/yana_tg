import { useEffect } from 'react'
import { syncTelegramChromeColor } from '@/shared/lib'

const syncChromeWithBackground = () => {
  syncTelegramChromeColor(getComputedStyle(document.documentElement).getPropertyValue('--bg').trim())
}

export const ThemeSync = () => {
  useEffect(() => {
    syncChromeWithBackground()
  }, [])

  return null
}
