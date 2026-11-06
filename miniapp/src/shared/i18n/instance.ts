import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { ru } from './locales/ru'
import { DEFAULT_LANG } from './types'

void i18n.use(initReactI18next).init({
  resources: {
    ru: { translation: ru },
  },
  lng: DEFAULT_LANG,
  fallbackLng: DEFAULT_LANG,
  interpolation: { escapeValue: false },
  returnNull: false,
})

export { i18n }
