import { useState } from 'react'
import { ArrowRight, BookOpen, CheckCircle2, Inbox, Send, Sparkles } from 'lucide-react'
import { useTranslation } from '@/shared/i18n'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Carousel,
  Checkbox,
  Chip,
  ChipGroup,
  type ChipGroupOption,
  CountUp,
  CoverImage,
  CtaBanner,
  EmptyState,
  Input,
  Marquee,
  OrbitDecoration,
  PageHeader,
  Reveal,
  RichText,
  SectionTitle,
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Skeleton,
  Stagger,
  StaggerItem,
  Textarea,
  TextReveal,
  TiltCard,
} from '@/shared/ui'

const TOKENS = [
  '--bg',
  '--panel',
  '--panel-2',
  '--line',
  '--text',
  '--muted',
  '--accent',
  '--accent-2',
  '--accent-text',
  '--accent-soft',
  '--danger',
  '--success',
] as const

type DemoFilter = 'all' | 'courses' | 'free'

const DEMO_FILTERS: ChipGroupOption<DemoFilter>[] = [
  { value: 'all', label: 'Все' },
  { value: 'courses', label: 'Курсы' },
  { value: 'free', label: 'Бесплатно' },
]

const DEMO_STATS = ['7+ лет', '150+', '3 000+', '12M+']

