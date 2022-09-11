const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const productsRouter = require('./routes/products');
const { pageNotFound, errorHandler } = require('./middleware/errorMiddleware');
const colors = require('colors');

dotenv.config();

const app = express();

// Set PORT
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use('/api/products', productsRouter);

// error handlers
app.use(pageNotFound);
app.use(errorHandler);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_UI)
  .then(() => {
    app.listen(
      PORT,
      console.log(`Connected to DB | Server running on port ${PORT}.`.cyan.bold)
    );
  })
  .catch((error) => {
    console.log(`${error}`.red.underline.bold);
  });
