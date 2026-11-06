import 'i18next'
import type { RuTranslation } from './locales/ru'

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation'
    resources: {
      translation: RuTranslation
    }
  }
}
