const { reviews, notifications, users, listings, uuidv4 } = require('../lib/db');

class ReviewRepository {
  findByListing(listingId) {
    return reviews
      .filter(r => r.listingId === listingId)
      .map(r => ({
        ...r,
        user: users.find(u => u.id === r.userId)
          ? { id: r.userId, name: users.find(u => u.id === r.userId).name }
          : null,
      }));
  }

  userAlreadyReviewed(userId, listingId) {
    return reviews.some(r => r.userId === userId && r.listingId === listingId);
  }

  create({ userId, listingId, rating, comment }) {
    const r = { id: uuidv4(), userId, listingId, rating, comment, createdAt: new Date().toISOString() };
    reviews.push(r);
    const user = users.find(u => u.id === userId);
    return { ...r, user: user ? { id: user.id, name: user.name } : null };
  }
}

class NotificationRepository {
  findByUser(userId) {
    return notifications.filter(n => n.userId === userId);
  }

  markRead(id, userId) {
    const n = notifications.find(n => n.id === id && n.userId === userId);
    if (!n) return null;
    n.isRead = true;
    return n;
  }

  markAllRead(userId) {
    notifications.filter(n => n.userId === userId).forEach(n => { n.isRead = true; });
  }

  create({ userId, message, type }) {
    const n = { id: uuidv4(), userId, message, type, isRead: false, createdAt: new Date().toISOString() };
    notifications.push(n);
    return n;
  }
}

module.exports = {
  reviewRepository: new ReviewRepository(),
  notificationRepository: new NotificationRepository(),
};
