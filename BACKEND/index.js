const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { errorHandler } = require('./middlewares/errorMiddleware');

// Import routes
const bookingRoutes = require('./routes/bookingRoutes');
const driverRoutes = require('./routes/driverRoutes');
const vehicleRoutes = require('./routes/vehicleRoutes');
const userRoutes = require('./routes/userRoutes');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api', bookingRoutes);
app.use('/api', driverRoutes);
app.use('/api', vehicleRoutes);
app.use('/api', userRoutes);

// Errrithiga.casaqa.ajira.tecg or handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3023;
app.listen(PORT,'0.0.0.0', () => console.log(`Server running on port ${PORT}`));
