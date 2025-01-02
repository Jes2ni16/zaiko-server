const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/user.route');
const clientRoutes = require('./routes/client.route');
const listRoutes = require('./routes/list.route');

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:3000', 'https://zaicko.vercel.app', 'https://zaiko.website'], // Your frontend URL
    credentials: true,  // Allow credentials (cookies)
  })
);

// Routes
app.use('/api/users', userRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/lists', listRoutes);


app.get("/", (req, res) => res.send("Express on Vercel"));
console.log('App is running');

// Database Connection
let isConnected = false;

const connectToDatabase = async () => {
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
};

module.exports = async (req, res) => {
  try {
    await connectToDatabase(); // Ensure DB connection
    app(req, res); // Pass requests to the Express app
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};
