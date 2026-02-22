import { Request, Response } from "express";
import { Return, SparePart } from "../models";

export const getAll = async (_req: Request, res: Response): Promise<void> => {
  const returns = await Return.find()
    .populate("sparePartId", "name")
    .sort({ createdAt: -1 });
  res.json(returns);
};

export const getOne = async (req: Request, res: Response): Promise<void> => {
  const ret = await Return.findById(req.params.id as string).populate("sparePartId", "name");
  if (!ret) {
    res.status(404).json({ message: "Return not found" });
    return;
  }
  res.json(ret);
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

export const update = async (req: Request, res: Response): Promise<void> => {
  const ret = await Return.findById(req.params.id as string);
  if (!ret) {
    res.status(404).json({ message: "Return not found" });
    return;
  }

  const { sparePartId, quantityReturned, reason } = req.body;

  // Reverse old quantity then apply new quantity
  await SparePart.findByIdAndUpdate(ret.sparePartId, { $inc: { quantity: -ret.quantityReturned } });

  ret.sparePartId = sparePartId ?? ret.sparePartId;
  ret.quantityReturned = quantityReturned ?? ret.quantityReturned;
  ret.reason = reason !== undefined ? reason : ret.reason;
  await ret.save();

  await SparePart.findByIdAndUpdate(ret.sparePartId, { $inc: { quantity: ret.quantityReturned } });

  res.json(ret);
};

export const remove = async (req: Request, res: Response): Promise<void> => {
  const ret = await Return.findById(req.params.id as string);
  if (!ret) {
    res.status(404).json({ message: "Return not found" });
    return;
  }

  // Restore stock: reverse the returned quantity
  await SparePart.findByIdAndUpdate(ret.sparePartId, { $inc: { quantity: -ret.quantityReturned } });
  await ret.deleteOne();

  res.json({ message: "Return deleted, stock updated" });
};
