import { m } from 'motion/react'
import { NavLink } from 'react-router-dom'
import { CONTACTS, ROUTES } from '@/shared/config'
import { useTranslation } from '@/shared/i18n'
import { cn, handleExternalLinkClick } from '@/shared/lib'
import { Button, SPRING_GLIDE, SPRING_SNAPPY } from '@/shared/ui'
import { NAV_ITEMS } from '../config/navItems'

export const TopNav = ({ isScrolled = false }: { isScrolled?: boolean }) => {
  const { t } = useTranslation()

  return (
    <m.nav aria-label={t('nav.label')} layout="position" transition={SPRING_GLIDE}>
      <div className="flex items-center gap-3">
        <ul
          className={cn(
            'flex items-center gap-1 rounded-full border p-1 transition-[background-color,border-color] duration-500',
            isScrolled ? 'border-transparent bg-transparent' : 'border-line/70 bg-panel/60 backdrop-blur-md',
          )}
        >
          {NAV_ITEMS.map((item) => (
            <li key={item.to}>
              <NavLink to={item.to} end={item.to === ROUTES.home} className="block">
                {({ isActive }) => (
                  <span
                    className={cn(
                      'relative flex min-h-9 items-center gap-1.5 rounded-full px-4 text-[11px] font-semibold tracking-[0.16em] uppercase transition-colors duration-300',
                      isActive ? 'text-accent' : 'text-muted hover:text-text',
                    )}
                  >
                    {isActive && (
                      <m.span layoutId="top-nav-pill" className="absolute inset-0 rounded-full bg-accent-soft" transition={SPRING_SNAPPY} />
                    )}
                    <item.icon className="relative size-3.5" strokeWidth={2.2} aria-hidden />
                    <span className="relative">{t(`nav.${item.labelKey}`)}</span>
                  </span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
        <Button asChild size="sm" className="hidden lg:inline-flex">
          <a href={CONTACTS.diagnosticUrl} target="_blank" rel="noreferrer" onClick={handleExternalLinkClick}>
            Диагностика
          </a>
        </Button>
      </div>
    </m.nav>
  )
}
