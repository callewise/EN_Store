const { body, validationResult } = require('express-validator');

// Validation middleware to validate input using express-validator
function inputValidation(rules) {
  return [
    ...rules.map((rule) => body(rule.field).trim().isLength(rule.length)),
    (req, res, next) => {
      const errors = validationResult(req);

      if (errors.isEmpty()) {
        next();
      } else {
        res.status(400).json({ errors: errors.array() });
      }
    }
  ];
}

module.exports = inputValidation;
