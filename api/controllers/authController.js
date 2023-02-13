import User from "../models/User.js";
import bcrypt from "bcrypt";

export const register = async (req, resp, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: hash,
      isAdmin: req.body.isAdmin,
    });
    const saveUser = await newUser.save();
    resp.status(200).json(saveUser);
  } catch (error) {
    next(error);
  }
};
