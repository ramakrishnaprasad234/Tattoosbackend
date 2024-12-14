const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema(
  {
    booking_id: {
      type: String,
      // required: true,
      unique: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref:'User'
      // required: true,
    },
    design_id: {
      type: String,
      // required: true,
      type: mongoose.Schema.Types.ObjectId, // Reference to the Artist
     ref: 'Design',
    },
    artist_id: {
      type: String,
      // required: true,
      type: mongoose.Schema.Types.ObjectId, // Reference to the Artist
     ref: 'Artist',
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          // Regular expression to validate email format
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message: 'Invalid email format',
      },
    },
    phone: {
      type: String,
      // required: true,
      validate: {
        validator: function (value) {
          // Regular expression to validate phone number (10-15 digits)
          return /^\d{10,15}$/.test(value);
        },
        message: 'Phone number must contain 10 to 15 digits',
      },
    },
    date: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          return value > new Date(); // Ensure the date is in the future
        },
        message: 'Date must be in the future',
      },
    },
    time: {
      type: String, // You can store it as a string like "14:30" or "2:30 PM"
      // required: true,
      // validate: {
      //   validator: function (value) {
      
      //     return /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value);
      //   },
        // message: 'Time must be in HH:MM format',
    
    },
    status: {
      type: String,
      enum: ['booked', 'completed', 'canceled'],
      default: 'booked',
    },
  },
  { timestamps: true } // Includes createdAt and updatedAt fields
);

module.exports = mongoose.model('Booking', BookingSchema);
