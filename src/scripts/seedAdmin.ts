import dotenv from "dotenv";
dotenv.config();

import bcrypt from "bcrypt";
import mongoose from "mongoose";
import Admin from "../models/Admin";

async function seed() {
  await mongoose.connect(process.env.MONGO_URI as string);

  const existing = await Admin.findOne({ username: "admin" });
  if (existing) {
    console.log("Admin already exists");
    process.exit(0);
  }

  const hashed = await bcrypt.hash("admin123", 10);
  await Admin.create({ username: "admin", password: hashed });
  console.log("Admin seeded: username=admin password=admin123");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
