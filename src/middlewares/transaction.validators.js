import Joi from 'joi';

export const createTransactionSchema = Joi.object({
    accountOrigin: Joi.string().required().messages({
        'string.base': 'Origin account should be a String',
        'string.empty': 'Origin account cannot be empty',
        'any.required': 'Origin account is required',
    }),
    accountDestination: Joi.string().required().messages({
        'string.base': 'Destination account should be a String',
        'string.empty': 'Destination account cannot be empty',
        'any.required': 'Destination account is required',
    }),
    amount: Joi.number().greater(0).required().messages({
        'number.base': 'Amount should be a number',
        'number.greater': 'Amount must be greater than 0',
        'any.required': 'Amount is required',
    }),
});
