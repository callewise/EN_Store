const helmet = require('helmet');
const csurf = require('csurf');
const session = require('express-session');
const bcrypt = require('bcrypt');

function setupSecurity(app) {
  // Enable various HTTP headers security measures
  app.use(helmet());

  // Enable Cross-Site Request Forgery (CSRF) protection
  app.use(csurf());

  // Configure session middleware
  app.use(
    session({
      secret: 'mySecretKey',
      resave: false,
      saveUninitialized: false
    })
  );

  // Custom middleware to check for authenticated user
  function requireLogin(req, res, next) {
    if (req.session.userId) {
      // User is authenticated
      next();
    } else {
      // User is not authenticated
      res.status(401).json({ message: 'Unauthorized' });
    }
  }

  // Middleware to log request details for security auditing
  function logRequest(req, res, next) {
    console.log(`Request received: ${req.method} ${req.url}`);
    next();
  }

  // Apply middleware for security auditing
  app.use(logRequest);

  // Apply CSRF protection for all routes
  app.use((req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
  });

  // Apply the requireLogin middleware to secure routes that require authentication
  app.use('/secure', requireLogin);

  // Function to hash a password using bcrypt
  async function hashPassword(password) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }

  // Function to verify a password against a hashed password using bcrypt
  async function verifyPassword(password, hashedPassword) {
    const isPasswordValid = await bcrypt.compare(password, hashedPassword);
    return isPasswordValid;
  }

  // Make the hashPassword and verifyPassword functions available in templates or frontend code
  app.locals.hashPassword = hashPassword;
  app.locals.verifyPassword = verifyPassword;
}

module.exports = setupSecurity;
