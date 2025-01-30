const express = require('express');
const router = express.Router();
const DriverModel = require('../models/DriverModel');

// Get all drivers
router.get('/', async (req, res) => {
  try {
    const drivers = await DriverModel.find();
    res.json(drivers);
  } catch (error) {
    console.error('Error fetching drivers:', error);
    res.status(500).send('Error fetching drivers');
  }
});

// Add a new driver
router.post('/', async (req, res) => {
  try {
    const { staffname, age, contact } = req.body;

    const newDriver = new DriverModel({ staffname, age, contact });
    await newDriver.save();

    res.status(201).json({ message: 'Driver added successfully', driver: newDriver });
  } catch (error) {
    console.error('Error in POST /api/driver:', error.message);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

module.exports = router;
