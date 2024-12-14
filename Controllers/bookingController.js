const { v4: uuidv4 } = require('uuid');
const Booking = require('../models/Booking');
const designSchema= require('../models/design')
// Create a new booking
exports.createBooking = async (req, res) => {
  try {
    const { user_id, design_id, artist_id, email, phone, date, time } = req.body;

    const newBooking = new Booking({
      booking_id: uuidv4(),
      user_id,
      design_id,
      artist_id,
      email,
      phone,
      date,
      time,
    });

    const savedBooking = await newBooking.save();
    res.status(201).json({ message: 'Booking created successfully', booking: savedBooking });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// get all details

exports.getBookings = async (req, res) => {
  try {
    const { user_id } = req.params;
  
    if (!user_id) {
      return res.status(400).json({ error: "user_id is required" });
    }
  
    // Fetch bookings by user_id
    const bookings = await Booking.find({ user_id: user_id });
  
    // If no bookings are found, respond with an empty array
    if (!bookings || bookings.length === 0) {
      return res.status(200).json({ bookings: [] });
    }
  
    // Fetch design details for each booking
    const detailedBookings = await Promise.all(
      bookings.map(async (booking) => {
        const designDetails = await designSchema.findById(booking.design_id); // Fetch design details
        return {
          ...booking.toObject(), // Include all booking fields
          designDetails, // Add the fetched design details
        };
      })
    );
  
    res.status(200).json({message:"success",data:detailedBookings});
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ error: error.message });
  }
  
};



// Reschedule a booking
exports.rescheduleBooking = async (req, res) => {
  try {
    const { booking_id } = req.params;
    const { date, time } = req.body;
    console.log(booking_id)
    if (!date || !time) {
      return res.status(400).json({ error: "New date and time are required" });
    }

    const booking = await Booking.findOneAndUpdate(
      { booking_id, status: 'booked' },
      { date, time },
      { new: true }
    );
    

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found or not reschedulable' });
    }

    res.status(200).json({ message: 'Booking rescheduled successfully', booking });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Cancel a booking
exports.cancelBooking = async (req, res) => {
  try {
    
    const { booking_id } = req.params;

    const booking = await Booking.findOneAndUpdate(
      { booking_id, status: 'booked' },
      { status: 'canceled' },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found or already canceled' });
    }

    res.status(200).json({ message: 'Booking canceled successfully', booking });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
