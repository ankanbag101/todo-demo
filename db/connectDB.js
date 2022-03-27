import mongoose from "mongoose";

const connection = {};

export default async function connectDB() {
  if (connection.isConnected) return;

  const db = await mongoose.connect("mongodb://localhost:27017/TODO");
  connection.isConnected = db.connections[0].readyState;
}
