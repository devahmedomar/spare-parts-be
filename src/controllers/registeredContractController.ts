import { Request, Response } from "express";
import { RegisteredContract } from "../models";
import { getImageUrl, deleteLocalFile } from "../middleware/upload";

export const getAll = async (_req: Request, res: Response): Promise<void> => {
  const contracts = await RegisteredContract.find().sort({ createdAt: -1 });
  res.json(contracts);
};

export const getOne = async (req: Request, res: Response): Promise<void> => {
  const contract = await RegisteredContract.findById(req.params.id as string);
  if (!contract) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.json(contract);
};

export const create = async (req: Request, res: Response): Promise<void> => {
  if (!req.file) {
    res.status(400).json({ message: "Image is required" });
    return;
  }

  const { contractNumber, ownerName } = req.body;
  const contract = await RegisteredContract.create({
    contractNumber,
    ownerName,
    imageUrl: getImageUrl(req.file.filename),
    imagePublicId: req.file.filename,
  });
  res.status(201).json(contract);
};

export const update = async (req: Request, res: Response): Promise<void> => {
  const contract = await RegisteredContract.findById(req.params.id as string);
  if (!contract) {
    res.status(404).json({ message: "Not found" });
    return;
  }

  const { contractNumber, ownerName } = req.body;
  contract.contractNumber = contractNumber ?? contract.contractNumber;
  contract.ownerName = ownerName ?? contract.ownerName;

  if (req.file) {
    deleteLocalFile(contract.imagePublicId);
    contract.imageUrl = getImageUrl(req.file.filename);
    contract.imagePublicId = req.file.filename;
  }

  await contract.save();
  res.json(contract);
};

export const remove = async (req: Request, res: Response): Promise<void> => {
  const contract = await RegisteredContract.findById(req.params.id as string);
  if (!contract) {
    res.status(404).json({ message: "Not found" });
    return;
  }

  deleteLocalFile(contract.imagePublicId);
  await contract.deleteOne();
  res.json({ message: "Deleted" });
};
