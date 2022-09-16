const User = require('../models/userModule');

// POST - /api/users/login
// Auth users and get token
const userAuth = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: null,
    });
  } else {
    res.status(401).json({ error: 'Invalid email or password.' });
  }
};

module.exports = { userAuth };
