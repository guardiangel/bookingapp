import User from "../models/User.js";

export const register = async (req, resp, next) => {
  try {
    const newUser = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
      isAdmin: req.body.isAdmin,
    });
    const saveUser = await newUser.save();
    resp.status(200).json(saveUser);
  } catch (error) {
    next(error);
  }
};
