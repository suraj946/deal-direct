import mongoose from "mongoose";

const connectDB = async() => {
  try {
    console.log("Connecting to database...");
    const instance = await mongoose.connect(`${process.env.MONGO_URI}/${process.env.DATABASE}?retryWrites=true&w=majority`);
    console.log(`DATABASE CONNECTED HOST ${instance.connection.host}`);
  } catch (error) {
    console.log("DATABASE CONNECTION ERROR", error);
    process.exit(1);
  }
}

export default connectDB;