import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";

export const createRoom = async (req, resp, next) => {
  const hotelId = req.params.hotelId;
  const newRoom = new Room(req.body);
  try {
    const savedRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (error) {
      next(error);
    }
    resp.status(200).json(savedRoom);
  } catch (error) {
    next(error);
  }
};

export const updateRoom = async (req, resp, next) => {
  try {
    //Room.findByIdAndUpdate will return the one before updating.
    //need to use {new:true} if we want to return the updated one.
    const updateRoom = await Room.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    resp.status(200).json(updateRoom);
  } catch (error) {
    next(error);
  }
};

export const updateRoomAvailability = async (req, resp, next) => {
  try {
    await Room.updateOne(
      { "roomNumbers._id": req.params.id },
      {
        $push: {
          "roomNumbers.$.unavailableDates": req.body.dates,
        },
      }
    );

    resp.status(200).json("Room has been updated");
  } catch (error) {
    next(error);
  }
};

export const deleteRoom = async (req, resp, next) => {
  const hotelId = req.params.hotelId;
  try {
    await Room.findByIdAndDelete(req.params.id);
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.id },
      });
    } catch (error) {
      next(error);
    }
    resp.status(200).json("Room has been deleted");
  } catch (error) {
    next(error);
  }
};
export const getRoom = async (req, resp, next) => {
  try {
    const room = await Hotel.findById(req.params.id);
    resp.status(200).json(room);
  } catch (error) {
    next(error);
  }
};
export const getAllRooms = async (req, resp, next) => {
  try {
    const rooms = await Hotel.find();

    resp.status(200).json(rooms);
  } catch (error) {
    //resp.status(500).json(error);
    next(error);
  }
};
