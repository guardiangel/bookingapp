import { createError } from "../utils/error.js";
import User from "../models/User.js";

export const updateUser = async (req, resp, next) => {
  try {
    //User.findByIdAndUpdate will return the one before updating.
    //need to use {new:true} if we want to return the updated one.
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    resp.status(200).json(updateUser);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, resp, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    resp.status(200).json("User has been deleted");
  } catch (error) {
    next(error);
  }
};
export const getUser = async (req, resp, next) => {
  const failed = true;

  if (failed) {
    return next(createError(401, "Sorry, you are not authenticated"));
  }

  try {
    const user = await User.findById(req.params.id);
    resp.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
export const getAllUser = async (req, resp, next) => {
  try {
    const users = await User.find();

    resp.status(200).json(users);
  } catch (error) {
    //resp.status(500).json(error);
    next(error);
  }
};
