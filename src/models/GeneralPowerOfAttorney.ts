import mongoose, { Document } from "mongoose";

export interface IGeneralPowerOfAttorney extends Document {
  ownerName: string;
  nationalId?: string;
  imageUrl: string;
  imagePublicId: string;
}

const generalPowerOfAttorneySchema = new mongoose.Schema<IGeneralPowerOfAttorney>(
  {
    ownerName: { type: String, required: true },
    nationalId: { type: String, default: null },
    imageUrl: { type: String, required: true },
    imagePublicId: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IGeneralPowerOfAttorney>(
  "GeneralPowerOfAttorney",
  generalPowerOfAttorneySchema
);
