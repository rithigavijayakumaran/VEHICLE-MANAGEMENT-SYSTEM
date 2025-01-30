const mongoose =require("mongoose")

const VehicleSchema = new mongoose.Schema({
   vehiclename: { type: String, required: true },
   numberplate: { type: String, required: true },
   seatcount: { type: String, required: true }
});

module.exports = mongoose.model('vehicle', VehicleSchema);