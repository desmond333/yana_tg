export const pickLocalizedText = (value: unknown, fallback = ''): string => {
  if (typeof value === 'string') return value
  if (typeof value === 'object' && value !== null && 'ru' in value && typeof value.ru === 'string') {
    return value.ru
  }
  return fallback
}
