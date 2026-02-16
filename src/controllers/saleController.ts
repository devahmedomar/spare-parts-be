import { Request, Response } from "express";
import mongoose from "mongoose";
import { Sale, SparePart } from "../models";

export const getAll = async (_req: Request, res: Response): Promise<void> => {
  const sales = await Sale.find()
    .populate("sparePartId", "name")
    .sort({ createdAt: -1 });
  res.json(sales);
};

export const create = async (req: Request, res: Response): Promise<void> => {
  const { sparePartId, quantitySold } = req.body;

  const part = await SparePart.findById(sparePartId);
  if (!part) {
    res.status(404).json({ message: "Part not found" });
    return;
  }
  if (part.quantity < quantitySold) {
    res.status(400).json({ message: "Insufficient stock" });
    return;
  }

  const unitPrice = part.price;
  const totalPrice = unitPrice * quantitySold;

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const [sale] = await Sale.create(
      [{ sparePartId, quantitySold, unitPrice, totalPrice }],
      { session }
    );
    await SparePart.findByIdAndUpdate(
      sparePartId,
      { $inc: { quantity: -quantitySold } },
      { session }
    );
    await session.commitTransaction();
    res.status(201).json(sale);
  } catch {
    await session.abortTransaction();
    res.status(500).json({ message: "Sale failed" });
  } finally {
    session.endSession();
  }
};

export const remove = async (req: Request, res: Response): Promise<void> => {
  const sale = await Sale.findById(req.params.id as string);
  if (!sale) {
    res.status(404).json({ message: "Sale not found" });
    return;
  }

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    await SparePart.findByIdAndUpdate(
      sale.sparePartId,
      { $inc: { quantity: sale.quantitySold } },
      { session }
    );
    await Sale.findByIdAndDelete(sale._id, { session });
    await session.commitTransaction();
    res.json({ message: "Sale deleted, stock restored" });
  } catch {
    await session.abortTransaction();
    res.status(500).json({ message: "Delete failed" });
  } finally {
    session.endSession();
  }
};