export const DevComponentsPage = () => {
  const { t } = useTranslation()
  const [activeChip, setActiveChip] = useState<string>('all')
  const [checkboxChecked, setCheckboxChecked] = useState<boolean>(true)
  const [demoFilter, setDemoFilter] = useState<DemoFilter>('all')

  return (
    <div className="flex flex-col gap-8 pb-12">
      <PageHeader title={t('dev.title')} subtitle={t('dev.note')} />

      <section className="rounded-lg border border-line bg-panel p-5 shadow-card">
        <h2 className="mb-3 font-semibold">{t('dev.tokens')}</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {TOKENS.map((token) => (
            <div key={token} className="flex items-center gap-2">
              <span
                className="size-8 shrink-0 rounded-md border border-line shadow-xs"
                style={{ background: `var(${token})` }}
                aria-hidden
              />
              <code className="text-xs text-muted">{token}</code>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <SectionTitle
          title="Buttons"
          subtitle="Варианты, размеры и состояния кнопок"
          action={
            <Button size="sm" variant="ghost">
              Всего 7 вариантов
            </Button>
          }
        />
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="soft">Soft</Button>
          <Button variant="glass">Glass</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="primary" shine>
            Shine
          </Button>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button size="sm" leftIcon={<Sparkles className="size-3.5" />}>
            Small Icon
          </Button>
          <Button size="md" rightIcon={<ArrowRight className="size-4" />}>
            Medium Next
          </Button>
          <Button size="lg">Large Target</Button>
          <Button size="icon" variant="outline" aria-label="Action">
            <Send className="size-4" />
          </Button>
          <Button disabled variant="primary">
            Disabled
          </Button>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <SectionTitle title="Badges & Chips" subtitle="Маркеры категорий и интерактивные фильтры" />
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="default">Default</Badge>
          <Badge variant="accent">Accent</Badge>
          <Badge variant="soft">Soft Accent</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="success">Бесплатно</Badge>
          <Badge variant="danger">Завершено</Badge>
          <span className="rounded-full bg-[#1f1915] p-1.5">
            <Badge variant="glass">Glass</Badge>
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <Chip active={activeChip === 'all'} onClick={() => setActiveChip('all')} badge="12">
            Все программы
          </Chip>
          <Chip active={activeChip === 'courses'} onClick={() => setActiveChip('courses')} icon={<BookOpen className="size-4" />} badge="5">
            Курсы
          </Chip>
          <Chip active={activeChip === 'consultations'} onClick={() => setActiveChip('consultations')} badge="3">
            Консультации
          </Chip>
          <Chip active={activeChip === 'free'} onClick={() => setActiveChip('free')} badge="4">
            Бесплатное
          </Chip>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <SectionTitle title="Form Controls" subtitle="Input, Textarea, Checkbox с валидацией" />
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-muted">Имя</label>
            <Input placeholder="Например, Яна" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-muted">Telegram / телефон (с ошибкой)</label>
            <Input defaultValue="@username" error />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium text-muted">Сообщение или запрос</label>
          <Textarea placeholder="Опишите вашу задачу или текущую точку А..." />
        </div>
        <div className="flex flex-col gap-3 pt-2">
          <Checkbox
            id="checkbox-dev-1"
            checked={checkboxChecked}
            onCheckedChange={(checked) => setCheckboxChecked(Boolean(checked))}
            label="Согласие на обработку персональных данных"
            description="Обязательно для отправки любой заявки через приложение"
          />
          <Checkbox
            id="checkbox-dev-2"
            label="Получать полезные материалы в Telegram"
            description="Без спама, только новые статьи и подкасты"
          />
          <Checkbox id="checkbox-dev-3" disabled label="Недоступный чекбокс (disabled)" description="Пример отключенного состояния" />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <SectionTitle title="Cards" subtitle="Презентационные и интерактивные карточки" />
        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge variant="accent">Курс</Badge>
                <span className="text-xs text-muted">6 недель</span>
              </div>
              <CardTitle className="mt-2">Маркетинг без хаоса</CardTitle>
              <CardDescription>Пошаговая система привлечения клиентов для частных практиков и экспертов.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted">14 практических модулей и личный разбор стратегии.</p>
            </CardContent>
            <CardFooter className="justify-between">
              <span className="text-base font-semibold text-text">24 900 ₽</span>
              <Button size="sm">Подробнее</Button>
            </CardFooter>
          </Card>

          <Card interactive>
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge variant="soft">Консультация</Badge>
                <span className="text-xs text-muted">90 минут</span>
              </div>
              <CardTitle className="mt-2">Стратегический аудит</CardTitle>
              <CardDescription>Глубокий разбор вашей воронки продаж, позиционирования и продуктовой линейки.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted">Интерактивная карточка с эффектом нажатия и подсветки.</p>
            </CardContent>
            <CardFooter className="justify-between">
              <span className="text-base font-semibold text-text">15 000 ₽</span>
              <Button size="sm" variant="outline">
                Выбрать
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <SectionTitle title="Accordion & Sheet" subtitle="Раскрывающиеся списки и модальные шторки" />
        <Card>
          <Accordion type="single" collapsible defaultValue="item-1">
            <AccordionItem value="item-1">
              <AccordionTrigger>Кому подойдёт программа обучения?</AccordionTrigger>
              <AccordionContent>
                Программа создана для практикующих маркетологов, предпринимателей и экспертов, которые хотят стабильный поток клиентов без
                бесконечного выгорания.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Сколько времени требуется уделять в неделю?</AccordionTrigger>
              <AccordionContent>
                В среднем от 3 до 5 часов в неделю на изучение лекций и выполнение заданий по своему проекту.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Предоставляется ли рассрочка?</AccordionTrigger>
              <AccordionContent>Да, доступна внутренняя рассрочка на 3 или 6 платежей без процентов и переплат.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>

        <div className="flex items-center gap-3">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="soft">Открыть Bottom Sheet</Button>
            </SheetTrigger>
            <SheetContent side="bottom">
              <SheetHeader>
                <SheetTitle>Шторка действия</SheetTitle>
                <SheetDescription>Пример всплывающего снизу модального окна для Telegram Mini App.</SheetDescription>
              </SheetHeader>
              <div className="flex flex-col gap-3 py-4">
                <p className="text-sm text-text">
                  Шторка поддерживает безопасную зону клавиатуры и адаптирована под жестовое закрытие в мобильных браузерах.
                </p>
                <Input placeholder="Быстрый вопрос..." />
              </div>
              <div className="flex items-center justify-end gap-2 pt-2">
                <SheetClose asChild>
                  <Button variant="ghost">Отмена</Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button variant="primary">Готово</Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <SectionTitle title="Avatars & Skeletons" subtitle="Аватары автора и скелетоны загрузки" />
        <div className="flex items-center gap-4">
          <Avatar size="sm">
            <AvatarFallback>ЯА</AvatarFallback>
          </Avatar>
          <Avatar size="md">
            <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" />
            <AvatarFallback>ЯА</AvatarFallback>
          </Avatar>
          <Avatar size="lg">
            <AvatarFallback>ЯА</AvatarFallback>
          </Avatar>
          <Avatar size="xl">
            <AvatarFallback>ЯА</AvatarFallback>
          </Avatar>
        </div>

        <div className="flex flex-col gap-2 pt-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-20 w-full" />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <SectionTitle title="Empty State" subtitle="Состояние отсутствия контента или результатов" />
        <EmptyState
          icon={<Inbox className="size-6" />}
          title="Пока ничего не найдено"
          description="Попробуйте сбросить фильтры или изменить поисковый запрос."
          action={
            <Button size="sm" variant="outline" leftIcon={<CheckCircle2 className="size-4" />}>
              Сбросить фильтры
            </Button>
          }
        />
      </section>

      <section className="flex flex-col gap-4">
        <SectionTitle
          eyebrow="Motion"
          title="Анимации"
          subtitle="Reveal, Stagger, TiltCard, CountUp, ChipGroup, Carousel, Marquee, CoverImage, CtaBanner, RichText, OrbitDecoration"
        />
        <div className="relative h-64 overflow-hidden rounded-lg border border-line bg-panel">
          <OrbitDecoration className="pointer-events-none absolute -bottom-24 -left-20 size-80" />
        </div>
        <TextReveal as="h2" text="Заголовок появляется по словам" className="font-display text-2xl font-semibold" />
        <RichText text="Слова в **двойных звёздочках** подсвечиваются маркером при появлении на экране." className="text-sm text-muted" />
        <Reveal className="rounded-lg border border-line bg-panel p-4 text-sm text-muted">Reveal: блок всплывает при прокрутке</Reveal>
        <ChipGroup options={DEMO_FILTERS} value={demoFilter} onChange={setDemoFilter} layoutId="dev-chip-group" ariaLabel="Демо-фильтр" />
        <Stagger className="grid grid-cols-2 gap-3">
          {DEMO_STATS.map((stat) => (
            <StaggerItem key={stat}>
              <TiltCard className="rounded-lg">
                <div className="rounded-lg border border-line bg-panel p-4 shadow-card">
                  <CountUp value={stat} className="text-gradient font-display text-2xl font-bold" />
                </div>
              </TiltCard>
            </StaggerItem>
          ))}
        </Stagger>
        <Marquee items={['Позиционирование', 'Воронки', 'Контент']} />
        <Carousel itemClassName="w-40" ariaLabel="Демо-карусель">
          {DEMO_STATS.map((stat) => (
            <CoverImage key={stat} src="/images/demo/reel-3.webp" alt={stat} className="aspect-[9/16] rounded-lg" />
          ))}
        </Carousel>
        <CoverImage alt="Нет картинки" className="aspect-[16/9] rounded-lg" />
        <CtaBanner
          eyebrow="CTA"
          title="Градиентный призыв к действию"
          subtitle="Анимированные пятна и точечный паттерн"
          action={<Button variant="glass">Действие</Button>}
        />
      </section>
    </div>
  )
}
