// Controllers — принимают req/res, делегируют сервисам
const authService    = require('../services/authService');
const listingService = require('../services/listingService');
const bookingService = require('../services/bookingService');
const reviewService  = require('../services/reviewService');
const { notificationRepository } = require('../repositories/otherRepositories');
const userRepository = require('../repositories/userRepository');
const { categories, amenities } = require('../lib/db');

// ── Auth ──────────────────────────────────────────────────
const authController = {
  register(req, res) {
    try {
      const result = authService.register(req.body);
      res.status(201).json({ success: true, data: result });
    } catch (e) { res.status(e.status || 500).json({ success: false, message: e.message }); }
  },
  login(req, res) {
    try {
      const result = authService.login(req.body);
      res.json({ success: true, data: result });
    } catch (e) { res.status(e.status || 500).json({ success: false, message: e.message }); }
  },
  me(req, res) {
    res.json({ success: true, data: req.user });
  },
};

// ── Listings ──────────────────────────────────────────────
const listingController = {
  getAll(req, res) {
    const data = listingService.getAll(req.query);
    res.json({ success: true, data, total: data.length });
  },
  getOne(req, res) {
    try {
      res.json({ success: true, data: listingService.getById(req.params.id) });
    } catch (e) { res.status(e.status || 500).json({ success: false, message: e.message }); }
  },
  getMyListings(req, res) {
    res.json({ success: true, data: listingService.getByOwner(req.user.id) });
  },
};

// ── Bookings ──────────────────────────────────────────────
const bookingController = {
  getMyBookings(req, res) {
    res.json({ success: true, data: bookingService.getByUser(req.user.id) });
  },
  create(req, res) {
    try {
      const booking = bookingService.create({ userId: req.user.id, ...req.body });
      res.status(201).json({ success: true, data: booking });
    } catch (e) { res.status(e.status || 500).json({ success: false, message: e.message }); }
  },
  cancel(req, res) {
    try {
      const booking = bookingService.cancel(req.params.id, req.user.id, req.user.role);
      res.json({ success: true, data: booking });
    } catch (e) { res.status(e.status || 500).json({ success: false, message: e.message }); }
  },
};

// ── Reviews ───────────────────────────────────────────────
const reviewController = {
  getByListing(req, res) {
    res.json({ success: true, data: reviewService.getByListing(req.params.listingId) });
  },
  create(req, res) {
    try {
      const r = reviewService.create({ userId: req.user.id, listingId: req.params.listingId, ...req.body });
      res.status(201).json({ success: true, data: r });
    } catch (e) { res.status(e.status || 500).json({ success: false, message: e.message }); }
  },
};

// ── Notifications ─────────────────────────────────────────
const notificationController = {
  getAll(req, res) {
    const data = notificationRepository.findByUser(req.user.id);
    res.json({ success: true, data, unreadCount: data.filter(n => !n.isRead).length });
  },
  markRead(req, res) {
    const n = notificationRepository.markRead(req.params.id, req.user.id);
    if (!n) return res.status(404).json({ success: false, message: 'Не найдено' });
    res.json({ success: true, data: n });
  },
  markAllRead(req, res) {
    notificationRepository.markAllRead(req.user.id);
    res.json({ success: true });
  },
};

// ── Categories & Amenities ────────────────────────────────
const categoryController = {
  getAll(req, res) { res.json({ success: true, data: categories }); },
};
const amenityController = {
  getAll(req, res) { res.json({ success: true, data: amenities }); },
};

// ── Admin ─────────────────────────────────────────────────
const adminController = {
  getUsers(req, res) {
    res.json({ success: true, data: userRepository.findAll() });
  },
  getAllBookings(req, res) {
    const { bookings } = require('../lib/db');
    res.json({ success: true, data: bookings });
  },
};

module.exports = {
  authController, listingController, bookingController,
  reviewController, notificationController, categoryController,
  amenityController, adminController,
};
