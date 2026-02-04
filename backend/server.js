const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;
const jwtSecret = 'your_jwt_secret';

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/loginApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error', err);
});

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const BookingSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  roomType: { type: String, required: true },
  paymentType: { type: String, required: true },
  checkInDate: { type: String, required: true },
  checkOutDate: { type: String, required: true },
  address: { type: String, required: true },
  phoneNumber: { type: String, required: true }
});

const User = mongoose.model('User', UserSchema);
const Booking = mongoose.model('Booking', BookingSchema);

// Middleware for error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Register endpoint with error handling
app.post('/register', async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const user = new User({ username, email, password });
    await user.save();

    const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '1h' });

    res.status(201).json({ token });
  } catch (error) {
    next(error); // Pass error to the next middleware
  }
});

// Login endpoint with error handling
app.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(400).send('Invalid credentials');
    }

    const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    next(error); // Pass error to the next middleware
  }
});

// Create booking endpoint with error handling
app.post('/book', async (req, res, next) => {
  try {
    const { customerName, roomType, paymentType, checkInDate, checkOutDate, address, phoneNumber } = req.body;

    // Format dates to YYYY-MM-DD
    const formattedCheckInDate = new Date(checkInDate).toISOString().split('T')[0];
    const formattedCheckOutDate = new Date(checkOutDate).toISOString().split('T')[0];

    const booking = new Booking({
      customerName,
      roomType,
      paymentType,
      checkInDate: formattedCheckInDate,
      checkOutDate: formattedCheckOutDate,
      address,
      phoneNumber
    });

    await booking.save();
    res.status(201).json({ message: 'Booking created successfully' });
  } catch (error) {
    next(error); // Pass error to the next middleware
  }
});

// Get all bookings endpoint with error handling
app.get('/bookings', async (req, res, next) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (error) {
    next(error); // Pass error to the next middleware
  }
});

// Error handling middleware for unmatched routes
app.use((req, res) => {
  res.status(404).send('Route not found');
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
