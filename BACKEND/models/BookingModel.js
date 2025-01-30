const mongoose =require("mongoose")

const BookingSchema = new mongoose.Schema({
  facultyname: { type: String, required: true },
  facultyid: { type: String, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  from_date: { type: String, required: true },
  to_date: { type: String, required: true },
  purpose: { type: String, required: true },
  vehicle_variant: { type: String, required: true },
  status: { type: String, default: 'Pending' },
  remarks: { type: String, default: 'N/A' },
  driveralloted: { type: String, default: '-' }
});

module.exports=mongoose.model('userbooking3', BookingSchema);