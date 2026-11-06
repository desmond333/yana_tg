# Запуск Mini App в Telegram-канале

Пошаговая инструкция: от кода на компьютере до кнопки «Открыть приложение» в канале.

Схема запуска:

- **Фронтенд** — статическая сборка Vite на Cloudflare Pages.
- **Бэкенд и база данных** — не нужны. Контент хранится в коде, заявки открывают личный чат Telegram.
- **Бот** — нужен только для регистрации Mini App и кнопки в канале.

Понадобятся аккаунты: Telegram, GitHub, Cloudflare. Node.js 22+.

Все команды выполняются в папке `miniapp`.

---

## Шаг 1. Создать бота

1. В Telegram откройте [@BotFather](https://t.me/BotFather) → `/newbot`.
2. Имя: `Яна Алфимова`. Username: например `YanaAlfimovaBot` (должен заканчиваться на `bot`).
3. Сохраните **токен бота** (`123456:ABC...`). Никому его не показывайте и не коммитьте.

## Шаг 2. Залить код на GitHub

1. Создайте на GitHub **приватный** репозиторий `yana-miniapp` (пустой, без README).
2. Закоммитьте и отправьте код:

```bash
git add -A
git commit -m "Первый релиз Mini App"
git remote add origin https://github.com/<ваш_логин>/yana-miniapp.git
git push -u origin master
```

## Шаг 3. Cloudflare Pages: опубликовать витрину

1. [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git** → выберите `yana-miniapp`.
2. Настройки сборки:
   - Framework preset: `Vite`
   - Build command: `npm run build`
   - Build output directory: `dist`
3. **Environment variables** (Production):

| Переменная               | Значение                                    |
| ------------------------ | ------------------------------------------- |
| `VITE_APP_NAME`          | `Яна Алфимова`                              |
| `VITE_TELEGRAM_USERNAME` | личный username Яны без `@`                 |
| `VITE_CHANNEL_URL`       | `https://t.me/<username_канала>`            |
| `VITE_INSTAGRAM_URL`     | ссылка на Instagram (можно оставить пустой) |
| `VITE_YOUTUBE_URL`       | ссылка на YouTube (можно оставить пустой)   |

4. **Save and Deploy**. Получите адрес вида `https://yana-miniapp.pages.dev`. Откройте его в браузере — витрина должна загрузиться.

## Шаг 4. Зарегистрировать Mini App в BotFather

1. `@BotFather` → `/newapp` → выберите бота.
2. Название `Яна Алфимова`, короткое описание, картинка 640×360 (например, обложка канала), GIF — пропустить.
3. **Web App URL** — адрес из шага 3.
4. **Short name** — `app`.
5. Прямая ссылка на приложение: `https://t.me/<username_бота>/app`.
6. Кнопка в меню бота: `/setmenubutton` → бот → URL из шага 3 → текст `Открыть`.

## Шаг 5. Кнопка в канале

1. В обычном посте канала нельзя добавить кнопку `web_app` — Telegram разрешает её только в личке с ботом. Для канала есть два способа:
   - **Ссылка в тексте поста**: `Открыть каталог → https://t.me/<username_бота>/app?startapp=catalog`
   - **Пост с кнопкой-ссылкой** через бота-редактора (например, [@ControllerBot](https://t.me/ControllerBot)): кнопка типа URL с той же ссылкой.
2. Закрепите пост. Добавьте ссылку `https://t.me/<username_бота>/app` в описание канала.

Ссылки на разделы:

| Куда ведёт           | `startapp=`   |
| -------------------- | ------------- |
| Услуги               | `services`    |
| Подкасты / материалы | `podcasts`    |
| Кейсы                | `cases`       |
| Главная              | без параметра |

## Шаг 6. Проверка перед анонсом

- [ ] Ссылка из канала открывает приложение на iPhone, Android и Telegram Desktop.
- [ ] Кнопка «Назад» Telegram возвращает на предыдущий экран, на главной — скрыта.
- [ ] Кнопки «Оставить заявку» и «Написать в Telegram» открывают личный чат с готовым сообщением.
- [ ] Панель управления и авторизация отсутствуют; `/admin` и `/lead` не открывают форму.
- [ ] **Проверка из России без VPN** (мобильный интернет и Wi-Fi): витрина грузится. Если Cloudflare работает медленно — перенести статическую папку `dist` на российский хостинг с HTTPS и поменять URL в BotFather.
