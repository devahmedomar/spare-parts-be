import { Request, Response } from "express";
import { SparePart } from "../models";

export const getAll = async (req: Request, res: Response): Promise<void> => {
  const { search } = req.query;
  const filter = search
    ? { name: { $regex: search as string, $options: "i" } }
    : {};
  const parts = await SparePart.find(filter);
  res.json(parts);
};

export const getShortages = async (_req: Request, res: Response): Promise<void> => {
  const parts = await SparePart.find({ quantity: 0 }).sort({ name: 1 });
  res.json(parts);
};

export const getOne = async (req: Request, res: Response): Promise<void> => {
  const part = await SparePart.findById(req.params.id as string);
  if (!part) {
    res.status(404).json({ message: "Part not found" });
    return;
  }
  res.json(part);
};

export const create = async (req: Request, res: Response): Promise<void> => {
  const { name, quantity, price } = req.body;
  const part = await SparePart.create({ name, quantity, price });
  res.status(201).json(part);
};

export const update = async (req: Request, res: Response): Promise<void> => {
  const { name, quantity, price } = req.body;
  const part = await SparePart.findByIdAndUpdate(
    req.params.id as string,
    { name, quantity, price },
    { new: true }
  );
  if (!part) {
    res.status(404).json({ message: "Part not found" });
    return;
  }
  res.json(part);
};

export const remove = async (req: Request, res: Response): Promise<void> => {
  const part = await SparePart.findByIdAndDelete(req.params.id as string);
  if (!part) {
    res.status(404).json({ message: "Part not found" });
    return;
  }
  res.json({ message: "Part deleted" });
};
