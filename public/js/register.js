const express = require('express');
const router = express.Router();
const { hashPassword } = require('./auth');

router.post('/register', (req, res) => {
  const { username, password } = req.body;

  // Hash the password
  const hashedPassword = hashPassword(password);

  // Handle user registration
});

module.exports = router;
