const express = require('express');
const router = express.Router();
const { validatePassword, generateToken } = require('./auth');

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Validate the password against the stored hashed password
  const isValidPassword = validatePassword(password, hashedPassword);

  if (isValidPassword) {
    // Generate and send the token
    const token = generateToken(user);
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

module.exports = router;
