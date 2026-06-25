import type { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export const categoryController = {
  getAll: async (_: Request, res: Response) => {
    res.json({ success: true, data: await prisma.category.findMany() });
  },
  create: async (req: Request, res: Response) => {
    const c = await prisma.category.create({ data: req.body });
    res.status(201).json({ success: true, data: c });
  },
};
