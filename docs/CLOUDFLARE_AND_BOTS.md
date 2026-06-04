# Cloudflare, поддомены и параллельная работа с cashback-ботом

## Поддомены

Рекомендуемая схема:

```text
app.wpservice.co.il       основной сайт/PWA
api.wpservice.co.il       backend API
admin.wpservice.co.il     админка
bot.wpservice.co.il       Telegram webhooks
forum.wpservice.co.il     форум, если будет отдельным
```

## Cloudflare Tunnel

Идея:

```text
Пользователь
   |
Cloudflare
   |
Cloudflare Tunnel на твоем ПК
   |
локальные сервисы
```

Cloudflare Tunnel работает через исходящее соединение от твоего ПК к Cloudflare. Входящие порты на роутере открывать не нужно.

## Маршруты

Если `cloudflared` запущен в том же Docker Compose:

```text
app.wpservice.co.il -> http://master_web:80
```

Если `cloudflared` запущен отдельно на Windows:

```text
app.wpservice.co.il -> http://localhost:3010
```

Будущие маршруты:

```text
api.wpservice.co.il -> http://localhost:8010
bot.wpservice.co.il -> http://localhost:8090
```

Для админки желательно включить Cloudflare Access, чтобы вход был только по твоему email/Google.

## Запуск текущего Docker MVP

```powershell
cd E:\BOTs\Master-service
copy .env.example .env
docker compose up -d --build
```

Локально:

```text
http://localhost:3010
```

С tunnel:

```powershell
docker compose -f docker-compose.yml -f docker-compose.tunnel.yml up -d --build
```

В `.env` должен быть `CLOUDFLARE_TUNNEL_TOKEN`.

## Как не мешать cashback-боту

Держи проекты отдельно:

```text
E:\BOTs\Cashback_Club_bot
E:\BOTs\Master-service
```

В VS Code удобнее:

1. Открыть новое окно VS Code.
2. В одном окне открыть `Cashback_Club_bot`.
3. Во втором окне открыть `Master-service`.
4. Не запускать оба проекта на одинаковых портах.

Пример портов:

```text
Cashback bot:       8080 / 8000, как уже настроено
Master frontend:    3010
Master backend:     8010
Master bot webhook: 8090
```

## Как вести чаты с Codex

Лучше отдельные чаты:

- один чат для cashback-бота;
- отдельный чат для Master-service;
- если задача большая, отдельный чат на backend, frontend или инфраструктуру.

Так Codex не будет путать контекст, файлы и бизнес-логику.

## Что делать с открытым cashback-ботом

Не закрывай его, если он работает. Новый проект не трогает папку cashback-бота. Главное:

- не использовать те же порты;
- не менять `.env` cashback-проекта;
- не запускать команды из чужой папки;
- для Master-service всегда проверять текущую папку `E:\BOTs\Master-service`.
