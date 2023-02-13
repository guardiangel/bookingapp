import User from "../models/User.js";
import bcrypt from "bcrypt";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

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
export const login = async (req, resp, next) => {
  try {
    const user = await User.findOne({ userName: req.body.userName });
    if (!user) {
      return next(createError(404, "user not found!"));
    }
    const passwordCorrectFlag = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!passwordCorrectFlag) {
      return next(createError(400, "wrong password or username"));
    }

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_TOKEN
    );

    //Using _doc in this way can eliminate the password and isAdmin
    const { password, isAdmin, ...others } = user._doc;

    resp
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ ...others });
  } catch (error) {
    next(error);
  }
};
