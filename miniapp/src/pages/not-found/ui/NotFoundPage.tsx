import { Home } from 'lucide-react'
import { m } from 'motion/react'
import { Link } from 'react-router-dom'
import { ROUTES } from '@/shared/config'
import { useTranslation } from '@/shared/i18n'
import { Button, Reveal, SPRING_SOFT } from '@/shared/ui'

export const NotFoundPage = () => {
  const { t } = useTranslation()

  return (
    <section className="flex flex-col items-center gap-4 py-16 text-center">
      <m.p
        initial={{ scale: 0.4, opacity: 0, rotate: -12 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={SPRING_SOFT}
        className="text-gradient animate-float font-display text-[6rem] leading-none font-bold"
      >
        404
      </m.p>
      <Reveal delay={0.15} className="flex flex-col gap-2">
        <h1 className="font-display text-2xl font-semibold">{t('notFound.title')}</h1>
        <p className="text-muted">{t('notFound.note')}</p>
      </Reveal>
      <Reveal delay={0.3}>
        <Button asChild variant="primary" size="lg" shine leftIcon={<Home className="size-4" />}>
          <Link to={ROUTES.home}>{t('common.toHome')}</Link>
        </Button>
      </Reveal>
    </section>
  )
}
