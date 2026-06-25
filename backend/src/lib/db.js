const { v4: uuidv4 } = require('uuid');

// ─── In-memory DB (в реальном проекте заменяется на Prisma + PostgreSQL) ───
const categories = [
  { id: 'cat-1', name: 'Апартаменты', icon: '🏠', slug: 'apartments' },
  { id: 'cat-2', name: 'Коттеджи',    icon: '🏡', slug: 'cottages'   },
  { id: 'cat-3', name: 'Отели',       icon: '🏨', slug: 'hotels'     },
  { id: 'cat-4', name: 'Виллы',       icon: '🌴', slug: 'villas'     },
];

const amenities = [
  { id: 'am-1', name: 'Wi-Fi',          icon: '📶' },
  { id: 'am-2', name: 'Парковка',       icon: '🚗' },
  { id: 'am-3', name: 'Бассейн',        icon: '🏊' },
  { id: 'am-4', name: 'Кухня',          icon: '🍳' },
  { id: 'am-5', name: 'Балкон',         icon: '🌅' },
  { id: 'am-6', name: 'Кондиционер',    icon: '❄️' },
];

const users = [
  { id: 'usr-admin', email: 'admin@bookspace.ru', password: 'admin123', name: 'Администратор',  role: 'ADMIN', createdAt: '2026-01-01T00:00:00Z' },
  { id: 'usr-owner', email: 'owner@bookspace.ru', password: 'owner123', name: 'Иван Хозяев',    role: 'OWNER', createdAt: '2026-01-10T00:00:00Z' },
  { id: 'usr-user1', email: 'user@bookspace.ru',  password: 'user123',  name: 'Мария Клиент',   role: 'USER',  createdAt: '2026-02-01T00:00:00Z' },
];

const listings = [
  {
    id: 'lst-1', title: 'Уютная студия у метро Арбат',
    description: 'Светлая студия в центре Москвы. 5 минут пешком до метро, рядом рестораны и кафе. Идеально для командировок и туристических поездок.',
    price: 3500, isActive: true, ownerId: 'usr-owner', categoryId: 'cat-1', city: 'Москва',
    rating: 4.8, reviewsCount: 24, amenityIds: ['am-1','am-4','am-6'], createdAt: '2026-02-15T00:00:00Z',
  },
  {
    id: 'lst-2', title: 'Коттедж с сауной в Подмосковье',
    description: 'Двухэтажный коттедж на 8 гостей. Сауна, мангал, огромный участок 20 соток. Лес в 200 метрах.',
    price: 12000, isActive: true, ownerId: 'usr-owner', categoryId: 'cat-2', city: 'Московская область',
    rating: 4.9, reviewsCount: 15, amenityIds: ['am-1','am-2','am-4','am-5'], createdAt: '2026-03-01T00:00:00Z',
  },
  {
    id: 'lst-3', title: 'Бутик-отель «Невский»',
    description: 'Стильный номер с видом на Невский проспект. Завтрак включён, консьерж-сервис 24/7.',
    price: 8500, isActive: true, ownerId: 'usr-owner', categoryId: 'cat-3', city: 'Санкт-Петербург',
    rating: 4.7, reviewsCount: 42, amenityIds: ['am-1','am-2','am-6'], createdAt: '2026-03-10T00:00:00Z',
  },
  {
    id: 'lst-4', title: 'Вилла с бассейном в Сочи',
    description: 'Роскошная вилла у моря. Бассейн, джакузи, терраса с панорамным видом на Чёрное море.',
    price: 25000, isActive: true, ownerId: 'usr-admin', categoryId: 'cat-4', city: 'Сочи',
    rating: 5.0, reviewsCount: 8, amenityIds: ['am-1','am-2','am-3','am-4','am-5','am-6'], createdAt: '2026-03-15T00:00:00Z',
  },
  {
    id: 'lst-5', title: 'Апарт-студия на Петроградке',
    description: 'Дизайнерская квартира в историческом доме. Полностью оснащена, отличная локация.',
    price: 4200, isActive: true, ownerId: 'usr-owner', categoryId: 'cat-1', city: 'Санкт-Петербург',
    rating: 4.6, reviewsCount: 19, amenityIds: ['am-1','am-4','am-5'], createdAt: '2026-04-01T00:00:00Z',
  },
  {
    id: 'lst-6', title: 'Горный шале в Красной Поляне',
    description: 'Атмосферное шале в 10 минутах от подъёмника. Панорамные окна, камин, террас с видом на горы.',
    price: 18000, isActive: true, ownerId: 'usr-owner', categoryId: 'cat-2', city: 'Сочи',
    rating: 4.8, reviewsCount: 11, amenityIds: ['am-1','am-2','am-4','am-5','am-6'], createdAt: '2026-04-20T00:00:00Z',
  },
];

const bookings = [
  {
    id: 'bk-1', userId: 'usr-user1', listingId: 'lst-1',
    dateFrom: '2026-07-10', dateTo: '2026-07-13',
    status: 'CONFIRMED', totalPrice: 10500, createdAt: '2026-06-20T00:00:00Z',
  },
];

const reviews = [
  { id: 'rv-1', userId: 'usr-user1', listingId: 'lst-1', rating: 5, comment: 'Отличное место! Всё как на фото, хозяин очень приветливый.', createdAt: '2026-05-20T00:00:00Z' },
  { id: 'rv-2', userId: 'usr-admin', listingId: 'lst-1', rating: 4, comment: 'Хорошая квартира, чисто и уютно. Немного далеко от метро.', createdAt: '2026-06-01T00:00:00Z' },
  { id: 'rv-3', userId: 'usr-user1', listingId: 'lst-3', rating: 5, comment: 'Невероятный вид на Невский! Обязательно вернёмся.', createdAt: '2026-06-10T00:00:00Z' },
];

const notifications = [
  { id: 'nt-1', userId: 'usr-user1', message: 'Ваше бронирование #bk-1 подтверждено!', type: 'BOOKING_CONFIRMED', isRead: false, createdAt: '2026-06-20T00:00:00Z' },
  { id: 'nt-2', userId: 'usr-user1', message: 'Оплата за бронирование прошла успешно.', type: 'PAYMENT_RECEIVED',  isRead: true,  createdAt: '2026-06-20T01:00:00Z' },
];

module.exports = { categories, amenities, users, listings, bookings, reviews, notifications, uuidv4 };
