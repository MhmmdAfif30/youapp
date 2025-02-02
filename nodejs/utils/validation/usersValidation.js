const Joi = require("joi");

const registerValidation = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    password_confirmation: Joi.string().valid(Joi.ref("password")).required(),
});

const loginValidation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

module.exports = { registerValidation, loginValidation };
