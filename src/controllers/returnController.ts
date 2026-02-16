import { Request, Response } from "express";
import mongoose from "mongoose";
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

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const [ret] = await Return.create(
      [{ sparePartId, quantityReturned, reason: reason ?? null }],
      { session }
    );
    await SparePart.findByIdAndUpdate(
      sparePartId,
      { $inc: { quantity: quantityReturned } },
      { session }
    );
    await session.commitTransaction();
    res.status(201).json(ret);
  } catch {
    await session.abortTransaction();
    res.status(500).json({ message: "Return failed" });
  } finally {
    session.endSession();
  }
};
