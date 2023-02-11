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
router.put("/:id", async (req, resp) => {
  try {
    //Hotel.findByIdAndUpdate will return the one before updating.
    //need to use {new:true} if we want to return the updated one.
    const updateHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    resp.status(200).json(updateHotel);
  } catch (error) {
    resp.status(500).json(error);
  }
});

//delete
router.delete("/:id", async (req, resp) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    resp.status(200).json("Hotel has been deleted");
  } catch (error) {
    resp.status(500).json(error);
  }
});

//get
router.get("/:id", async (req, resp) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    resp.status(200).json(hotel);
  } catch (error) {
    resp.status(500).json(error);
  }
});
//get all
router.get("/", async (req, resp) => {
  try {
    const hotels = await Hotel.find();
    resp.status(200).json(hotels);
  } catch (error) {
    resp.status(500).json(error);
  }
});
export default router;
