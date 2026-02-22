import mongoose, { Document } from "mongoose";
export interface ISparePart extends Document {
    name: string;
    quantity: number;
    price: number;
}
declare const _default: mongoose.Model<ISparePart, {}, {}, {}, mongoose.Document<unknown, {}, ISparePart, {}, mongoose.DefaultSchemaOptions> & ISparePart & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, ISparePart>;
export default _default;
//# sourceMappingURL=SparePart.d.ts.map