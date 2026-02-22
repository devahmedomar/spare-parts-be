"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = exports.getAll = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const models_1 = require("../models");
const getAll = async (_req, res) => {
    const returns = await models_1.Return.find()
        .populate("sparePartId", "name")
        .sort({ createdAt: -1 });
    res.json(returns);
};
exports.getAll = getAll;
const create = async (req, res) => {
    const { sparePartId, quantityReturned, reason } = req.body;
    const part = await models_1.SparePart.findById(sparePartId);
    if (!part) {
        res.status(404).json({ message: "Part not found" });
        return;
    }
    const session = await mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const [ret] = await models_1.Return.create([{ sparePartId, quantityReturned, reason: reason ?? null }], { session });
        await models_1.SparePart.findByIdAndUpdate(sparePartId, { $inc: { quantity: quantityReturned } }, { session });
        await session.commitTransaction();
        res.status(201).json(ret);
    }
    catch {
        await session.abortTransaction();
        res.status(500).json({ message: "Return failed" });
    }
    finally {
        session.endSession();
    }
};
exports.create = create;
//# sourceMappingURL=returnController.js.map