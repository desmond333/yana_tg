const TELEGRAM_USERNAME = import.meta.env.VITE_TELEGRAM_USERNAME || 'alfiimova'

const DIAGNOSTIC_MESSAGE = 'Добрый день! Хочу получить диагностику своего проекта'
const WAITLIST_MESSAGE = 'Добрый день! Хочу в лист ожидания на «Маркетинг под ключ»'

export const CONTACTS = {
  telegramUsername: TELEGRAM_USERNAME,
  personalChatUrl: `https://t.me/${TELEGRAM_USERNAME}`,
  diagnosticUrl: `https://t.me/${TELEGRAM_USERNAME}?text=${encodeURIComponent(DIAGNOSTIC_MESSAGE)}`,
  waitlistUrl: `https://t.me/${TELEGRAM_USERNAME}?text=${encodeURIComponent(WAITLIST_MESSAGE)}`,
  channelUrl: import.meta.env.VITE_CHANNEL_URL || 'https://t.me/alfimova_yana',
  instagramUrl: import.meta.env.VITE_INSTAGRAM_URL || 'https://www.instagram.com/alfiimova',
  youtubeUrl: import.meta.env.VITE_YOUTUBE_URL || 'https://www.youtube.com/@alfiimova',
} as const
