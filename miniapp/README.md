# yana-miniapp

Telegram Mini App — витрина личного бренда маркетолога «Яна Алфимова»: четыре раздела (Главная, Услуги, Библиотека, Кейсы), блочный контент, анимации и прямые ссылки на Telegram. Работает без бэкенда и базы данных: весь контент хранится в фронтенде, заявки уходят в личный чат Telegram.

## 1. Стек технологий

| Категория                | Технологии                                                                        |
| ------------------------ | --------------------------------------------------------------------------------- |
| **UI & Роутинг**         | React 19, React Router 7                                                          |
| **Стилизация**           | Tailwind CSS 4, CSS-переменные в `@theme` (`src/app/styles/theme.css`)            |
| **Компоненты (UI)**      | Radix UI (Slot, Accordion, Dialog/Sheet, Checkbox, Avatar), Lucide Icons          |
| **Анимации**             | Motion 14 (`motion/react`, LazyMotion + domMax), CSS keyframes в `theme.css`      |
| **Локализация**          | i18next + react-i18next (только русский словарь интерфейса)                       |
| **Telegram SDK**         | @tma.js/sdk 3 (viewport, backButton, hapticFeedback, тема шапки)                  |
| **Шрифты**               | Self-hosted Fontsource: Onest (основной) + Playfair Display (акцентный/заголовки) |
| **Сборка & Типизация**   | Vite 8, TypeScript 5.9 (strict, `noUncheckedIndexedAccess`)                       |
| **Тестирование**         | Vitest 5                                                                          |
| **Контроль архитектуры** | ESLint + eslint-plugin-boundaries, Steiger, scripts/check-structure.mjs           |

## 2. Быстрый старт

### Требования

- Node.js 22.12+
- npm 10+

### Установка и запуск

```bash
# Установка зависимостей
npm install

# Запуск dev-сервера с HMR
npm run dev
```

Приложение доступно по адресу `http://localhost:5173`.

> **Работа в браузере**: приложение автоматически определяет окружение. Вне Telegram SDK переключается в безопасный режим: внешние ссылки открываются через `window.open`, язык интерфейса всегда русский, оформление фиксировано — светлая тема с бургунди-акцентом.

## 3. Скрипты проекта

| Команда              | Описание                                              |
| -------------------- | ----------------------------------------------------- |
| `npm run dev`        | Dev-сервер с HMR                                      |
| `npm run build`      | Production-сборка в `dist/`                           |
| `npm run preview`    | Предпросмотр production-сборки                        |
| `npm run typecheck`  | Проверка TypeScript                                   |
| `npm run lint`       | ESLint                                                |
| `npm run format`     | Prettier                                              |
| `npm run test`       | Vitest в watch-режиме                                 |
| `npm run test:run`   | Однократный прогон тестов                             |
| `npm run arch:check` | Steiger + проверка FSD-структуры                      |
| `npm run check`      | Полный прогон: формат, lint, типы, архитектура, тесты |
| `npm run gen:slice`  | Генератор нового FSD-слайса                           |

## 4. Архитектура Feature-Sliced Design (FSD 2.1)

```
src/
├── main.tsx                        # initTelegram(), шрифты Fontsource, стили, рендер App
├── vite-env.d.ts                   # типы VITE_* переменных
├── app/
│   ├── App.tsx                     # ErrorBoundary → MotionProvider → BrowserRouter → TelegramProvider → ThemeSync → AppShell → AppRouter
│   ├── bootstrap/
│   │   ├── ErrorBoundary/          # показ ошибки рендера
│   │   ├── MotionProvider/         # LazyMotion (асинхронный domMax, strict) + MotionConfig reducedMotion=user
│   │   ├── TelegramProvider/       # BackButton, стартовые параметры Mini App
│   │   └── ThemeSync/              # цвет шапки и фона Telegram под светлый фон
│   ├── router/                     # AppRouter: маршруты, lazy, DEV-страница /dev/components
│   └── styles/                     # index.css (Tailwind), theme.css (токены), base.css (базовые стили, фон, сетка, зерно)
├── pages/
│   ├── home/                       # главная: ContentPage
│   ├── services/                   # услуги: ContentPage
│   ├── service/                    # страница услуги /services/:serviceId
│   ├── library/                    # библиотека: ContentPage
│   ├── cases/                      # кейсы: ContentPage
│   ├── not-found/                  # 404
│   └── dev-components/             # DEV-витрина токенов и компонентов
├── widgets/
│   ├── app-shell/                  # шапка, элитный фон, BottomNav, подпись «сделано Tay Solutions»
│   └── content-page/               # рендер блоков раздела
├── entities/
│   └── site-content/               # типы блоков, статический контент, UI-блоки, lib/text и lib/reviews
└── shared/
    ├── config/                     # APP_NAME, ROUTES, CONTACTS
    ├── i18n/                       # i18next, locales/ru
    ├── lib/                        # cn, format, initials, localized, telegram (init, links, theme, deepLink)
    └── ui/                         # дизайн-система + ui/motion (Reveal, Stagger, Carousel, OrbitDecoration, AuroraBackground…)
```

