import Joi from 'joi';

export const createUserSchema = Joi.object({
    id: Joi.string().required().messages({
        "string.base": "Id should be a String",
        "string.empty": "Id cannot be empty",
        "any.required": "Id is required",
    }),
});