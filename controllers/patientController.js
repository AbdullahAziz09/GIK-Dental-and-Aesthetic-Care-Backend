// controllers/patientController.js
const Patient = require('../models/Patient');

exports.addPatient = async (req, res) => {
  const { name, doctorName, contactNumber, totalAmount, paidAmount, age, gender } = req.body;

  try {
    const patient = new Patient({ name, doctorName, contactNumber, totalAmount, paidAmount, age, gender });
    await patient.save();
    res.status(201).json({ message: 'Patient added successfully', patient });
  } catch (error) {
    res.status(500).json({ message: 'Error adding patient', error });
  }
};

exports.getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching patients', error });
  }
};

exports.getPatientById = async (req, res) => {
  const { id } = req.params;

  try {
    const patient = await Patient.findById(id);
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching patient', error });
  }
};

exports.updatePatient = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedPatient = await Patient.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ message: 'Patient updated successfully', updatedPatient });
  } catch (error) {
    res.status(500).json({ message: 'Error updating patient', error });
  }
};

exports.deletePatient = async (req, res) => {
  const { id } = req.params;

  try {
    await Patient.findByIdAndDelete(id);
    res.status(200).json({ message: 'Patient deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting patient', error });
  }
};

exports.addVisit = async (req, res) => {
    const { id } = req.params; // Get the patient ID from the request parameters
    const { date, amount } = req.body; // Get visit details from the request body
  
    try {
      // Find the patient by ID and push the new visit to the visits array
      const patient = await Patient.findByIdAndUpdate(
        id,
        { $push: { visits: { date, amount } } },
        { new: true } // Return the updated patient
      );
  
      // Update the total paid amount if necessary
      patient.paidAmount += amount;
  
      // Save the updated patient
      await patient.save();
  
      res.status(200).json({ message: 'Visit added successfully', patient });
    } catch (error) {
      res.status(500).json({ message: 'Error adding visit', error });
    }
  };
  
// API to get the total patient count
exports.getPatientCount = async (req, res) => {
  try {
    const patientCount = await Patient.countDocuments(); // Counts total number of patients
    res.status(200).json({ count: patientCount });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching patient count', error });
  }
};

// API to get the total and paid amounts for all patients
exports.getTotalAndPaidAmounts = async (req, res) => {
  try {
    const patients = await Patient.find(); // Fetch all patients

    // Calculate totalAmount and paidAmount by summing up all patients
    const totalAmount = patients.reduce((acc, patient) => acc + patient.totalAmount, 0);
    const paidAmount = patients.reduce((acc, patient) => acc + patient.paidAmount, 0);

    res.status(200).json({ totalAmount, paidAmount });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching amounts', error });
  }
};