Слоя `features` сейчас нет: пользовательских сценариев с отдельной бизнес-логикой не осталось.

Каждый слайс имеет публичный API `index.ts` с явными экспортами.

### Архитектурные правила

- Порядок слоёв и импортов строго сверху вниз: `app → pages → widgets → features → entities → shared`.
- Слайсы одного слоя не импортируют друг друга.
- Публичный API слайса — единственный `index.ts`; глубокие импорты и wildcard-реэкспорты запрещены.
- Cross-слайсовые импорты — через alias `@/...`, внутри слайса — относительные.
- `shared` не содержит бизнес-логики и не импортирует верхние слои.
- Legacy-каталоги (`store`, `services`, `data`, `hooks`, `components`, `utils`) запрещены.

## 5. Контент и данные

- Контент четырёх разделов — статический массив блоков в `src/entities/site-content/api/defaults.ts`.
- Панели управления, авторизации, базы данных и серверных функций нет.
- Все CTA-кнопки диагностики, листа ожидания и связи ведут в Telegram (`CONTACTS` в `src/shared/config/site.ts`).
- Фото кейсов, отзывов и аватарок — локальные файлы в `public/images`; hero и обложки услуг по умолчанию подключены по ID Unsplash.
- Чтобы изменить текст, цену, картинку или ссылку, отредактируйте `defaults.ts` и пересоберите приложение.

## 6. Дизайн и анимации

- Стиль «тёплый премиум»: палитра и тени — токены в `src/app/styles/theme.css`, утилиты `glass`, `text-gradient`, `bg-accent-gradient`, `elite-grid`, `elite-grain` — в `base.css`.
- Типографика: Onest Variable + Playfair Display, токены `text-eyebrow` / `text-body` / `text-lead`; основной текст не мельче 15 px, заголовки балансируются, абзацы используют `text-wrap: pretty`.
- Анимации: переходы страниц, `Reveal`, `Stagger`, `TextReveal`, `TiltCard`, `CountUp`, карусели, «элитный» фон с сеткой и частицами, орбита вокруг портрета на главной, мозаика кейсов с печатающимися заголовками и бордовым шлейфом, one-time spotlight-анимация трёх карточек услуг.
- Учитывается системная настройка «Уменьшить движение» (`MotionConfig reducedMotion="user"` + CSS media query).
- DEV-витрина `/dev/components` показывает компоненты и состояния дизайн-системы.

## 7. Переменные окружения

Скопируйте `.env.example` в `.env.local` и заполните нужные значения.

| Переменная               | Назначение                                                                                              |
| ------------------------ | ------------------------------------------------------------------------------------------------------- |
| `VITE_APP_NAME`          | Название в шапке                                                                                        |
| `VITE_TELEGRAM_USERNAME` | Личный username автора без `@` (по умолчанию `alfiimova`): кнопки диагностики и связи с готовым текстом |
| `VITE_CHANNEL_URL`       | Ссылка на Telegram-канал                                                                                |
| `VITE_INSTAGRAM_URL`     | Ссылка на Instagram                                                                                     |
| `VITE_YOUTUBE_URL`       | Ссылка на YouTube                                                                                       |

## 8. Запуск в Telegram и деплой

Пошаговая инструкция (BotFather, Cloudflare Pages, кнопка в канале) — в [LAUNCH.md](./LAUNCH.md).

## 9. Ручной чеклист тестирования

### Платформы и окружения

- [ ] **Telegram iOS**: safe-area сверху и снизу, отсутствие нежелательного свайп-закрытия.
- [ ] **Telegram Android**: физическая/экранная кнопка «Назад» работает.
- [ ] **Telegram Desktop**: адаптивная ширина, внешние ссылки открываются в браузере.
- [ ] **Обычный браузер (Safari, Chrome)**: приложение работает без ошибок Telegram context.

### Дизайн и навигация

- [ ] Только светлая тема с бургунди-акцентом; тёмная тема не включается.
- [ ] Шапка читаема при скролле, логотип и подпись «маркетолог» не ломаются.
- [ ] Все кнопки имеют hover/focus-состояние, иконочные кнопки — `aria-label`.
- [ ] Мобильные карусели листаются стрелками по бокам, без обрезанных карточек.
- [ ] Панель управления и авторизация отсутствуют, прямые ссылки `/admin` и `/lead` ведут на 404/раздел услуг.

### Контент и CTA

- [ ] Кнопки «Оставить заявку» и «Написать в Telegram» открывают чат с готовым сообщением.
- [ ] Ссылки на канал, Instagram и YouTube открываются корректно.
- [ ] Внизу страницы видна подпись «сделано Tay Solutions» со ссылкой на `@desmond333`.
