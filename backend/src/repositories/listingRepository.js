// Repository слой — только работа с данными, никакой бизнес-логики
const { listings, amenities, categories } = require('../lib/db');

class ListingRepository {
  // Используем .filter() и .map() из лекции по React/JS
  findAll({ categoryId, city, minPrice, maxPrice, search } = {}) {
    return listings
      .filter(l => l.isActive)
      .filter(l => !categoryId || l.categoryId === categoryId)
      .filter(l => !city || l.city.toLowerCase().includes(city.toLowerCase()))
      .filter(l => !minPrice || l.price >= Number(minPrice))
      .filter(l => !maxPrice || l.price <= Number(maxPrice))
      .filter(l => !search || l.title.toLowerCase().includes(search.toLowerCase()) || l.city.toLowerCase().includes(search.toLowerCase()))
      .map(l => this._withRelations(l));
  }

  findById(id) {
    const l = listings.find(l => l.id === id);
    return l ? this._withRelations(l) : null;
  }

  findByOwner(ownerId) {
    return listings.filter(l => l.ownerId === ownerId).map(l => this._withRelations(l));
  }

  // Обогащаем листинг связанными данными
  _withRelations(l) {
    return {
      ...l,
      category: categories.find(c => c.id === l.categoryId) || null,
      amenities: amenities.filter(a => l.amenityIds.includes(a.id)),
    };
  }
}

module.exports = new ListingRepository();
