export const PAGE_KEYS = ['home', 'services', 'library', 'cases'] as const

export type PageKey = (typeof PAGE_KEYS)[number]

export const BLOCK_TYPES = [
  'hero',
  'stats',
  'pains',
  'bullets',
  'text',
  'cards',
  'service',
  'steps',
  'accordion',
  'reviews',
  'materials',
  'podcasts',
  'contacts',
  'cta',
  'note',
] as const

export type BlockType = (typeof BLOCK_TYPES)[number]

export const BLOCK_LAYOUTS = ['grid', 'carousel', 'rows', 'mosaic'] as const

export type BlockLayout = (typeof BLOCK_LAYOUTS)[number]

export const SECTION_KINDS = ['pains', 'route', 'results', 'highlight', 'tags', 'facts', 'contrast', 'list'] as const

export type SectionKind = (typeof SECTION_KINDS)[number]

export type ContentLink = {
  id: string
  label: string
  href: string
}

export type ContentItem = {
  id: string
  title?: string
  subtitle?: string
  text?: string
  value?: string
  imageUrl?: string
  badge?: string
  href?: string
  buttonLabel?: string
  bullets?: string[]
  kind?: SectionKind
  duration?: string
}

export type ContentBlock = {
  id: string
  type: BlockType
  layout?: BlockLayout
  eyebrow?: string
  title?: string
  subtitle?: string
  text?: string
  imageUrl?: string
  badge?: string
  buttons?: ContentLink[]
  items?: ContentItem[]
}

export type PageContent = {
  page: PageKey
  blocks: ContentBlock[]
  updatedAt?: string
}

export type SiteContent = Record<PageKey, ContentBlock[]>

export const PAGE_TITLES: Record<PageKey, string> = {
  home: 'Главная',
  services: 'Услуги',
  library: 'Библиотека',
  cases: 'Кейсы',
}

export const BLOCK_TITLES: Record<BlockType, string> = {
  hero: 'Первый экран',
  stats: 'Цифры',
  pains: 'Запросы клиентов (переписка)',
  bullets: 'Нумерованный список',
  text: 'Текстовый блок',
  cards: 'Карточки',
  service: 'Услуга',
  steps: 'Этапы',
  accordion: 'Вопросы и ответы',
  reviews: 'Отзывы',
  materials: 'Полезные материалы',
  podcasts: 'Подкасты',
  contacts: 'Контакты и ссылки',
  cta: 'Призыв к действию',
  note: 'Сноска',
}

export const BLOCK_LAYOUT_TITLES: Record<BlockLayout, string> = {
  grid: 'Карточки сеткой',
  carousel: 'Карусель',
  rows: 'Компактные строки',
  mosaic: 'Мозаика с крупными кейсами',
}

export const SECTION_KIND_TITLES: Record<SectionKind, string> = {
  pains: 'Запросы (облака переписки)',
  route: 'Маршрут по шагам',
  results: 'Результаты (плитки)',
  highlight: 'Яркая плашка-итог',
  tags: 'Облако тегов',
  facts: 'Цифры и факты',
  contrast: 'Акцентная плашка',
  list: 'Простой список',
}
