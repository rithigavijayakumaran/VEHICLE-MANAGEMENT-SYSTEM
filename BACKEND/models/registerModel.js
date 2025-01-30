const mongoose =require("mongoose")
const UserregSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true}, 
    facultyid: { type: String, required: true, unique: true }
  });
  module.exports=mongoose.model('userregister', UserregSchema);