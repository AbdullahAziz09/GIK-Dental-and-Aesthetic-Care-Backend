// routes/patientRoutes.js
const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');

// Routes for patient operations
router.post('/add', patientController.addPatient);
router.get('/', patientController.getAllPatients);
router.get('/:id', patientController.getPatientById);
router.put('/:id', patientController.updatePatient);
router.delete('/:id', patientController.deletePatient);
router.post('/:id/visits', patientController.addVisit);

router.get('/dashboard/patient-count', patientController.getPatientCount);
router.get('/dashboard/amounts',  patientController.getTotalAndPaidAmounts);



module.exports = router;
