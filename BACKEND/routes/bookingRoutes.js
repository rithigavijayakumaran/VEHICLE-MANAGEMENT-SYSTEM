const express = require('express');
const { createBooking, getBookings, updateBooking, deleteBooking } = require('../controllers/bookingController');

const router = express.Router();


router.post('/book', createBooking);

router.get('/book', getBookings);

router.put('/book/:id', updateBooking);

router.delete('/book/:id', deleteBooking);

module.exports = router;
