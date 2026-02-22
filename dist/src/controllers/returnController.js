"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = exports.getAll = void 0;
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
    const ret = await models_1.Return.create({ sparePartId, quantityReturned, reason: reason ?? null });
    await models_1.SparePart.findByIdAndUpdate(sparePartId, { $inc: { quantity: quantityReturned } });
    res.status(201).json(ret);
};
exports.create = create;
//# sourceMappingURL=returnController.js.map