import mongoose, { Document, Types } from "mongoose";

export interface IReturn extends Document {
  sparePartId: Types.ObjectId;
  quantityReturned: number;
  reason?: string;
}

const returnSchema = new mongoose.Schema<IReturn>(
  {
    sparePartId: { type: mongoose.Schema.Types.ObjectId, ref: "SparePart", required: true },
    quantityReturned: { type: Number, required: true },
    reason: { type: String, default: null },
  },
  { timestamps: true }
);

export default mongoose.model<IReturn>("Return", returnSchema);
