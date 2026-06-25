# BookSpace — Онлайн-бронирование жилья

Полнофункциональная платформа для бронирования жилья: апартаменты, коттеджи, виллы, шале в 8 городах России.

## Стек технологий

### Фронтенд
| Технология | Назначение |
|---|---|
| React 18 | Компонентная библиотека, хуки, Context API |
| Babel Standalone | Транспиляция JSX прямо в браузере |
| Context API (Zustand-style) | 4 глобальных стора: auth, cart, listing, notif |
| CSS Variables | Дизайн-система «Midnight Indigo» |
| OpenStreetMap | Карта объектов через iframe |

### Бэкенд
| Технология | Назначение |
|---|---|
| Node.js 22 | Серверная платформа |
| Express 4.18 | HTTP-фреймворк, REST API |
| jsonwebtoken | JWT-аутентификация |
| uuid | Генерация UUID v4 |
| cors | Кросс-доменные запросы |

## Архитектура

### Фронтенд — Feature-Sliced Design (FSD)
```
src/
├── app/          # StoreProvider, Router, 4 Context-стора
├── pages/        # HomePage, ListingDetailPage, MapPage, FSDPage, AuthPage
├── widgets/      # Header, ListingList, CartPanel, BookingForm
├── features/     # auth, booking-crud, cart-checkout, search-filter
├── entities/     # listing, booking, user, category, review
└── shared/       # ui, api, config, lib
```

### Бэкенд — 3-слойная архитектура
```
backend/src/
├── routes/         # Маршрутизация API
├── controllers/    # req/res → service
├── services/       # Бизнес-логика
├── repositories/   # Работа с данными (→ Prisma)
├── middleware/     # JWT + requireRole()
└── lib/db.js       # Seed-данные (12 объектов)
```

## Возможности

- 🏠 **12 объектов** в 8 городах (от 2 900 до 55 000 ₽/ночь)
- 🛒 **Корзина** — добавление нескольких объектов, выбор дат, расчёт итога
- 🗺️ **Карта** — OpenStreetMap + таблица координат + ссылка Google Maps
- 🌲 **FSD-дерево** — интерактивная схема архитектуры
- 🔐 **Авторизация** — JWT, роли USER / OWNER / ADMIN
- 📋 **Бронирования** — создание, отмена, уведомления
- ⭐ **Отзывы** — добавление и просмотр

## Запуск

### Бэкенд
```bash
cd backend
npm install
node src/index.js
# Сервер: http://localhost:3001
```

### Фронтенд
Открыть `frontend/index.html` в браузере (или через Live Server).

## Тестовые аккаунты

| Email | Пароль | Роль |
|---|---|---|
| admin@bookspace.ru | admin123 | ADMIN |
| owner@bookspace.ru | owner123 | OWNER |
| user@bookspace.ru | user123 | USER |

## API Эндпойнты

```
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/me
GET    /api/listings
GET    /api/listings/:id
POST   /api/bookings
PATCH  /api/bookings/:id/cancel
GET    /api/notifications
GET    /api/categories
GET    /api/admin/users     (ADMIN)
```

## База данных

Схема готова для Prisma + PostgreSQL (8 моделей, 5 enum-ов). Текущая реализация — in-memory для демонстрации.
