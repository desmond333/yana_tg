import { lazy, Suspense } from 'react'
import { AnimatePresence, m } from 'motion/react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { HomePage } from '@/pages/home'
import { NotFoundPage } from '@/pages/not-found'
import { ROUTES } from '@/shared/config'
import { EASE_OUT_EXPO, Skeleton } from '@/shared/ui'

const ServicesPage = lazy(() => import('@/pages/services').then((module) => ({ default: module.ServicesPage })))
const ServicePage = lazy(() => import('@/pages/service').then((module) => ({ default: module.ServicePage })))
const LibraryPage = lazy(() => import('@/pages/library').then((module) => ({ default: module.LibraryPage })))
const CasesPage = lazy(() => import('@/pages/cases').then((module) => ({ default: module.CasesPage })))
const DevComponentsPage = import.meta.env.DEV
  ? lazy(() => import('@/pages/dev-components').then((module) => ({ default: module.DevComponentsPage })))
  : null

const PageLoader = () => (
  <div className="flex flex-col gap-4 pt-2">
    <Skeleton className="h-9 w-2/3 rounded-full" />
    <Skeleton className="h-5 w-1/2 rounded-full" />
    <Skeleton className="h-56 w-full rounded-lg" />
    <Skeleton className="h-40 w-full rounded-lg" />
  </div>
)

const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'instant' })

export const AppRouter = () => {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait" initial={false} onExitComplete={scrollToTop}>
      <m.div
        key={location.pathname}
        initial={{ opacity: 0, y: 24, scale: 0.985, filter: 'blur(6px)' }}
        animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: -12, scale: 0.99, filter: 'blur(4px)' }}
        transition={{ duration: 0.38, ease: EASE_OUT_EXPO }}
      >
        <Suspense fallback={<PageLoader />}>
          <Routes location={location}>
            <Route path={ROUTES.home} element={<HomePage />} />
            <Route path={ROUTES.services} element={<ServicesPage />} />
            <Route path={ROUTES.service} element={<ServicePage />} />
            <Route path={ROUTES.library} element={<LibraryPage />} />
            <Route path={ROUTES.cases} element={<CasesPage />} />
            {DevComponentsPage && <Route path={ROUTES.devComponents} element={<DevComponentsPage />} />}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </m.div>
    </AnimatePresence>
  )
}
