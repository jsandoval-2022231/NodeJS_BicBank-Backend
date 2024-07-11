import Joi from "joi";
import User from "../user/user.model.js";

const customJoi = Joi.extend((joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.existsEmail': 'Email already exists',
    },
    rules: {
        existsEmail: {
            method() {
                return this.$_addRule({ name: 'existsEmail' });
            },
            async validate(value, helpers) {
                const user = await User.findOne({ email: value });
                if (user) {
                    return helpers.error('string.existsEmail');
                }
                return value;
            }
        }
    }
}));

export default customJoi;