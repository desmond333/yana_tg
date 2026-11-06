import type { BlockType, ContentBlock, ContentItem, ContentLink } from './types'

export const makeId = (prefix: string): string => {
  const random =
    typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID().slice(0, 8) : Math.random().toString(36).slice(2, 10)
  return `${prefix}-${Date.now().toString(36)}-${random}`
}

export const createLink = (): ContentLink => ({
  id: makeId('link'),
  label: 'Кнопка',
  href: '',
})

export const createItem = (): ContentItem => ({
  id: makeId('item'),
  title: '',
  text: '',
})

const item = createItem

export const createBlock = (type: BlockType): ContentBlock => {
  const base = { id: makeId('block'), type }

  if (type === 'hero') {
    return { ...base, title: 'Заголовок', subtitle: '', text: '', imageUrl: '', buttons: [createLink()], items: [createItem()] }
  }
  if (type === 'stats') {
    return { ...base, title: 'Заголовок блока', items: [{ ...item(), value: '100+', title: 'показатель' }] }
  }
  if (type === 'pains') {
    return {
      ...base,
      title: 'Заголовок блока',
      text: 'Ответ на запросы клиентов',
      items: [{ ...item(), title: 'Сообщение клиента' }],
      buttons: [],
    }
  }
  if (type === 'bullets') {
    return { ...base, title: 'Заголовок блока', items: [{ ...item(), title: 'Пункт списка', text: 'Пояснение' }] }
  }
  if (type === 'text') {
    return { ...base, title: 'Заголовок блока', text: 'Текст блока' }
  }
  if (type === 'cards' || type === 'materials') {
    return {
      ...base,
      layout: 'grid',
      title: 'Заголовок блока',
      items: [{ ...item(), title: 'Карточка', text: 'Описание', buttonLabel: 'Подробнее', href: '' }],
    }
  }
  if (type === 'service') {
    return {
      ...base,
      eyebrow: 'Формат',
      title: 'Название услуги',
      badge: 'Стоимость',
      imageUrl: '',
      subtitle: 'Короткое описание для карточки',
      text: '',
      items: [
        { ...item(), kind: 'facts', title: 'Коротко', bullets: ['1 час: встреча'] },
        { ...item(), kind: 'pains', title: 'С чем приходят', bullets: ['Первый запрос'] },
        { ...item(), kind: 'route', title: 'Как проходит', bullets: ['Первый шаг. Описание шага.'] },
        { ...item(), kind: 'results', title: 'Что вы получите', bullets: ['Первый результат'] },
      ],
      buttons: [createLink()],
    }
  }
  if (type === 'steps') {
    return { ...base, title: 'Заголовок блока', items: [{ ...item(), title: 'Этап', text: 'Описание этапа' }] }
  }
  if (type === 'accordion') {
    return { ...base, title: 'Заголовок блока', items: [{ ...item(), title: 'Вопрос', text: 'Ответ' }] }
  }
  if (type === 'reviews') {
    return { ...base, title: 'Заголовок блока', items: [{ ...item(), title: 'Имя', subtitle: 'Роль', text: 'Текст отзыва', imageUrl: '' }] }
  }
  if (type === 'podcasts') {
    return {
      ...base,
      title: 'Заголовок блока',
      items: [{ ...item(), value: '01', title: 'Название выпуска', text: 'Описание', buttonLabel: 'Слушать в Telegram', href: '' }],
    }
  }
  if (type === 'contacts') {
    return { ...base, title: 'Заголовок блока', items: [{ ...item(), title: 'Telegram', subtitle: 'Описание', href: '' }] }
  }
  if (type === 'cta') {
    return { ...base, title: 'Заголовок призыва', subtitle: 'Текст призыва', buttons: [createLink()] }
  }
  return { ...base, text: 'Текст сноски' }
}
