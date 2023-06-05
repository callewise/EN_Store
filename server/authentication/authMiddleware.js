const { verifyToken } = require('../utils/jwtUtils');
const { User } = require('../models');

// Middleware to authenticate and authorize user based on JWT
async function authMiddleware(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    res.status(401).json({ message: 'Authorization token missing' });
    return;
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    res.status(401).json({ message: 'Invalid or expired token' });
    return;
  }

  try {
    const user = await User.findById(decoded.userId);

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = authMiddleware;
