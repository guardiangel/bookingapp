import express from "express";

import {
  createHotel,
  updateHotel,
  deleteHotel,
  getHotel,
  getAllHotel,
  countByCity,
} from "../controllers/hotelController.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//create, "/:id?limit=5"
router.post("/", verifyAdmin, createHotel);

//update
router.put("/:id", verifyAdmin, updateHotel);

//delete
router.delete("/:id", verifyAdmin, deleteHotel);

//get
router.get("/find/:id", getHotel);
//get all
router.get("/", getAllHotel);
//"Cast to ObjectId failed for value \"countByCity\" (type string) at path \"_id\" for model \"Hotel\
//to resoleve the above issue, add /find in get route
//router.get("/find/:id", getHotel);
router.get("/countByCity", countByCity);
router.get("/countByType", getAllHotel);

export default router;
