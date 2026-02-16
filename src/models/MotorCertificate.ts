import mongoose, { Document } from "mongoose";

export interface IMotorCertificate extends Document {
  motorNumber: string;
  ownerName: string;
  address: string;
  imageUrl: string;
  imagePublicId: string;
}

const motorCertificateSchema = new mongoose.Schema<IMotorCertificate>(
  {
    motorNumber: { type: String, required: true },
    ownerName: { type: String, required: true },
    address: { type: String, required: true },
    imageUrl: { type: String, required: true },
    imagePublicId: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IMotorCertificate>("MotorCertificate", motorCertificateSchema);
