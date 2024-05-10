const Joi = require('@hapi/joi');

const schema = Joi.object({
    username: Joi.string()
        .min(6)
        .required(),
    email: Joi.string()
        .email()
        .required(),
    password: Joi.string()
        .min(6)
        .required()
});

const validate = (req,res,next) => {
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    next();
}

module.exports = validate;