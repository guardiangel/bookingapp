import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./api/routes/auth.js";
import roomsRoute from "./api/routes/rooms.js";
import hotelsRoute from "./api/routes/hotels.js";
import usersRoute from "./api/routes/users.js";
import cookieParser from "cookie-parser";

const app = express();

mongoose.set("strictQuery", false);

dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongdo disconnected!");
});

mongoose.connection.on("connected", () => {
  console.log("mongdo connected.");
});

//middlewares

app.use(cookieParser());

//receive json format as request body, otherwise an error will be thrown when saving.
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api/users", usersRoute);

//customize exception
app.use((err, req, resp, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";
  return resp.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
  // next();
});

app.listen(8888, () => {
  connect();
  console.log("connect to back end");
});
