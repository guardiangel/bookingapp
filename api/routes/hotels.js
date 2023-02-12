import express from "express";

import {
  createHotel,
  updateHotel,
  deleteHotel,
  getHotel,
  getAllHotel,
} from "../controllers/hotelController.js";

const router = express.Router();

//create, "/:id?limit=5"
router.post("/", createHotel);

//update
router.put("/:id", updateHotel);

//delete
router.delete("/:id", deleteHotel);

//get
router.get("/:id", getHotel);
//get all
router.get("/", getAllHotel);

export default router;
