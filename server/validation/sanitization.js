const { sanitize } = require('express-validator');

// Sanitization middleware to sanitize input using express-validator
function sanitization(fields) {
  return fields.map((field) => sanitize(field).trim());
}

module.exports = sanitization;
