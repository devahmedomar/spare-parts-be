import mongoose, { Document, Types } from "mongoose";
export interface ISale extends Document {
    sparePartId: Types.ObjectId;
    quantitySold: number;
    unitPrice: number;
    totalPrice: number;
}
declare const _default: mongoose.Model<ISale, {}, {}, {}, mongoose.Document<unknown, {}, ISale, {}, mongoose.DefaultSchemaOptions> & ISale & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, ISale>;
export default _default;
//# sourceMappingURL=Sale.d.ts.map