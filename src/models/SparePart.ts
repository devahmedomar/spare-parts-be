import mongoose, { Document } from "mongoose";

export interface ISparePart extends Document {
  name: string;
  quantity: number;
  price: number;
}

const sparePartSchema = new mongoose.Schema<ISparePart>(
  {
    name: { type: String, required: true },
    quantity: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<ISparePart>("SparePart", sparePartSchema);
