const Joi = require('@hapi/joi');

const authSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(8).required(),
  firstName: Joi.string(),
  lastName: Joi.string(),
  mobileNo: Joi.number(),
});

module.exports = { authSchema: authSchema };
