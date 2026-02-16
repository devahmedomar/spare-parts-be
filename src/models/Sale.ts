import mongoose, { Document, Types } from "mongoose";

export interface ISale extends Document {
  sparePartId: Types.ObjectId;
  quantitySold: number;
  unitPrice: number;
  totalPrice: number;
}

const saleSchema = new mongoose.Schema<ISale>(
  {
    sparePartId: { type: mongoose.Schema.Types.ObjectId, ref: "SparePart", required: true },
    quantitySold: { type: Number, required: true },
    unitPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<ISale>("Sale", saleSchema);
