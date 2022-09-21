const express = require('express');
const {
  userAuth,
  registerUser,
  getProfile,
  updateProfile,
} = require('../controllers/userController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

// Routes
router.route('/').post(registerUser);
router.post('/login', userAuth);
router.route('/profile').get(protect, getProfile).put(updateProfile);

module.exports = router;
