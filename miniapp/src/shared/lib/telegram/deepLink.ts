import { ROUTES } from '../../config'

export const parseStartParam = (param?: string | null): string | null => {
  if (!param) return null

  const cleaned = param.trim()
  if (!cleaned) return null

  if (cleaned === 'podcasts' || cleaned === 'podcast' || cleaned === 'reels' || cleaned === 'reel') {
    return ROUTES.library
  }

  if (cleaned === 'cases' || cleaned === 'results' || cleaned === 'about') {
    return ROUTES.cases
  }

  if (cleaned === 'catalog' || cleaned === 'products' || cleaned === 'services') {
    return ROUTES.services
  }

  if (cleaned === 'library' || cleaned === 'materials') {
    return ROUTES.library
  }

  if (cleaned === 'lead' || cleaned.startsWith('lead_')) {
    return ROUTES.services
  }

  if (cleaned === 'admin') {
    return ROUTES.home
  }

  if (cleaned.startsWith('p_') || cleaned.startsWith('product_')) {
    return ROUTES.services
  }

  return null
}
