const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const patientRoutes = require('./routes/patientRoutes');

// MongoDB connection
mongoose.connect('mongodb+srv://avanthu123:mymongoDB!1@mycluster.rta4s.mongodb.net/hospital', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to the MongoDB hospital database'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // To handle form data

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files (CSS, images, etc.)
app.use(express.static('public'));

// Routes
app.use('/', patientRoutes);
app.use('/api', patientRoutes);
app.get('/', (req, res) => {
  res.redirect('/patients');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
