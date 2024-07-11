import bcryptjs from 'bcryptjs';
import User from '../user/user.model.js';
import { generateToken } from '../helpers/generate-jwt.js';

export const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) {
        return res.status(400).json({
            msg: "User wrong"
        });
    }
    const passwordCorrect = bcryptjs.compareSync(password, user.password);
    if (!passwordCorrect) {
        return res.status(400).json({
            msg: "Password wrong"
        });
    }
    const token = await generateToken(user._id);
    req.headers.authorization = token;

    res.status(200).json({
        msg: "Login successfully",
        token,
        role: user.role
    });
}

