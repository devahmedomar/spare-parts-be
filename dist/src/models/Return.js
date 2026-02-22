"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const returnSchema = new mongoose_1.default.Schema({
    sparePartId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "SparePart", required: true },
    quantityReturned: { type: Number, required: true },
    reason: { type: String, default: null },
}, { timestamps: true });
exports.default = mongoose_1.default.model("Return", returnSchema);
//# sourceMappingURL=Return.js.map