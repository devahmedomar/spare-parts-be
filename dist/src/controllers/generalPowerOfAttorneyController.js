"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.create = exports.getOne = exports.getAll = void 0;
const models_1 = require("../models");
const upload_1 = require("../middleware/upload");
const getAll = async (_req, res) => {
    const docs = await models_1.GeneralPowerOfAttorney.find().sort({ createdAt: -1 });
    res.json(docs);
};
exports.getAll = getAll;
const getOne = async (req, res) => {
    const doc = await models_1.GeneralPowerOfAttorney.findById(req.params.id);
    if (!doc) {
        res.status(404).json({ message: "Not found" });
        return;
    }
    res.json(doc);
};
exports.getOne = getOne;
const create = async (req, res) => {
    if (!req.file) {
        res.status(400).json({ message: "Image is required" });
        return;
    }
    const { ownerName, nationalId } = req.body;
    const doc = await models_1.GeneralPowerOfAttorney.create({
        ownerName,
        nationalId: nationalId ?? null,
        imageUrl: (0, upload_1.getImageUrl)(req.file.filename),
        imagePublicId: req.file.filename,
    });
    res.status(201).json(doc);
};
exports.create = create;
const update = async (req, res) => {
    const doc = await models_1.GeneralPowerOfAttorney.findById(req.params.id);
    if (!doc) {
        res.status(404).json({ message: "Not found" });
        return;
    }
    const { ownerName, nationalId } = req.body;
    doc.ownerName = ownerName ?? doc.ownerName;
    doc.nationalId = nationalId !== undefined ? nationalId : doc.nationalId;
    if (req.file) {
        (0, upload_1.deleteLocalFile)(doc.imagePublicId);
        doc.imageUrl = (0, upload_1.getImageUrl)(req.file.filename);
        doc.imagePublicId = req.file.filename;
    }
    await doc.save();
    res.json(doc);
};
exports.update = update;
const remove = async (req, res) => {
    const doc = await models_1.GeneralPowerOfAttorney.findById(req.params.id);
    if (!doc) {
        res.status(404).json({ message: "Not found" });
        return;
    }
    (0, upload_1.deleteLocalFile)(doc.imagePublicId);
    await doc.deleteOne();
    res.json({ message: "Deleted" });
};
exports.remove = remove;
//# sourceMappingURL=generalPowerOfAttorneyController.js.map