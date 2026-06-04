# Техническая архитектура

## MVP сейчас

```text
web/index.html
web/styles.css
web/app.js
localStorage
```

Это кликабельный прототип, который можно открыть без установок. Он нужен, чтобы быстро проверить логику продукта: роли, заявки, базу знаний, бронирование, check-in, споры, CRM и монетизацию.

## Production-архитектура

```text
Cloudflare Tunnel
        |
*.wpservice.co.il
        |
Nginx / Caddy
        |
  +-----+--------------------+------------------+
  |                          |                  |
Frontend PWA            Backend API        Telegram bots
Next.js/React           FastAPI/Django      aiogram/webhooks
  |                          |                  |
  +-------------+------------+------------------+
                |
         PostgreSQL
         Redis
         Object storage
```

## Основные модули backend

- Auth: email, phone, Google OAuth, Telegram login.
- Users: роли, профили, документы, верификация.
- Marketplace: заявки, отклики, назначение мастера.
- Booking: календарь, слоты, отмены, минимальный выезд.
- Knowledge Base: статьи, симптомы, чек-листы, цены, красные флаги.
- CRM: клиенты мастера, история работ, склад, поставщики.
- Reviews: двусторонние отзывы после реальной работы.
- Rating Engine: рейтинг с учетом отзывов, споров, скорости ответа и повторных клиентов.
- Evidence: фото, видео, GPS, серверное время, audit log.
- Arbitration: споры, доказательства, решения поддержки.
- Payments: балансы, комиссии, подписки, возвраты.
- Forum/Support: темы, тикеты, модерация.
- Admin: роли, права, настройки платформы.

## Минимальная схема БД

```text
users
profiles
roles
master_categories
requests
request_messages
bookings
checkins
reviews
knowledge_articles
inventory_items
suppliers
balances
transactions
disputes
forum_topics
support_tickets
audit_log
```

## Check-in мастера

Правильная production-логика:

1. Мастер нажимает `Я на месте`.
2. Backend выдает одноразовый proof token.
3. Клиент получает push/SMS/Telegram уведомление.
4. Приложение пишет короткое видео/фото через платформу.
5. Водяной знак содержит order id, server time, master id.
6. GPS сверяется с адресом заказа.
7. Если клиент не открыл дверь, запускается таймер ожидания.
8. После таймера можно начислить минимальный выезд.

Время должно идти с сервера, не с телефона мастера.

## Рейтинг

Рейтинг не должен быть простой средней звезд:

```text
rating = отзывы после реальных работ
       + завершенные заказы
       + скорость ответа
       + повторные клиенты
       + верификация документов
       - подтвержденные споры
       - отмены без причины
```

Отдельно показывать клиенту:

- качество;
- пунктуальность;
- цена;
- чистота;
- коммуникация;
- процент споров.
