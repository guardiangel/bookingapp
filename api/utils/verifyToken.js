import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req, resp, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(401, "You have no authentication"));
  }
  jwt.verify(token, process.env.JWT_TOKEN, (err, user) => {
    if (err) {
      return next(createError(403, "Token is not valid"));
    }
    req.user = user;
    next();
  });
};

export const verifyUser = (req, resp, next) => {
  //don't need next, otherwise it will enter verifyToken again.
  verifyToken(req, resp, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized"));
    }
  });
};
export const verifyAdmin = (req, resp, next) => {
  //don't need next, otherwise it will enter verifyToken again.
  verifyToken(req, resp, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not admin"));
    }
  });
};
