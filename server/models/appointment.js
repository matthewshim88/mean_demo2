var mongoose = require('mongoose');
var Schema = mongoose.Schema

var AppointmentSchema = new Schema({
  date: Date,
  time: String,
  patient_name: String,
  complaint: String
}, {timestamps:true});

mongoose.model("Appointment", AppointmentSchema);
