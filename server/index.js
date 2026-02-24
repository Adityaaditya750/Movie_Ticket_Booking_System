const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
dotenv.config();

// Connect to the database
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


// Routes
const authRoutes = require('./route/authRoutes');

// Mount Routes
app.use('/api/auth', authRoutes);
app.use("/api/profile", require("./route/profileRoutes"));
app.use("/api/movies", require("./route/movieRoutes"));
app.use("/api/theatres", require("./route/theatreRoutes"));
app.use("/api/shows", require("./route/showRoutes"));
app.use("/api/bookings", require("./route/bookingRoutes"));




app.get('/', (req, res) => {
  res.send('API is running...');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});