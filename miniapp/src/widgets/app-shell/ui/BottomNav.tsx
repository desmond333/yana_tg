import { m } from 'motion/react'
import { NavLink } from 'react-router-dom'
import { ROUTES } from '@/shared/config'
import { useTranslation } from '@/shared/i18n'
import { cn, haptics } from '@/shared/lib'
import { EASE_OUT_EXPO, SPRING_SNAPPY } from '@/shared/ui'
import { NAV_ITEMS } from '../config/navItems'

export const BottomNav = () => {
  const { t } = useTranslation()

  return (
    <m.nav
      aria-label={t('nav.label')}
      initial={{ y: 96, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.2, ease: EASE_OUT_EXPO }}
      className="fixed inset-x-0 bottom-0 z-30 px-3 md:hidden pb-[calc(env(safe-area-inset-bottom)+10px)]"
    >
      <ul className="glass mx-auto flex max-w-md items-stretch rounded-full border p-1.5 shadow-float">
        {NAV_ITEMS.map((item) => (
          <li key={item.to} className="flex-1">
            <NavLink to={item.to} end={item.to === ROUTES.home} onClick={haptics.select} className="block">
              {({ isActive }) => (
                <span
                  className={cn(
                    'relative flex min-h-13 flex-col items-center justify-center gap-0.5 rounded-full text-[10.5px] font-semibold transition-colors duration-300',
                    isActive ? 'text-accent' : 'text-muted hover:text-text',
                  )}
                >
                  {isActive && (
                    <m.span
                      layoutId="bottom-nav-pill"
                      className="absolute inset-0 rounded-full bg-accent-soft"
                      transition={SPRING_SNAPPY}
                    />
                  )}
                  <m.span className="relative" animate={isActive ? { y: -1, scale: 1.12 } : { y: 0, scale: 1 }} transition={SPRING_SNAPPY}>
                    <item.icon className="size-5" strokeWidth={isActive ? 2.4 : 2} aria-hidden />
                  </m.span>
                  <span className="relative">{t(`nav.${item.labelKey}`)}</span>
                </span>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </m.nav>
  )
}
