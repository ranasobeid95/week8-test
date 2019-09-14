
const Joi = require('@hapi/joi');
exports.signupSchema = Joi.object().keys({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().regex(/[a-zA-Z0-9]/).min(3).max(30)
    .required(),
  confirm_password: Joi.string().valid(Joi.ref('password')),

});

exports.loginSchema = Joi.object().keys({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().regex(/[a-zA-Z0-9]/).min(3).max(30).required(),
});