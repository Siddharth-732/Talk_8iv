import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";
import express from "express";
const app = express();
console.log("MONGO_URI =", process.env.MONGO_URI);
const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URI}/${DB_NAME}`,
    );
    console.log(
      "DB instance established DB HOST:",
      `${connectionInstance.connection.host}`,
    );
  } catch (error) {
    console.log("error to connect to Database, ERROR: ", error);
    process.exit(1);
  }
};

export default connectDB;
