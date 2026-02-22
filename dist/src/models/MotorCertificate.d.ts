import mongoose, { Document } from "mongoose";
export interface IMotorCertificate extends Document {
    motorNumber: string;
    ownerName: string;
    address: string;
    imageUrl: string;
    imagePublicId: string;
}
declare const _default: mongoose.Model<IMotorCertificate, {}, {}, {}, mongoose.Document<unknown, {}, IMotorCertificate, {}, mongoose.DefaultSchemaOptions> & IMotorCertificate & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IMotorCertificate>;
export default _default;
//# sourceMappingURL=MotorCertificate.d.ts.map