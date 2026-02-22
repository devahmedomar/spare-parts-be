import { Request, Response } from "express";
import { Sale, SparePart } from "../models";

export const getAll = async (_req: Request, res: Response): Promise<void> => {
  const sales = await Sale.find()
    .populate("sparePartId", "name")
    .sort({ createdAt: -1 });
  res.json(sales);
};

export const getOne = async (req: Request, res: Response): Promise<void> => {
  const sale = await Sale.findById(req.params.id as string).populate("sparePartId", "name");
  if (!sale) {
    res.status(404).json({ message: "Sale not found" });
    return;
  }
  res.json(sale);
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

  const sale = await Sale.create({ sparePartId, quantitySold, unitPrice, totalPrice });
  await SparePart.findByIdAndUpdate(sparePartId, { $inc: { quantity: -quantitySold } });

  res.status(201).json(sale);
};

export const remove = async (req: Request, res: Response): Promise<void> => {
  const sale = await Sale.findById(req.params.id as string);
  if (!sale) {
    res.status(404).json({ message: "Sale not found" });
    return;
  }

  await SparePart.findByIdAndUpdate(sale.sparePartId, { $inc: { quantity: sale.quantitySold } });
  await Sale.findByIdAndDelete(sale._id);

  res.json({ message: "Sale deleted, stock restored" });
};
