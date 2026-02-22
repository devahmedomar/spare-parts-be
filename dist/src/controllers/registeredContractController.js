"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.create = exports.getOne = exports.getAll = void 0;
const models_1 = require("../models");
const upload_1 = require("../middleware/upload");
const getAll = async (_req, res) => {
    const contracts = await models_1.RegisteredContract.find().sort({ createdAt: -1 });
    res.json(contracts);
};
exports.getAll = getAll;
const getOne = async (req, res) => {
    const contract = await models_1.RegisteredContract.findById(req.params.id);
    if (!contract) {
        res.status(404).json({ message: "Not found" });
        return;
    }
    res.json(contract);
};
exports.getOne = getOne;
const create = async (req, res) => {
    if (!req.file) {
        res.status(400).json({ message: "Image is required" });
        return;
    }
    const { contractNumber, ownerName } = req.body;
    const contract = await models_1.RegisteredContract.create({
        contractNumber,
        ownerName,
        imageUrl: (0, upload_1.getImageUrl)(req.file.filename),
        imagePublicId: req.file.filename,
    });
    res.status(201).json(contract);
};
exports.create = create;
const update = async (req, res) => {
    const contract = await models_1.RegisteredContract.findById(req.params.id);
    if (!contract) {
        res.status(404).json({ message: "Not found" });
        return;
    }
    const { contractNumber, ownerName } = req.body;
    contract.contractNumber = contractNumber ?? contract.contractNumber;
    contract.ownerName = ownerName ?? contract.ownerName;
    if (req.file) {
        (0, upload_1.deleteLocalFile)(contract.imagePublicId);
        contract.imageUrl = (0, upload_1.getImageUrl)(req.file.filename);
        contract.imagePublicId = req.file.filename;
    }
    await contract.save();
    res.json(contract);
};
exports.update = update;
const remove = async (req, res) => {
    const contract = await models_1.RegisteredContract.findById(req.params.id);
    if (!contract) {
        res.status(404).json({ message: "Not found" });
        return;
    }
    (0, upload_1.deleteLocalFile)(contract.imagePublicId);
    await contract.deleteOne();
    res.json({ message: "Deleted" });
};
exports.remove = remove;
//# sourceMappingURL=registeredContractController.js.map