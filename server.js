// Using MVC Pattern :
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { connectToDB } = require('./config/db');
const feedbackRoutes = require('./routes/feedbackRoutes');
const aboutRoutes = require('./routes/aboutRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
connectToDB();  // This calls the connectToDB function

// Routes for feedback
app.use('/feedback', feedbackRoutes);
app.use('/about', aboutRoutes);

// Default route
app.get("/", (req, res) => {
    res.send("Server is running");
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
