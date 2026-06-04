# Backend

FastAPI backend для WP Service Master.

## Что есть

- FastAPI API.
- PostgreSQL через Docker Compose.
- Автоматическое создание таблиц на старте.
- Seed-данные для мастеров, заявок, базы знаний, склада, форума и споров.
- Endpoints для заявок, бронирований, форума, споров и check-in доказательств.
- MVP auth: регистрация, логин, bearer token, роли.

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

## Auth

```text
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
```

Демо:

```text
demo@wpservice.co.il
demo12345
```
