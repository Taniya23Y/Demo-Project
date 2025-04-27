import mongoose from "mongoose";
require("dotenv").config();

const dbUrl: string = process.env.DB_URL || "";

const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl).then((res) => {
      console.log(`database is connected with ${res.connection.host}`);
    });
    mongoose.connection.on("error", (error: any) => {
      console.log(error);
    });
  } catch (error: any) {
    console.error(error.toString());
  }
};

export default connectDB;
