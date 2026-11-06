export const APP_NAME = import.meta.env.VITE_APP_NAME ?? 'Яна Алфимова'

export const ROUTES = {
  home: '/',
  services: '/services',
  service: '/services/:serviceId',
  library: '/library',
  cases: '/cases',
  devComponents: '/dev/components',
} as const

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES]
