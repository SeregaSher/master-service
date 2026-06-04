# WP Service Master

Рабочий старт проекта для площадки мастеров, клиентов и магазинов запчастей.

## Что уже есть

- автономный PWA-интерфейс без сборки;
- роли: клиент, мастер, магазин, поддержка, админ;
- заявки, назначение мастера, бронирование;
- база знаний для клиента, мастера и DIY;
- check-in мастера с камерой/GPS в демо-режиме;
- арбитраж споров;
- форум/поддержка;
- CRM/склад мастера;
- демо-админка;
- сохранение состояния в `localStorage`.

## Локальный запуск без Docker

Открой файл:

```text
E:\BOTs\Master-service\web\index.html
```

Публичный адрес MVP:

```text
https://app.wpservice.co.il
```

## Запуск в Docker

```powershell
cd E:\BOTs\Master-service
copy .env.example .env
docker compose up -d --build
```

После запуска:

```text
http://localhost:3010
http://localhost:3010/health
```

## Внешний доступ через Cloudflare

1. В Cloudflare Dashboard открой `Networking` -> `Tunnels`.
2. Создай tunnel, например `master-service`.
3. Добавь public hostname:

```text
app.wpservice.co.il -> http://master_web:80
```

4. Скопируй tunnel token в `.env`:

```env
CLOUDFLARE_TUNNEL_TOKEN=...
```

5. Запусти сайт вместе с tunnel:

```powershell
docker compose -f docker-compose.yml -f docker-compose.tunnel.yml up -d --build
```

Token нельзя публиковать в git.

Текущий tunnel запущен через Docker Compose. Проверка:

```powershell
cd E:\BOTs\Master-service
docker compose -f docker-compose.yml -f docker-compose.tunnel.yml ps
docker compose -f docker-compose.yml -f docker-compose.tunnel.yml logs -f cloudflared
```

## Git

Репозиторий уже инициализирован в этой папке. Если на машине еще не настроен git author:

```powershell
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

Первый коммит:

```powershell
cd E:\BOTs\Master-service
git add .
git commit -m "Initial Master Service MVP"
```

## Следующий технический шаг

1. Поставить Node.js LTS и Python 3.12, если будем делать полноценный frontend/backend.
2. Перевести `web/` на Next.js или оставить как PWA и подключить API.
3. Сделать backend на FastAPI/Django.
4. Подключить PostgreSQL, Redis, файловое хранилище.
5. Добавить Telegram Mini App.
6. Развивать мобильные приложения только после проверки спроса.

Подробности в `docs/`.
