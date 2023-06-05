const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

// Generate a JSON Web Token (JWT) for the provided payload
function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
}

// Verify and decode the provided JWT
function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    return null;
  }
}

module.exports = {
  generateToken,
  verifyToken
};
