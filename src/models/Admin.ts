import mongoose, { Document } from "mongoose";

export interface IAdmin extends Document {
  username: string;
  password: string;
}

const adminSchema = new mongoose.Schema<IAdmin>(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IAdmin>("Admin", adminSchema);
