import { createContext, useContext } from 'react'
import { EMPTY_TELEGRAM_ENVIRONMENT, type TelegramEnvironment } from './types'

export const TelegramContext = createContext<TelegramEnvironment>(EMPTY_TELEGRAM_ENVIRONMENT)

export const useTelegram = (): TelegramEnvironment => useContext(TelegramContext)
