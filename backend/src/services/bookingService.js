const bookingRepository = require('../repositories/bookingRepository');
const listingRepository = require('../repositories/listingRepository');
const { notificationRepository } = require('../repositories/otherRepositories');

class BookingService {
  getByUser(userId) {
    return bookingRepository.findByUser(userId);
  }

  getById(id, userId, role) {
    const booking = bookingRepository.findById(id);
    if (!booking) throw { status: 404, message: 'Бронирование не найдено' };
    if (booking.userId !== userId && role !== 'ADMIN') {
      throw { status: 403, message: 'Доступ запрещён' };
    }
    return booking;
  }

  create({ userId, listingId, dateFrom, dateTo }) {
    if (!listingId || !dateFrom || !dateTo) {
      throw { status: 400, message: 'Заполните все поля' };
    }
    if (new Date(dateTo) <= new Date(dateFrom)) {
      throw { status: 400, message: 'Дата выезда должна быть позже даты заезда' };
    }

    const listing = listingRepository.findById(listingId);
    if (!listing) throw { status: 404, message: 'Объект не найден' };
    if (!listing.isActive) throw { status: 400, message: 'Объект недоступен для бронирования' };

    // Нельзя бронировать собственный объект
    if (listing.ownerId === userId) {
      throw { status: 400, message: 'Нельзя бронировать собственный объект' };
    }

    // 409 — конфликт дат
    if (bookingRepository.hasConflict(listingId, dateFrom, dateTo)) {
      throw { status: 409, message: 'Выбранные даты недоступны' };
    }

    // Расчёт стоимости: количество ночей × цена
    const nights = Math.ceil((new Date(dateTo) - new Date(dateFrom)) / (1000 * 60 * 60 * 24));
    const totalPrice = listing.price * nights;

    const booking = bookingRepository.create({ userId, listingId, dateFrom, dateTo, status: 'CONFIRMED', totalPrice });

    // Создаём уведомление
    notificationRepository.create({
      userId,
      message: `Бронирование "${listing.title}" подтверждено на ${dateFrom} – ${dateTo}`,
      type: 'BOOKING_CONFIRMED',
    });

    return booking;
  }

  cancel(id, userId, role) {
    const booking = bookingRepository.findById(id);
    if (!booking) throw { status: 404, message: 'Бронирование не найдено' };
    if (booking.userId !== userId && role !== 'ADMIN') {
      throw { status: 403, message: 'Нельзя отменить чужое бронирование' };
    }
    if (booking.status === 'CANCELLED') {
      throw { status: 400, message: 'Бронирование уже отменено' };
    }
    return bookingRepository.updateStatus(id, 'CANCELLED');
  }
}

module.exports = new BookingService();
