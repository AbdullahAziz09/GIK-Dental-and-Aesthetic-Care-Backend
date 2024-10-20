const mongoose = require('mongoose');

const visitSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  amount: {
    type: Number,
    required: true
  }
});

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  doctorName: {
    type: String,
    required: true
  },
  contactNumber: {
    type: String,
    required: true
  },
  totalAmount: {
    type: Number,
    required: true
  },
  paidAmount: {
    type: Number,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Prefer not to say'],
    required: true
  },
  visits: [visitSchema],
}, { timestamps: true });

module.exports = mongoose.model('Patient', patientSchema);
