# BookSpace — Онлайн-бронирование жилья

Полнофункциональная платформа для бронирования жилья: апартаменты, коттеджи, виллы и шале в 8 городах России.

## Стек технологий

### Фронтенд
| Технология | Версия | Назначение |
|---|---|---|
| React | 18.3.1 | Компонентная библиотека, хуки |
| TypeScript | 5.4.5 | Статическая типизация |
| Vite | 5.3.1 | Сборщик, HMR |
| React Router | 6.23.1 | Маршрутизация, ProtectedRoute |
| Zustand | 4.5.2 | Стейт-менеджмент |
| Tailwind CSS | 3.4.4 | Утилитарные стили |
| Axios | 1.7.2 | HTTP-клиент с интерцепторами |

### Бэкенд
| Технология | Версия | Назначение |
|---|---|---|
| Node.js | 22.x | Серверная платформа |
| Express | 4.21.0 | HTTP-фреймворк |
| TypeScript | 5.6.2 | Типизация |
| Prisma | 5.20.0 | ORM + миграции |
| PostgreSQL | 15+ | База данных |
| jsonwebtoken | 9.0.2 | JWT-аутентификация |
| bcrypt | 5.1.1 | Хеширование паролей |
| Zod | 3.23.8 | Валидация запросов |
| Vitest | 2.1.1 | Тестирование |

## Архитектура

### Фронтенд — Feature-Sliced Design (FSD)
```
frontend/src/
├── app/          # Провайдеры, роутер, сторы
├── pages/        # HomePage, ListingPage, ProfilePage, AuthPage, AdminPage
├── widgets/      # Header, ListingList, BookingForm, CartPanel, SearchFilters
├── features/     # auth, booking-crud, cart-checkout, search-filter, review-crud
├── entities/     # listing, booking, user, category, review, notification
└── shared/       # ui, api, lib, config
```

### Бэкенд — 3-слойная архитектура
```
backend/src/
├── routes/         # HTTP-маршруты
├── controllers/    # req/res обработка
├── services/       # Бизнес-логика
├── repositories/   # Работа с Prisma
├── middleware/     # auth, validate, role
└── schemas/        # Zod-схемы валидации
```

## Запуск

### Бэкенд
```bash
cd backend
npm install
cp .env.example .env
npx prisma migrate dev
npm run seed
npm run dev
```

### Фронтенд
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

## Тестовые аккаунты

| Email | Пароль | Роль |
|---|---|---|
| admin@bookspace.ru | admin123 | ADMIN |
| owner@bookspace.ru | owner123 | OWNER |
| user@bookspace.ru | user123 | USER |

## API

Документация: `http://localhost:3000/api/docs` (Swagger UI)

| Метод | URL | Описание |
|---|---|---|
| POST | /api/auth/register | Регистрация |
| POST | /api/auth/login | Вход |
| GET | /api/listings | Каталог объектов |
| POST | /api/bookings | Создать бронь |
| GET | /api/notifications | Уведомления |
