import express from "express";
import Hotel from "../models/Hotel.js";

const router = express.Router();

//create, "/:id?limit=5"
router.post("/", async (req, resp) => {
  const newHotel = new Hotel(req.body);

  try {
    const saveHotel = await newHotel.save();
    resp.status(200).json(saveHotel);
  } catch (error) {
    resp.status(500).json(error);
  }
});

//update

//delete

//get

//get all

export default router;
