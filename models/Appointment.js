// gik-backend/models/Appointment.js
const mongoose = require('mongoose');

// Define the schema for an appointment
const appointmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contact: { type: String, required: true },
  doctor: { type: String, required: true },
  date: { type: Date, required: true },
  
});

// Create the model based on the schema
const Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = Appointment;
