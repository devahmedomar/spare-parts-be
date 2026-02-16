import mongoose, { Document } from "mongoose";

export interface IRegisteredContract extends Document {
  contractNumber: string;
  ownerName: string;
  imageUrl: string;
  imagePublicId: string;
}

const registeredContractSchema = new mongoose.Schema<IRegisteredContract>(
  {
    contractNumber: { type: String, required: true },
    ownerName: { type: String, required: true },
    imageUrl: { type: String, required: true },
    imagePublicId: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IRegisteredContract>("RegisteredContract", registeredContractSchema);
