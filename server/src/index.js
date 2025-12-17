const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const http = require('http');
const swaggerUi = require('swagger-ui-express');

// Load environment variables
dotenv.config();

// Import routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const courseRoutes = require('./routes/courseRoutes');

// Import socket handler
const { initializeSocket } = require('./socket/socketHandler');

// Import Swagger configuration
const swaggerSpec = require('./config/swagger');

// Create Express app
const app = express();

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.io
const io = initializeSocket(server);

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Cross-origin resource sharing
app.use(express.json()); // Parse JSON bodies
app.use(morgan('combined')); // HTTP request logging

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/courses', courseRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to EduSync API' });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/edusync')
  .then(() => {
    console.log('Connected to MongoDB');
    
    // Start server
    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Swagger UI available at http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((error) => {
    console.error('Connection error', error.message);
  });

module.exports = { app, io };