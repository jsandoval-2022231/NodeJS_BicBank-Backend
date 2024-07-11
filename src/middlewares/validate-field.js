import Joi from 'joi';

export const validate = (schema) => {
    return async (req, res, next) => {
        try {
            await schema.validateAsync(req.body, { abortEarly: false });
            next();
        } catch (error) {
            res.status(400).json({ error: error.details.map(e => e.message) });
        }
    };
};
