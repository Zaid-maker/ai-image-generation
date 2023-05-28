import mongoose from "mongoose";

const connectDB = (url) => {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(url)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => {
      console.error("Failed to connect to the database");
      console.error(err);
    });
};

export default connectDB;
