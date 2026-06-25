const { reviewRepository } = require('../repositories/otherRepositories');
const listingRepository = require('../repositories/listingRepository');

class ReviewService {
  getByListing(listingId) {
    return reviewRepository.findByListing(listingId);
  }

  create({ userId, listingId, rating, comment }) {
    if (!rating || !comment) throw { status: 400, message: 'Укажите оценку и комментарий' };
    if (rating < 1 || rating > 5) throw { status: 400, message: 'Оценка от 1 до 5' };

    const listing = listingRepository.findById(listingId);
    if (!listing) throw { status: 404, message: 'Объект не найден' };

    // 409 — нельзя оставить два отзыва
    if (reviewRepository.userAlreadyReviewed(userId, listingId)) {
      throw { status: 409, message: 'Вы уже оставили отзыв на этот объект' };
    }

    return reviewRepository.create({ userId, listingId, rating, comment });
  }
}

module.exports = new ReviewService();
