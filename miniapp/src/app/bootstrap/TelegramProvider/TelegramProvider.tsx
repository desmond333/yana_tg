import { useEffect, useRef, useState, type ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ROUTES } from '@/shared/config'
import { TelegramContext, getTelegramEnvironment, mountBackButton, parseStartParam, setBackButtonVisible } from '@/shared/lib'

export const TelegramProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [environment] = useState(getTelegramEnvironment)
  const handledDeepLinkRef = useRef(false)

  useEffect(
    () =>
      mountBackButton(() => {
        const historyIndex = (window.history.state as { idx?: number } | null)?.idx ?? 0
        if (historyIndex > 0) {
          navigate(-1)
          return
        }
        navigate(ROUTES.home, { replace: true })
      }),
    [navigate],
  )

  useEffect(() => {
    setBackButtonVisible(location.pathname !== ROUTES.home)
  }, [location.pathname])

  useEffect(() => {
    if (handledDeepLinkRef.current) return
    handledDeepLinkRef.current = true

    if (environment.startParam) {
      const targetRoute = parseStartParam(environment.startParam)
      if (targetRoute && targetRoute !== location.pathname) {
        navigate(targetRoute, { replace: true })
      }
    }
  }, [environment.startParam, location.pathname, navigate])

  return <TelegramContext.Provider value={environment}>{children}</TelegramContext.Provider>
}
