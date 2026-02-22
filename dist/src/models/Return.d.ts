import mongoose, { Document, Types } from "mongoose";
export interface IReturn extends Document {
    sparePartId: Types.ObjectId;
    quantityReturned: number;
    reason?: string;
}
declare const _default: mongoose.Model<IReturn, {}, {}, {}, mongoose.Document<unknown, {}, IReturn, {}, mongoose.DefaultSchemaOptions> & IReturn & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IReturn>;
export default _default;
//# sourceMappingURL=Return.d.ts.map