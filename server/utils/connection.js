import mongoose from "mongoose";

async function connection() {
  try {
    await mongoose.connect(process.env.DBURI);
    console.log("connected to mongodb");
  } catch (error) {
    console.log("server", error);
  }
}

export default connection
