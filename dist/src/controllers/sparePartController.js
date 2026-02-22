"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.create = exports.getOne = exports.getAll = void 0;
const models_1 = require("../models");
const getAll = async (req, res) => {
    const { search, shortages } = req.query;
    let filter = {};
    if (shortages === "true") {
        filter.quantity = 0;
    }
    else if (search) {
        filter.name = { $regex: search, $options: "i" };
    }
    const parts = await models_1.SparePart.find(filter).sort({ name: 1 });
    res.json(parts);
};
exports.getAll = getAll;
const getOne = async (req, res) => {
    const part = await models_1.SparePart.findById(req.params.id);
    if (!part) {
        res.status(404).json({ message: "Part not found" });
        return;
    }
    res.json(part);
};
exports.getOne = getOne;
const create = async (req, res) => {
    const { name, quantity, price } = req.body;
    const part = await models_1.SparePart.create({ name, quantity, price });
    res.status(201).json(part);
};
exports.create = create;
const update = async (req, res) => {
    const { name, quantity, price } = req.body;
    const part = await models_1.SparePart.findByIdAndUpdate(req.params.id, { name, quantity, price }, { new: true });
    if (!part) {
        res.status(404).json({ message: "Part not found" });
        return;
    }
    res.json(part);
};
exports.update = update;
const remove = async (req, res) => {
    const part = await models_1.SparePart.findByIdAndDelete(req.params.id);
    if (!part) {
        res.status(404).json({ message: "Part not found" });
        return;
    }
    res.json({ message: "Part deleted" });
};
exports.remove = remove;
//# sourceMappingURL=sparePartController.js.map