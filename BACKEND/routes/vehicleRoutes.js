const express = require("express");
const router = express.Router();
const VehicleModel = require("../models/VehicleModel");

// Get all vehicles
router.get("/vehicles", async (req, res) => {
  try {
    const vehicles = await VehicleModel.find();
    res.json(vehicles);
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    res.status(500).send("Error fetching vehicles");
  }
});

// Add a new vehicle
router.post("/vehicles", async (req, res) => {
  try {
    const { vehiclename, numberplate, seatcount } = req.body;

    const newVehicle = new VehicleModel({ vehiclename, numberplate, seatcount });
    await newVehicle.save();

    res.status(201).json({ message: "Vehicle added successfully", vehicle: newVehicle });
  } catch (error) {
    console.error("Error in POST /api/vehicles:", error.message);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
});

module.exports = router;
