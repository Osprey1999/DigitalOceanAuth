const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const signUpBodyValidation = (body) => {
    const schema = Joi.object({
        userName: Joi.string().required().label("User Name"),
        email: Joi.string().email().required().label("Email"),
        password: passwordComplexity().required().label("Password"),
    });
    return schema.validate(body);
};

module.exports = signUpBodyValidation