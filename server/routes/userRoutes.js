const express = require('express');
const {
  userAuth,
  registerUser,
  getProfile,
} = require('../controllers/userController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

// Routes
router.route('/').post(registerUser);
router.post('/login', userAuth);
router.route('/profile').get(protect, getProfile);

module.exports = router;
