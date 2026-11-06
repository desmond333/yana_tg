import { BookOpen, Home, Layers, Trophy, type LucideIcon } from 'lucide-react'
import { ROUTES } from '@/shared/config'

export type NavItem = {
  to: string
  labelKey: 'home' | 'services' | 'library' | 'cases'
  icon: LucideIcon
}

export const NAV_ITEMS: NavItem[] = [
  { to: ROUTES.home, labelKey: 'home', icon: Home },
  { to: ROUTES.services, labelKey: 'services', icon: Layers },
  { to: ROUTES.library, labelKey: 'library', icon: BookOpen },
  { to: ROUTES.cases, labelKey: 'cases', icon: Trophy },
]
