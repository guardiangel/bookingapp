import { createError } from "../utils/error.js";
import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

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
  const { min, max, limit, featured } = req.query;

  try {
    const hotels = await Hotel.find({
      featured: featured,
      cheapestPrice: { $gt: min || 1, $lt: max || 9999 },
    }).limit(limit);

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

// export const countByType = async (req, resp, next) => {
//   const types = req.query.types.split(",");

//   try {
//     const list = await Promise.all(
//       types.map((type) => {
//         return Hotel.countDocuments({ type: type });
//       })
//     );

//     resp.status(200).json(list);
//   } catch (error) {
//     next(error);
//   }
// };

export const countByType = async (req, resp, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });

    resp.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartment", count: apartmentCount },
      { type: "resort", count: resortCount },
      { type: "villa", count: villaCount },
      { type: "cabin", count: cabinCount },
    ]);
  } catch (error) {
    next(error);
  }
};

export const getHotelRooms = async (req, resp, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    resp.status(200).json(list);
  } catch (error) {
    next(error);
  }
};
