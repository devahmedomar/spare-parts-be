import { Request, Response } from "express";
import { GeneralPowerOfAttorney } from "../models";
import { getImageUrl, deleteLocalFile } from "../middleware/upload";

export const getAll = async (_req: Request, res: Response): Promise<void> => {
  const docs = await GeneralPowerOfAttorney.find().sort({ createdAt: -1 });
  res.json(docs);
};

export const getOne = async (req: Request, res: Response): Promise<void> => {
  const doc = await GeneralPowerOfAttorney.findById(req.params.id as string);
  if (!doc) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.json(doc);
};

export const create = async (req: Request, res: Response): Promise<void> => {
  if (!req.file) {
    res.status(400).json({ message: "Image is required" });
    return;
  }

  const { ownerName, nationalId } = req.body;
  const doc = await GeneralPowerOfAttorney.create({
    ownerName,
    nationalId: nationalId ?? null,
    imageUrl: getImageUrl(req.file.filename),
    imagePublicId: req.file.filename,
  });
  res.status(201).json(doc);
};

export const update = async (req: Request, res: Response): Promise<void> => {
  const doc = await GeneralPowerOfAttorney.findById(req.params.id as string);
  if (!doc) {
    res.status(404).json({ message: "Not found" });
    return;
  }

  const { ownerName, nationalId } = req.body;
  doc.ownerName = ownerName ?? doc.ownerName;
  doc.nationalId = nationalId !== undefined ? nationalId : doc.nationalId;

  if (req.file) {
    deleteLocalFile(doc.imagePublicId);
    doc.imageUrl = getImageUrl(req.file.filename);
    doc.imagePublicId = req.file.filename;
  }

  await doc.save();
  res.json(doc);
};

export const remove = async (req: Request, res: Response): Promise<void> => {
  const doc = await GeneralPowerOfAttorney.findById(req.params.id as string);
  if (!doc) {
    res.status(404).json({ message: "Not found" });
    return;
  }

  deleteLocalFile(doc.imagePublicId);
  await doc.deleteOne();
  res.json({ message: "Deleted" });
};
