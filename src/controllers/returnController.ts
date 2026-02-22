import { Request, Response } from "express";
import { Return, SparePart } from "../models";

export const getAll = async (_req: Request, res: Response): Promise<void> => {
  const returns = await Return.find()
    .populate("sparePartId", "name")
    .sort({ createdAt: -1 });
  res.json(returns);
};

export const create = async (req: Request, res: Response): Promise<void> => {
  const { sparePartId, quantityReturned, reason } = req.body;

  const part = await SparePart.findById(sparePartId);
  if (!part) {
    res.status(404).json({ message: "Part not found" });
    return;
  }

  const ret = await Return.create({ sparePartId, quantityReturned, reason: reason ?? null });
  await SparePart.findByIdAndUpdate(sparePartId, { $inc: { quantity: quantityReturned } });

  res.status(201).json(ret);
};
