import { useState } from 'react'
import { m, useMotionValueEvent, useScroll, useSpring } from 'motion/react'
import { Link } from 'react-router-dom'
import { APP_NAME, ROUTES } from '@/shared/config'
import { cn } from '@/shared/lib'
import { SPRING_GLIDE } from '@/shared/ui'
import { TopNav } from './TopNav'

const COLLAPSE_AT = 32
const EXPAND_AT = 8

const PILL_STATE = {
  expanded: { opacity: 0, scaleX: 1.025, scaleY: 1.2, y: -4 },
  collapsed: { opacity: 1, scaleX: 1, scaleY: 1, y: 0 },
}

const TAGLINE_STATE = {
  expanded: { opacity: 1, height: 'auto', marginTop: 4, filter: 'blur(0px)' },
  collapsed: { opacity: 0, height: 0, marginTop: 0, filter: 'blur(4px)' },
}

const getInitialCollapsed = () => typeof window !== 'undefined' && window.scrollY > COLLAPSE_AT

export const AppHeader = () => {
  const { scrollY, scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 180, damping: 30, restDelta: 0.001 })
  const [isCollapsed, setIsCollapsed] = useState(getInitialCollapsed)
  const state = isCollapsed ? 'collapsed' : 'expanded'

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsCollapsed((prev) => (prev ? latest > EXPAND_AT : latest > COLLAPSE_AT))
  })

  return (
    <header className="sticky top-0 z-30 pt-[env(safe-area-inset-top)]">
      <div className="relative mx-auto h-16 w-full max-w-md px-4 md:h-18 md:max-w-6xl md:px-8">
        <m.div
          aria-hidden
          className="glass pointer-events-none absolute inset-x-2 inset-y-1.5 overflow-hidden rounded-full border shadow-float md:inset-x-5 md:inset-y-2"
          initial={false}
          animate={PILL_STATE[state]}
          transition={SPRING_GLIDE}
        >
          <m.span
            className="absolute inset-x-10 bottom-0 h-px origin-left bg-gradient-to-r from-accent/0 via-accent/70 to-accent/0"
            style={{ scaleX: progress }}
          />
        </m.div>
        <div className="relative flex h-full items-center gap-3">
          <Link to={ROUTES.home} className="group flex min-w-0 items-center gap-3">
            <m.img
              src="/images/brand/logo.svg"
              alt=""
              width={44}
              height={44}
              className="size-10 shrink-0 rounded-full shadow-glow md:size-11"
              initial={false}
              animate={{ scale: isCollapsed ? 0.8 : 1 }}
              whileTap={{ scale: isCollapsed ? 0.72 : 0.9, rotate: -8 }}
              transition={SPRING_GLIDE}
            />
            <m.span
              className="flex min-w-0 origin-left flex-col"
              initial={false}
              animate={{ scale: isCollapsed ? 0.92 : 1, x: isCollapsed ? -4 : 0 }}
              transition={SPRING_GLIDE}
            >
              <span className="truncate font-display text-[19px] leading-none font-semibold italic tracking-[-0.01em] transition-colors duration-300 group-hover:text-accent md:text-[22px]">
                {APP_NAME}
              </span>
              <m.span
                className="flex items-center gap-1.5 overflow-hidden text-[8.5px] font-bold tracking-[0.3em] text-muted uppercase md:text-[9.5px]"
                initial={false}
                animate={TAGLINE_STATE[state]}
                transition={SPRING_GLIDE}
              >
                <span className="h-px w-3 bg-accent/70" aria-hidden />
                маркетолог
              </m.span>
            </m.span>
          </Link>
          <div className={cn('hidden min-w-0 flex-1 md:flex', isCollapsed ? 'justify-center' : 'justify-end')}>
            <TopNav isScrolled={isCollapsed} />
          </div>
        </div>
      </div>
    </header>
  )
}
