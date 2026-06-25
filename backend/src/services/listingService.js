const listingRepository = require('../repositories/listingRepository');

class ListingService {
  getAll(filters) {
    return listingRepository.findAll(filters);
  }

  getById(id) {
    const listing = listingRepository.findById(id);
    if (!listing) throw { status: 404, message: 'Объект не найден' };
    return listing;
  }

  getByOwner(ownerId) {
    return listingRepository.findByOwner(ownerId);
  }
}

module.exports = new ListingService();
