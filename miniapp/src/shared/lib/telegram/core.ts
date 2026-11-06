import { init, isTMA, miniApp, retrieveLaunchParams, themeParams, viewport } from '@tma.js/sdk'
import { EMPTY_TELEGRAM_ENVIRONMENT, type TelegramEnvironment } from './types'

let initialized = false

export const isTelegramEnv = (): boolean => isTMA()

export const initTelegram = (): void => {
  if (initialized || !isTelegramEnv()) return
  initialized = true

  try {
    init()
    miniApp.mount()
    themeParams.mount()
    themeParams.bindCssVars()
    void viewport
      .mount()
      .then(() => {
        viewport.bindCssVars()
        viewport.expand()
      })
      .catch(() => console.warn('Telegram viewport initialization failed'))
    miniApp.ready()
  } catch (error) {
    initialized = false
    console.warn('Telegram SDK init failed', error)
  }
}

export const getTelegramEnvironment = (): TelegramEnvironment => {
  const browserStartParam =
    typeof window !== 'undefined'
      ? (new URLSearchParams(window.location.search).get('startapp') ??
        new URLSearchParams(window.location.search).get('tgWebAppStartParam') ??
        undefined)
      : undefined

  if (!isTelegramEnv()) {
    return {
      ...EMPTY_TELEGRAM_ENVIRONMENT,
      startParam: browserStartParam,
    }
  }

  try {
    const launchParams = retrieveLaunchParams()
    const user = launchParams.tgWebAppData?.user

    return {
      isTelegram: true,
      userId: user?.id,
      username: user?.username,
      firstName: user?.first_name,
      languageCode: user?.language_code,
      platform: launchParams.tgWebAppPlatform,
      startParam: launchParams.tgWebAppStartParam ?? launchParams.tgWebAppData?.start_param ?? browserStartParam,
    }
  } catch {
    return {
      ...EMPTY_TELEGRAM_ENVIRONMENT,
      startParam: browserStartParam,
    }
  }
}
