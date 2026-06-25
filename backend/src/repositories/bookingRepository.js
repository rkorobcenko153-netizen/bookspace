const { bookings, listings, uuidv4 } = require('../lib/db');

class BookingRepository {
  findAll() {
    return bookings.map(b => this._withRelations(b));
  }

  findByUser(userId) {
    // .filter() из лекции — фильтруем брони конкретного пользователя
    return bookings
      .filter(b => b.userId === userId)
      .map(b => this._withRelations(b));
  }

  findById(id) {
    const b = bookings.find(b => b.id === id);
    return b ? this._withRelations(b) : null;
  }

  // Находим пересечение дат для проверки доступности
  hasConflict(listingId, dateFrom, dateTo, excludeId = null) {
    return bookings
      .filter(b => b.listingId === listingId && b.id !== excludeId)
      .filter(b => b.status !== 'CANCELLED')
      .some(b => !(dateTo <= b.dateFrom || dateFrom >= b.dateTo));
  }

  create(data) {
    const booking = { id: uuidv4(), ...data, createdAt: new Date().toISOString() };
    bookings.push(booking);
    return this._withRelations(booking);
  }

  updateStatus(id, status) {
    const b = bookings.find(b => b.id === id);
    if (!b) return null;
    b.status = status;
    return this._withRelations(b);
  }

  _withRelations(b) {
    const listing = listings.find(l => l.id === b.listingId);
    return { ...b, listing: listing ? { id: listing.id, title: listing.title, price: listing.price, city: listing.city } : null };
  }
}

module.exports = new BookingRepository();
