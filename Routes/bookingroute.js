const express = require('express');
const { body, param } = require('express-validator');
const bookingController = require('../Controllers/bookingController');

const router = express.Router();

// Validation middleware
const validateBookingCreation = [
  body('user_id').notEmpty().withMessage('User ID is required'),
  body('design_id').notEmpty().withMessage('Design ID is required'),
  body('artist_id').notEmpty().withMessage('Artist ID is required'),
  body('email')
    .isEmail()
    .withMessage('Valid email is required'),
  body('phone')
    .matches(/^\d{10,15}$/)
    .withMessage('Phone number must contain 10 to 15 digits'),
  body('date')
    .isISO8601()
    .toDate()
    .custom((value) => value > new Date())
    .withMessage('Date must be in the future'),
  body('time')
    .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Time must be in HH:MM format'),
];

const validateBookingReschedule = [
  param('booking_id').notEmpty().withMessage('Booking ID is required'),
  body('date')
    .isISO8601()
    .toDate()
    .custom((value) => value > new Date())
    .withMessage('New date must be in the future'),
  body('time')
    .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Time must be in HH:MM format'),
];

const validateBookingCancellation = [
  param('booking_id').notEmpty().withMessage('Booking ID is required'),
];

// Routes
router.post('/booking', validateBookingCreation, bookingController.createBooking);
router.put('/:booking_id/reschedule', validateBookingReschedule, bookingController.rescheduleBooking);
router.delete('/:booking_id/cancel', validateBookingCancellation, bookingController.cancelBooking);
router.get("/bookings/:user_id", bookingController.getBookings);

module.exports = router;
