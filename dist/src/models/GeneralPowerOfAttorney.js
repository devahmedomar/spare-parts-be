"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const generalPowerOfAttorneySchema = new mongoose_1.default.Schema({
    ownerName: { type: String, required: true },
    nationalId: { type: String, default: null },
    imageUrl: { type: String, required: true },
    imagePublicId: { type: String, required: true },
}, { timestamps: true });
exports.default = mongoose_1.default.model("GeneralPowerOfAttorney", generalPowerOfAttorneySchema);
//# sourceMappingURL=GeneralPowerOfAttorney.js.map