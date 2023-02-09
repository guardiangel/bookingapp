import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
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

app.listen(8888, () => {
  connect();
  console.log("connect to back end");
});
