const Joi = require('joi');

// function for validating user input
function validateInput(data) {
  const schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  });

  return schema.validate(data);
}
