export type TelegramEnvironment = {
  isTelegram: boolean
  userId?: number
  username?: string
  firstName?: string
  languageCode?: string
  platform?: string
  startParam?: string
}

export const EMPTY_TELEGRAM_ENVIRONMENT: TelegramEnvironment = { isTelegram: false }
