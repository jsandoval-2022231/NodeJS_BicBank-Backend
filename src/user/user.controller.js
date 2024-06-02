import User from "./user.model";
import bcrypt from "bcrypt";

export const post = async (req, res) => {
  try {
    const { name, DPI, email, password, direction, phone, role } = req.body;
    const user = new User({
      name,
      DPI,
      email,
      password: bcrypt.hashSync(password, 10),
      direction,
      phone,
      role,
    });
    await user.save();
    return res.status(201).json({ user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}