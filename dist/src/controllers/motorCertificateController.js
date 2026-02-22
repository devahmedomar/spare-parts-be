"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.create = exports.getOne = exports.getAll = void 0;
const models_1 = require("../models");
const upload_1 = require("../middleware/upload");
const getAll = async (_req, res) => {
    const certs = await models_1.MotorCertificate.find().sort({ createdAt: -1 });
    res.json(certs);
};
exports.getAll = getAll;
const getOne = async (req, res) => {
    const cert = await models_1.MotorCertificate.findById(req.params.id);
    if (!cert) {
        res.status(404).json({ message: "Not found" });
        return;
    }
    res.json(cert);
};
exports.getOne = getOne;
const create = async (req, res) => {
    if (!req.file) {
        res.status(400).json({ message: "Image is required" });
        return;
    }
    const { motorNumber, ownerName, address } = req.body;
    const cert = await models_1.MotorCertificate.create({
        motorNumber,
        ownerName,
        address,
        imageUrl: (0, upload_1.getImageUrl)(req.file.filename),
        imagePublicId: req.file.filename,
    });
    res.status(201).json(cert);
};
exports.create = create;
const update = async (req, res) => {
    const cert = await models_1.MotorCertificate.findById(req.params.id);
    if (!cert) {
        res.status(404).json({ message: "Not found" });
        return;
    }
    const { motorNumber, ownerName, address } = req.body;
    cert.motorNumber = motorNumber ?? cert.motorNumber;
    cert.ownerName = ownerName ?? cert.ownerName;
    cert.address = address ?? cert.address;
    if (req.file) {
        (0, upload_1.deleteLocalFile)(cert.imagePublicId);
        cert.imageUrl = (0, upload_1.getImageUrl)(req.file.filename);
        cert.imagePublicId = req.file.filename;
    }
    await cert.save();
    res.json(cert);
};
exports.update = update;
const remove = async (req, res) => {
    const cert = await models_1.MotorCertificate.findById(req.params.id);
    if (!cert) {
        res.status(404).json({ message: "Not found" });
        return;
    }
    (0, upload_1.deleteLocalFile)(cert.imagePublicId);
    await cert.deleteOne();
    res.json({ message: "Deleted" });
};
exports.remove = remove;
//# sourceMappingURL=motorCertificateController.js.map