# PROJECT MAP — yana-miniapp

Карта кодовой базы для разработчиков и AI-агентов. Обновляется при каждом изменении структуры, слайсов или архитектурных решений.

## 1. Обзор

- **Продукт**: Telegram Mini App — витрина личного бренда «Яна Алфимова»: четыре раздела (Главная, Услуги, Библиотека, Кейсы), блочный контент и прямые CTA в Telegram. Без панели управления, авторизации, бэкенда и базы данных.
- **Стек**: React 19, React Router 7, i18next + react-i18next, Tailwind CSS 4, Radix UI, @tma.js/sdk 3, Motion 14, TypeScript 5.9 (strict), Vite 8, Vitest 5.
- **Архитектура**: Feature-Sliced Design 2.1, слои `app → pages → widgets → features → entities → shared`; слой `features` сейчас пуст.
- **Стили**: Tailwind 4, дизайн-токены в `src/app/styles/theme.css`; единое светлое оформление с бургунди-акцентом. `data-surface="inverse"` инвертирует поверхности внутри блока (тёмная плашка подкастов).
- **Фон**: `AuroraBackground` — фиксированный «элитный» слой с радиальными свечениями, сеткой, зерном, частицами и большим водяным знаком логотипа.
- **Типографика**: Onest Variable для текста и Playfair Display для заголовков (кириллица + латиница, self-host через Fontsource); токены `text-eyebrow`, `text-body`, `text-lead`, минимальный основной текст 15 px, `font-synthesis: none`, балансировка заголовков и `text-wrap: pretty` для абзацев.
- **Дизайн-система**: `src/shared/ui` (Button, Card, Badge, Chip, Input, Textarea, Checkbox, Accordion, Sheet, Skeleton, EmptyState, Avatar, SectionTitle, PageHeader, CtaBanner, RichText) + `src/shared/ui/motion` (AuroraBackground, OrbitDecoration, Reveal, Stagger, TextReveal, TiltCard, Parallax, CountUp, Carousel, Marquee, ChipGroup, CoverImage, easing); DEV-витрина `/dev/components`.
- **Анимации**: Motion 14 через `app/bootstrap/MotionProvider` (LazyMotion, асинхронный domMax из `features.ts`, strict, reducedMotion=user); переходы страниц; орбита в hero услуг и вокруг портрета на главной; мозаика кейсов с печатающимися заголовками и бордовым шлейфом; one-time spotlight трёх карточек услуг с последовательной печатью (заголовок → описание → факты, один курсор, следующая карточка после завершения предыдущей); шапка `AppHeader` при прокрутке сворачивается в стеклянную пилюлю (пружина `SPRING_GLIDE`, гистерезис порогов, линия прогресса прокрутки, на десктопе меню переезжает в центр).
- **Медиа**: `public/images/brand` (логотип `logo.svg`), `services` (мокапы услуг), `cases` (фото клиентов для кружков), `reviews` (скриншоты отзывов), `avatars` (SVG-аватарки «переписки»), `demo` (картинка DEV-витрины). В контенте по умолчанию hero и обложки услуг используют Unsplash по ID; кейсы, отзывы и аватарки — локальные файлы.
- **Адаптивность**: мобильная раскладка по умолчанию; с `md` (768px) — шапка с навигацией вместо нижней панели, контейнер до `max-w-6xl`, сетки в 2–3 колонки, раскладка «заголовок слева, контент справа».
- **Выделения в тексте**: `**слово**` в любом текстовом поле контента рендерится через `RichText` как маркерная подсветка.
- **i18n**: i18next, единственный словарь `src/shared/i18n/locales/ru.ts`; язык интерфейса всегда русский.
- **Тема**: только светлая тема и акцент «бургунди»; `app/bootstrap/ThemeSync` синхронизирует цвет шапки и фона Telegram Mini App с фоном приложения.
- **Telegram**: `@tma.js/sdk` изолирован в `src/shared/lib/telegram`; провайдер `app/bootstrap/TelegramProvider` (BackButton, стартовые параметры).
- **Данные**: статический контент в `entities/site-content/api/defaults.ts`. Все CTA ведут в Telegram через `CONTACTS`. Репозиториев, Supabase, localStorage-редактора и заявок нет.
- **Подпись**: внизу `AppShell` — «сделано Tay Solutions» со ссылкой на `https://t.me/desmond333`.

## 2. Структура

