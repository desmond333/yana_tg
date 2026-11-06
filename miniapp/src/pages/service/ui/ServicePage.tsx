import { SearchX } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { DEFAULT_CONTENT, ServiceDetail } from '@/entities/site-content'
import { ROUTES } from '@/shared/config'
import { Button, EmptyState } from '@/shared/ui'

export const ServicePage = () => {
  const { serviceId = '' } = useParams()
  const block = DEFAULT_CONTENT.services.find((item) => item.type === 'service' && item.id === serviceId)

  if (!block) {
    return (
      <EmptyState
        icon={<SearchX className="size-6" />}
        title="Услуга не найдена"
        description="Возможно, она переименована. Посмотрите все форматы работы."
        action={
          <Button asChild>
            <Link to={ROUTES.services}>Все услуги</Link>
          </Button>
        }
      />
    )
  }

  return <ServiceDetail block={block} />
}
