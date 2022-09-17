const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const colors = require('colors');

dotenv.config();

const app = express();

// Set PORT
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

// error handlers
app.use(notFound);
app.use(errorHandler);

mongoose
  .connect(process.env.MONGO_UI)
  .then(() => {
    app.listen(
      PORT,
      console.log(
        `MongoDB Connected | Server running on port ${PORT}`.cyan.bold
      )
    );
  })
  .catch((error) => {
    console.log(error);
  });
