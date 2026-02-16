import { Request, Response } from "express";
import { GeneralPowerOfAttorney } from "../models";
import { uploadToCloudinary, deleteFromCloudinary } from "../middleware/upload";

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
  const { url, publicId } = await uploadToCloudinary(
    req.file.buffer,
    "general_power_of_attorneys"
  );

  const doc = await GeneralPowerOfAttorney.create({
    ownerName,
    nationalId: nationalId ?? null,
    imageUrl: url,
    imagePublicId: publicId,
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
    await deleteFromCloudinary(doc.imagePublicId);
    const { url, publicId } = await uploadToCloudinary(
      req.file.buffer,
      "general_power_of_attorneys"
    );
    doc.imageUrl = url;
    doc.imagePublicId = publicId;
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

  await deleteFromCloudinary(doc.imagePublicId);
  await doc.deleteOne();
  res.json({ message: "Deleted" });
};
