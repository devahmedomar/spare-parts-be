import { Request, Response } from "express";
import { MotorCertificate } from "../models";
import { getImageUrl, deleteLocalFile } from "../middleware/upload";

export const getAll = async (_req: Request, res: Response): Promise<void> => {
  const certs = await MotorCertificate.find().sort({ createdAt: -1 });
  res.json(certs);
};

export const getOne = async (req: Request, res: Response): Promise<void> => {
  const cert = await MotorCertificate.findById(req.params.id as string);
  if (!cert) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.json(cert);
};

export const create = async (req: Request, res: Response): Promise<void> => {
  if (!req.file) {
    res.status(400).json({ message: "Image is required" });
    return;
  }

  const { motorNumber, ownerName, address } = req.body;
  const cert = await MotorCertificate.create({
    motorNumber,
    ownerName,
    address,
    imageUrl: getImageUrl(req.file.filename),
    imagePublicId: req.file.filename,
  });
  res.status(201).json(cert);
};

export const update = async (req: Request, res: Response): Promise<void> => {
  const cert = await MotorCertificate.findById(req.params.id as string);
  if (!cert) {
    res.status(404).json({ message: "Not found" });
    return;
  }

  const { motorNumber, ownerName, address } = req.body;
  cert.motorNumber = motorNumber ?? cert.motorNumber;
  cert.ownerName = ownerName ?? cert.ownerName;
  cert.address = address ?? cert.address;

  if (req.file) {
    deleteLocalFile(cert.imagePublicId);
    cert.imageUrl = getImageUrl(req.file.filename);
    cert.imagePublicId = req.file.filename;
  }

  await cert.save();
  res.json(cert);
};

export const remove = async (req: Request, res: Response): Promise<void> => {
  const cert = await MotorCertificate.findById(req.params.id as string);
  if (!cert) {
    res.status(404).json({ message: "Not found" });
    return;
  }

  deleteLocalFile(cert.imagePublicId);
  await cert.deleteOne();
  res.json({ message: "Deleted" });
};
