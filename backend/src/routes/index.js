const express = require('express');
const { authMiddleware, requireRole } = require('../middleware/auth');
const {
  authController, listingController, bookingController,
  reviewController, notificationController, categoryController,
  amenityController, adminController,
} = require('../controllers');

const router = express.Router();

// ── Auth ──────────────────────────────────────────────────
router.post('/auth/register', authController.register);
router.post('/auth/login',    authController.login);
router.get( '/auth/me',       authMiddleware, authController.me);

// ── Listings ──────────────────────────────────────────────
router.get('/listings',           listingController.getAll);
router.get('/listings/:id',       listingController.getOne);
router.get('/my/listings',        authMiddleware, listingController.getMyListings);

// ── Bookings ──────────────────────────────────────────────
router.get( '/bookings',          authMiddleware, bookingController.getMyBookings);
router.post('/bookings',          authMiddleware, bookingController.create);
router.patch('/bookings/:id/cancel', authMiddleware, bookingController.cancel);

// ── Reviews ───────────────────────────────────────────────
router.get( '/listings/:listingId/reviews', reviewController.getByListing);
router.post('/listings/:listingId/reviews', authMiddleware, reviewController.create);

// ── Notifications ─────────────────────────────────────────
router.get(  '/notifications',          authMiddleware, notificationController.getAll);
router.patch('/notifications/:id/read', authMiddleware, notificationController.markRead);
router.patch('/notifications/read-all', authMiddleware, notificationController.markAllRead);

// ── Categories & Amenities ────────────────────────────────
router.get('/categories', categoryController.getAll);
router.get('/amenities',  amenityController.getAll);

// ── Admin ─────────────────────────────────────────────────
router.get('/admin/users',    authMiddleware, requireRole('ADMIN'), adminController.getUsers);
router.get('/admin/bookings', authMiddleware, requireRole('ADMIN'), adminController.getAllBookings);

module.exports = router;
