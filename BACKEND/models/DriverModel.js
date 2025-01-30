const mongoose =require("mongoose")

const DriverSchema = new mongoose.Schema({
  staffname: { type: String, required: true },
  age: { type: String, required: true },
  contact: { type: String, required: true }
});

module.exports = mongoose.model('driver', DriverSchema);