export const formatPrice = (priceRub: number | null, freeLabel = 'Бесплатно'): string => {
  if (priceRub === null || priceRub === 0) {
    return freeLabel
  }

  const formatted = new Intl.NumberFormat('ru-RU', {
    maximumFractionDigits: 0,
  }).format(priceRub)

  return `${formatted} ₽`
}

export const formatDuration = (durationSec: number): string => {
  if (durationSec < 60) {
    return `${durationSec} сек`
  }

  const minutes = Math.floor(durationSec / 60)
  if (minutes < 60) {
    return `${minutes} мин`
  }

  const hours = Math.floor(minutes / 60)
  const remMinutes = minutes % 60
  if (remMinutes === 0) {
    return `${hours} ч`
  }

  return `${hours} ч ${remMinutes} мин`
}

export const formatDate = (dateIso: string, locale = 'ru-RU'): string => {
  const date = new Date(dateIso)
  if (Number.isNaN(date.getTime())) {
    return dateIso
  }

  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
}
