import Joi from "joi";

export const requestSchema = Joi.object({
    name: Joi.string().required().messages({
        "string.base": "Name should be a String",
        "string.empty": "Name cannot be empty",
        "any.required": "Name is required",
    }),
    nickname: Joi.string().required().messages({
        "string.base": "Nickname should be a String",
        "string.empty": "Nickname cannot be empty",
        "any.required": "Nickname is required",
    }),
    DPI: Joi.string().required().messages({
        "string.base": "DPI should be a String",
        "string.empty": "DPI cannot be empty",
        "any.required": "DPI is required",
    }),
    email: Joi.string().email().required().messages({
        "string.base": "Email should be a String",
        "string.empty": "Email cannot be empty",
        "string.email": "Email should be a valid email",
        "any.required": "Email is required",
    }),
    direction: Joi.string().required().messages({
        "string.base": "Direction should be a String",
        "string.empty": "Direction cannot be empty",
        "any.required": "Direction is required",
    }),
    phone: Joi.string().required().messages({
        "string.base": "Phone should be a String",
        "string.empty": "Phone cannot be empty",
        "any.required": "Phone is required",
    }),
    workName: Joi.string().required().messages({
        "string.base": "WorkName should be a String",
        "string.empty": "WorkName cannot be empty",
        "any.required": "WorkName is required",
    }),
    workDirection: Joi.string().required().messages({
        "string.base": "WorkDirection should be a String",
        "string.empty": "WorkDirection cannot be empty",
        "any.required": "WorkDirection is required",
    }),
    typeAccount: Joi.string().required().messages({
        "string.base": "TypeAccount should be a String",
        "string.empty": "TypeAccount cannot be empty",
        "any.required": "TypeAccount is required",
    }),
    income: Joi.number().required().messages({
        "number.base": "Income should be a Number",
        "number.empty": "Income cannot be empty",
        "any.required": "Income is required",
    }),
});
