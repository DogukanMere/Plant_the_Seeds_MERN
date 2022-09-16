const express = require('express');
const { userAuth } = require('../controllers/userController');

const router = express.Router();

// Routes
router.post('/login', userAuth);

module.exports = router;
