"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const registeredContractSchema = new mongoose_1.default.Schema({
    contractNumber: { type: String, required: true },
    ownerName: { type: String, required: true },
    imageUrl: { type: String, required: true },
    imagePublicId: { type: String, required: true },
}, { timestamps: true });
exports.default = mongoose_1.default.model("RegisteredContract", registeredContractSchema);
//# sourceMappingURL=RegisteredContract.js.map