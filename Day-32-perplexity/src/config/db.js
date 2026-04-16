import mongoose from "mongoose";

const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error("MONGODB_URI is not defined in environment variables.");
  }

  await mongoose.connect(mongoUri);
  console.log("Database connected successfully.");
};

export default connectDB;
