import express from "express";
import {
  updateUser,
  deleteUser,
  getUser,
  getAllUser,
} from "../controllers/userController.js";
import { verifyToken, verifyUser, verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// router.get("/checkAuthentication", verifyToken, (req, resp, next) => {
//   resp.send("Hi user, you are logged in");
// });
// router.get("/checkUser/:id", verifyUser, (req, resp, next) => {
//   resp.send(
//     "Hi user, you are logged in and you have access to delete your account"
//   );
// });
// router.get("/checkAdmin/:id", verifyAdmin, (req, resp, next) => {
//   resp.send(
//     "Hi user, you are logged in and you have access to delete all accounts"
//   );
// });

//update
router.put("/:id", verifyUser, updateUser);

//delete
router.delete("/:id", verifyUser, deleteUser);

//get
router.get("/:id", verifyUser, getUser);
//get all
router.get("/", verifyAdmin, getAllUser);

export default router;
