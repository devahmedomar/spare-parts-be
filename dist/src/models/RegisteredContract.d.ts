import mongoose, { Document } from "mongoose";
export interface IRegisteredContract extends Document {
    contractNumber: string;
    ownerName: string;
    imageUrl: string;
    imagePublicId: string;
}
declare const _default: mongoose.Model<IRegisteredContract, {}, {}, {}, mongoose.Document<unknown, {}, IRegisteredContract, {}, mongoose.DefaultSchemaOptions> & IRegisteredContract & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IRegisteredContract>;
export default _default;
//# sourceMappingURL=RegisteredContract.d.ts.map