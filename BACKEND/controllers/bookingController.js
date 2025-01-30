const Booking = require('../models/BookingModel');

// ✅ Create a new booking (User)
const createBooking = async (req, res) => {
  try {
    const { facultyname, facultyid, from, to, from_date, to_date, purpose, vehicle_variant } = req.body;
    
    const newBooking = new Booking({
      facultyname,
      facultyid,
      from,
      to,
      from_date,
      to_date,
      purpose,
      vehicle_variant,
    });

    await newBooking.save();
    res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ error: 'Failed to create booking', details: error.message });
  }
};

// ✅ Get all bookings (Admin) or specific bookings by facultyid (User)
const getBookings = async (req, res) => {
  try {
    const { facultyid } = req.query; // Optional facultyid filter
    const filter = facultyid ? { facultyid } : {}; // Filter for specific user if provided
    const bookings = await Booking.find(filter);
    
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ error: 'Error fetching bookings' });
  }
};

// ✅ Update booking details (Admin) - Approve, Reject, or Assign Driver
const updateBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const { status, remarks, driveralloted } = req.body;

    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { status, remarks, driveralloted },
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json({ message: 'Booking updated successfully', booking: updatedBooking });
  } catch (error) {
    console.error('Error updating booking:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
};

// ✅ Delete booking (Admin)
const deleteBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const deletedBooking = await Booking.findByIdAndDelete(bookingId);

    if (!deletedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    console.error('Error deleting booking:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
};

module.exports = { createBooking, getBookings, updateBooking, deleteBooking };
