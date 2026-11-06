export const CHAT_AVATARS = [
  '/images/avatars/client-1.svg',
  '/images/avatars/client-2.svg',
  '/images/avatars/client-3.svg',
  '/images/avatars/client-4.svg',
  '/images/avatars/client-5.svg',
  '/images/avatars/client-6.svg',
] as const

export const getChatAvatar = (index: number, imageUrl?: string): string =>
  imageUrl || CHAT_AVATARS[index % CHAT_AVATARS.length] || CHAT_AVATARS[0]
