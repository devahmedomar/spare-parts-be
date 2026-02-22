"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.create = exports.getOne = exports.getAll = void 0;
const models_1 = require("../models");
const getAll = async (_req, res) => {
    const returns = await models_1.Return.find()
        .populate("sparePartId", "name")
        .sort({ createdAt: -1 });
    res.json(returns);
};
exports.getAll = getAll;
const getOne = async (req, res) => {
    const ret = await models_1.Return.findById(req.params.id).populate("sparePartId", "name");
    if (!ret) {
        res.status(404).json({ message: "Return not found" });
        return;
    }
    res.json(ret);
};
exports.getOne = getOne;
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
const update = async (req, res) => {
    const ret = await models_1.Return.findById(req.params.id);
    if (!ret) {
        res.status(404).json({ message: "Return not found" });
        return;
    }
    const { sparePartId, quantityReturned, reason } = req.body;
    // Reverse old quantity then apply new quantity
    await models_1.SparePart.findByIdAndUpdate(ret.sparePartId, { $inc: { quantity: -ret.quantityReturned } });
    ret.sparePartId = sparePartId ?? ret.sparePartId;
    ret.quantityReturned = quantityReturned ?? ret.quantityReturned;
    ret.reason = reason !== undefined ? reason : ret.reason;
    await ret.save();
    await models_1.SparePart.findByIdAndUpdate(ret.sparePartId, { $inc: { quantity: ret.quantityReturned } });
    res.json(ret);
};
exports.update = update;
const remove = async (req, res) => {
    const ret = await models_1.Return.findById(req.params.id);
    if (!ret) {
        res.status(404).json({ message: "Return not found" });
        return;
    }
    // Restore stock: reverse the returned quantity
    await models_1.SparePart.findByIdAndUpdate(ret.sparePartId, { $inc: { quantity: -ret.quantityReturned } });
    await ret.deleteOne();
    res.json({ message: "Return deleted, stock updated" });
};
exports.remove = remove;
//# sourceMappingURL=returnController.js.map