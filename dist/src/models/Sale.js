"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const saleSchema = new mongoose_1.default.Schema({
    sparePartId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "SparePart", required: true },
    quantitySold: { type: Number, required: true },
    unitPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
}, { timestamps: true });
exports.default = mongoose_1.default.model("Sale", saleSchema);
//# sourceMappingURL=Sale.js.map