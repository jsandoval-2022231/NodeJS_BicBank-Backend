import Joi from 'joi';

export const createUserSchema = Joi.object({
    name: Joi.string().required().messages({
        'string.base': 'Name should be a String',
        'string.empty': 'Name cannot be empty',
        'any.required': 'Name is required',
    }),
    nickname: Joi.string().required().messages({
        'string.base': 'Nickname should be a String',
        'string.empty': 'Nickname cannot be empty',
        'any.required': 'Nickname is required',
    }),
    DPI: Joi.string().required().messages({
        'string.base': 'DPI should be a String',
        'string.empty': 'DPI cannot be empty',
        'any.required': 'DPI is required',
    }),
    email: Joi.string().email().required().messages({
        'string.base': 'Email should be a String',
        'string.empty': 'Email cannot be empty',
        'string.email': 'Email should be a valid email',
        'any.required': 'Email is required',
    }),
    password: Joi.string().required().messages({
        'string.base': 'Password should be a String',
        'string.empty': 'Password cannot be empty',
        'any.required': 'Password is required',
    }),
    direction: Joi.string().required().messages({
        'string.base': 'Direction should be a String',
        'string.empty': 'Direction cannot be empty',
        'any.required': 'Direction is required',
    }),
    phone: Joi.string().required().messages({
        'string.base': 'Phone should be a String',
        'string.empty': 'Phone cannot be empty',
        'any.required': 'Phone is required',
    }),
    account: Joi.object().required().messages({
        'object.base': 'Account should be an Object',
        'object.empty': 'Account cannot be empty',
        'any.required': 'Account is required',
    }),
    workName: Joi.string().optional().messages({
        'string.base': 'Work name should be a String',
        'string.empty': 'Work name cannot be empty',
    }),
    workDirection: Joi.string().optional().messages({
        'string.base': 'Work direction should be a String',
        'string.empty': 'Work direction cannot be empty',
    }),
    role: Joi.string().valid('USER_ROLE', 'ADMIN_ROLE').optional().messages({
        'string.base': 'Role should be a String',
        'string.valid': 'Role should be either USER_ROLE or ADMIN_ROLE',
    }),
    status: Joi.boolean().optional().messages({
        'boolean.base': 'Status should be a Boolean',
    }),
});