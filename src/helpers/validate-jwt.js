import jwt from 'jsonwebtoken';

export const validateJWT = (req, res, next) => {
    let token = req.headers['authorization'] || req.body.token || req.query.token;

    if (!token) {
        return res.status(401).send('A token is required for authentication');
    }

    console.log('Original token:', token);

    try {
        token = token.replace(/^Bearer\s+/, '');
        console.log('Token after replacement:', token);

        const decoded = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        req.user = decoded.userId;
    } catch (e) {
        console.error('Token verification error:', e.message);
        return res.status(401).send('Invalid Token');
    }

    return next();
};
