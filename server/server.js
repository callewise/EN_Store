const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const csurf = require('csurf');
const helmet = require('helmet');
const authRoutes = require('../routes/authRoutes');
const inventoryRoutes = require('../routes/inventoryRoutes');

const app = express();
const PORT = 3000;

// Setup security measures
setupSecurity(app);

// Middleware for parsing request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configure session middleware
app.use(
  session({
    secret: 'mySecretKey',
    resave: false,
    saveUninitialized: false
  })
);

// Middleware for CSRF protection
app.use(csurf());

// Middleware for HTTP headers security
app.use(helmet());

// Use the routes
app.use('/auth', authRoutes);
app.use('/inventory', inventoryRoutes);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
