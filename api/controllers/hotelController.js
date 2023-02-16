import { createError } from "../utils/error.js";
import Hotel from "../models/Hotel.js";

export const createHotel = async (req, resp, next) => {
  const newHotel = new Hotel(req.body);

  try {
    const saveHotel = await newHotel.save();
    resp.status(200).json(saveHotel);
  } catch (error) {
    next(error);
  }
};

export const updateHotel = async (req, resp, next) => {
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
    next(error);
  }
};

export const deleteHotel = async (req, resp, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    resp.status(200).json("Hotel has been deleted");
  } catch (error) {
    next(error);
  }
};
export const getHotel = async (req, resp, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    resp.status(200).json(hotel);
  } catch (error) {
    next(error);
  }
};
export const getAllHotel = async (req, resp, next) => {
  try {
    const hotels = await Hotel.find();

    resp.status(200).json(hotels);
  } catch (error) {
    //resp.status(500).json(error);
    next(error);
  }
};

export const countByCity = async (req, resp, next) => {
  const cities = req.query.cities.split(",");

  try {
    const list = await Promise.all(
      cities.map((city) => {
        // return Hotel.find({ city: city }).lenth;
        return Hotel.countDocuments({ city: city });
      })
    );

    resp.status(200).json(list);
  } catch (error) {
    //resp.status(500).json(error);
    next(error);
  }
};
