const express = require('express');
const {
  createAppointment,
  getAllAppointments,
  cancelAppointment,
  updateAppointment, // Import the update function
} = require('../controllers/appointmentController');

const router = express.Router();

// Define the routes
router.post('/', createAppointment); // Create a new appointment
router.get('/', getAllAppointments); // Get all appointments
router.delete('/:id', cancelAppointment); // Cancel an appointment
router.put('/:id', updateAppointment); // Update an appointment

module.exports = router;
