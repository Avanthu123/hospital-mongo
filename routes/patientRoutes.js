const express = require('express');
const router = express.Router();
const Patient = require('../models/patientModel');

// Route for displaying all patients (web interface)
router.get('/patients', async (req, res) => {
  try {
    const patients = await Patient.find(); // Fetch all patients from the database
    res.render('patients', { patients }); // Render the patients.ejs view with patient data
  } catch (error) {
    res.status(500).send('Error fetching patient records: ' + error.message);
  }
});

// Include the existing API routes here (if they aren't already included)
// For example:
router.post('/patients', async (req, res) => {
  try {
    const newPatient = new Patient(req.body);
    await newPatient.save();
    res.redirect('/patients'); // Redirect to patients list after adding a new patient
  } catch (error) {
    res.status(500).send('Error adding patient record: ' + error.message);
  }
});

// Route to display the edit form for a patient
router.get('/patients/edit/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const patient = await Patient.findById(id);
      if (!patient) {
        return res.status(404).send('Patient not found');
      }
      res.render('editPatient', { patient });
    } catch (error) {
      res.status(500).send('Error loading patient data: ' + error.message);
    }
  });
  
  // Route to handle the update form submission
  router.post('/patients/update/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const updatedData = req.body;
      const updatedPatient = await Patient.findByIdAndUpdate(id, updatedData, { new: true });
  
      if (!updatedPatient) {
        return res.status(404).send('Patient not found');
      }
  
      res.redirect('/patients'); // Redirect to the patients list after updating
    } catch (error) {
      res.status(500).send('Error updating patient record: ' + error.message);
    }
  });  
  
  // Route for deleting a patient (web interface)
router.post('/patients/delete/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const deletedPatient = await Patient.findByIdAndDelete(id);
  
      if (!deletedPatient) {
        return res.status(404).send('Patient not found');
      }
  
      res.redirect('/patients'); // Redirect to the patients list after deletion
    } catch (error) {
      res.status(500).send('Error deleting patient record: ' + error.message);
    }
  });
  

module.exports = router;
