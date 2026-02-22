import mongoose, { Document } from "mongoose";
export interface IGeneralPowerOfAttorney extends Document {
    ownerName: string;
    nationalId?: string;
    imageUrl: string;
    imagePublicId: string;
}
declare const _default: mongoose.Model<IGeneralPowerOfAttorney, {}, {}, {}, mongoose.Document<unknown, {}, IGeneralPowerOfAttorney, {}, mongoose.DefaultSchemaOptions> & IGeneralPowerOfAttorney & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IGeneralPowerOfAttorney>;
export default _default;
//# sourceMappingURL=GeneralPowerOfAttorney.d.ts.map