# Backend

FastAPI backend для WP Service Master.

## Что есть

- FastAPI API.
- PostgreSQL через Docker Compose.
- Автоматическое создание таблиц на старте.
- Seed-данные для мастеров, заявок, базы знаний, склада, форума и споров.
- Endpoints для заявок, бронирований, форума, споров и check-in доказательств.

## Локально

Backend доступен внутри Docker-сети как:

```text
http://backend:8000
```

С хоста:

```text
http://localhost:8010
```

Через frontend/nginx:

```text
http://localhost:3010/api/bootstrap
https://app.wpservice.co.il/api/bootstrap
```
