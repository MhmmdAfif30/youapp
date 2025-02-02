const Joi = require("joi");

const aboutValidation = Joi.object({
    image: Joi.string().pattern(/\.(jpg|jpeg|png)$/i).optional(),
    displayName: Joi.string().required(),
    gender: Joi.string().valid("Male", "Female").required(),
    birthday: Joi.date().required(),
    height: Joi.number().required(),
    weight: Joi.number().required(),
});


module.exports = { aboutValidation };
