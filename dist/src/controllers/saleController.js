"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.create = exports.getAll = void 0;
const models_1 = require("../models");
const getAll = async (_req, res) => {
    const sales = await models_1.Sale.find()
        .populate("sparePartId", "name")
        .sort({ createdAt: -1 });
    res.json(sales);
};
exports.getAll = getAll;
const create = async (req, res) => {
    const { sparePartId, quantitySold } = req.body;
    const part = await models_1.SparePart.findById(sparePartId);
    if (!part) {
        res.status(404).json({ message: "Part not found" });
        return;
    }
    if (part.quantity < quantitySold) {
        res.status(400).json({ message: "Insufficient stock" });
        return;
    }
    const unitPrice = part.price;
    const totalPrice = unitPrice * quantitySold;
    const sale = await models_1.Sale.create({ sparePartId, quantitySold, unitPrice, totalPrice });
    await models_1.SparePart.findByIdAndUpdate(sparePartId, { $inc: { quantity: -quantitySold } });
    res.status(201).json(sale);
};
exports.create = create;
const remove = async (req, res) => {
    const sale = await models_1.Sale.findById(req.params.id);
    if (!sale) {
        res.status(404).json({ message: "Sale not found" });
        return;
    }
    await models_1.SparePart.findByIdAndUpdate(sale.sparePartId, { $inc: { quantity: sale.quantitySold } });
    await models_1.Sale.findByIdAndDelete(sale._id);
    res.json({ message: "Sale deleted, stock restored" });
};
exports.remove = remove;
//# sourceMappingURL=saleController.js.map