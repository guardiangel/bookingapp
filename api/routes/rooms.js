import express from "express";
import { verifyAdmin } from "../utils/verifyToken.js";
import {
  createRoom,
  deleteRoom,
  getAllRooms,
  getRoom,
  updateRoom,
  updateRoomAvailability,
} from "../controllers/roomController.js";

const router = express.Router();

//create, "/:id?limit=5"
router.post("/:hotelId", verifyAdmin, createRoom);

//update
router.put("/:id", verifyAdmin, updateRoom);

router.put("/availability/:id", updateRoomAvailability);

//delete
router.delete("/:id/:hotelId", verifyAdmin, deleteRoom);

//get
router.get("/:id", getRoom);
//get all
router.get("/", getAllRooms);

export default router;
