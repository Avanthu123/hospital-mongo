const mongoose = require('mongoose');

// Define the patient schema
const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  diagnosis: { type: String, required: true },
  doctorAssigned: { type: String, required: true },
});

// Create a model based on the schema
const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
