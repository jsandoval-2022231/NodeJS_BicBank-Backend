import { validationResult } from "express-validator";

export const validate = (req, res, next) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
        console
        return res.status(400).json({
            msg: '-----ERROR-----',
            errors
        });
    }
    next();
}