```
src/
├── main.tsx                        # initTelegram(), шрифты Fontsource, стили, рендер App
├── vite-env.d.ts                   # типы VITE_* переменных
├── app/
│   ├── App.tsx                     # ErrorBoundary → MotionProvider → BrowserRouter → TelegramProvider → ThemeSync → AppShell → AppRouter
│   ├── bootstrap/
│   │   ├── ErrorBoundary/          # показ ошибки рендера
│   │   ├── MotionProvider/         # LazyMotion (асинхронный domMax, strict) + MotionConfig reducedMotion=user
│   │   ├── TelegramProvider/       # BackButton и обработка startapp
│   │   └── ThemeSync/              # цвет шапки и фона Telegram под светлый фон
│   ├── router/                     # AppRouter: маршруты, lazy, DEV-страница /dev/components
│   └── styles/                     # index.css (Tailwind), theme.css (токены), base.css (фон, сетка, зерно)
├── pages/
│   ├── home/                       # главная: композитор ContentPage
│   ├── services/                   # услуги: композитор ContentPage
│   ├── service/                    # страница одной услуги /services/:serviceId
│   ├── library/                    # библиотека: композитор ContentPage
│   ├── cases/                      # кейсы: композитор ContentPage
│   ├── not-found/                  # 404
│   └── dev-components/             # DEV-витрина токенов и компонентов дизайн-системы
├── widgets/
│   ├── app-shell/                  # AppHeader (сворачиваемая шапка), элитный фон, BottomNav, подпись Tay Solutions
│   └── content-page/               # рендер блоков выбранного раздела
├── entities/
│   └── site-content/               # типы блоков, статический контент, UI-блоки; lib/text, lib/links, lib/reviews; config/avatars
└── shared/
    ├── config/                     # APP_NAME, ROUTES, CONTACTS
    ├── i18n/                       # i18next instance, locales/ru, типизация ключей
    ├── lib/
    │   ├── telegram/               # init, env-контекст, цвет шапки, ссылки, haptics, BackButton, deepLink
    │   ├── cn.ts                   # clsx + tailwind-merge
    │   ├── format.ts               # Intl: цена, длительность, дата (+ vitest)
    │   ├── initials.ts             # инициалы для аватарок (+ vitest)
    │   └── localized.ts            # pickLocalizedText (+ vitest)
    └── ui/                         # дизайн-система: Button, Card, Badge, Chip, Input, Textarea, Checkbox, Accordion, Sheet, Skeleton, EmptyState, Avatar, SectionTitle, PageHeader, CtaBanner, RichText
        └── motion/                 # Reveal, Stagger, TextReveal, TiltCard, Parallax, CountUp, Carousel, Marquee, ChipGroup, CoverImage, AuroraBackground, OrbitDecoration
```

Каждый слайс имеет публичный API `index.ts` с явными экспортами.

## 3. Маршруты

| Путь                   | Страница          | Статус      |
| ---------------------- | ----------------- | ----------- |
| `/`                    | HomePage          | Главная     |
| `/services`            | ServicesPage      | Услуги      |
| `/services/:serviceId` | ServicePage       | Услуга      |
| `/library`             | LibraryPage       | Библиотека  |
| `/cases`               | CasesPage         | Кейсы       |
| `/dev/components`      | DevComponentsPage | DEV-витрина |
| `*`                    | NotFoundPage      | 404         |

## 4. FSD-контракт

- Порядок слоёв и импортов строго сверху вниз; импорт вверх запрещён.
- Слайсы одного слоя не импортируют друг друга; общий код опускается ниже.
- Публичный API слайса — единственный `index.ts`; глубокие импорты и wildcard-реэкспорты запрещены.
- Cross-слайсовые импорты — через alias `@/...`; внутри слайса — относительные; внутри `shared` между сегментами — относительные (`../lib`).
- `shared` без бизнес-логики, не импортирует верхние слои.
- Страницы — тонкие композиторы; каркас и навигация живут в `widgets/app-shell`.
- Legacy-каталоги (`store`, `services`, `data`, `hooks`, `components`, `utils`) запрещены.

## 5. Контроль качества

| Инструмент                        | Что проверяет                                                                      |
| --------------------------------- | ---------------------------------------------------------------------------------- |
| ESLint + eslint-plugin-boundaries | порядок слоёв, cross-импорты, глубокие импорты, shared, вложенные тернарники       |
| Steiger                           | cross-imports, sidestep API, wildcard-экспорты, import-locality, структура слайсов |
| scripts/check-structure.mjs       | legacy-каталоги, лишние файлы в корне src, наличие index.ts у слайсов              |
| Husky pre-commit                  | lint-staged + typecheck + arch:check                                               |
| vitest                            | контент по умолчанию, группировка отзывов, текст, Telegram SDK, форматтеры         |

## 6. Как поддерживать карту

При изменениях кода обновляйте раздел 2 (дерево), раздел 3 (маршруты) и «Обзор»: новый слайс, сегмент, роут или интеграция должны появиться в карте. Дорожные карты и планы в репозиторий не коммитятся — актуальный план живёт в `../PLAN.md`.
