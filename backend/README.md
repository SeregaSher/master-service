# Backend план

В этой версии backend еще не поднят, потому что на машине сейчас нет Python/Node в PATH. MVP работает как автономный web-прототип.

## Рекомендуемый стек

- Python 3.12
- FastAPI
- PostgreSQL
- Redis
- SQLAlchemy или SQLModel
- Alembic migrations
- JWT sessions + Google OAuth
- aiogram для Telegram-бота

## Порты

```text
Frontend: 3000
Backend:  8010
Bot:      8090
```

## Первый backend-спринт

1. Auth и роли.
2. CRUD заявок.
3. CRUD мастеров.
4. Бронирование.
5. База знаний.
6. Check-in: server time, GPS, фото.
7. Отзывы.
8. Споры.
