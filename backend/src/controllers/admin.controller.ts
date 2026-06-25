import type { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export const adminController = {
  getUsers: async (_: Request, res: Response) => {
    const users = await prisma.user.findMany({ select: { id: true, email: true, name: true, role: true, createdAt: true } });
    res.json({ success: true, data: users });
  },
  getAllBookings: async (_: Request, res: Response) => {
    res.json({ success: true, data: await prisma.booking.findMany({ include: { user: { select: { name: true, email: true } }, listing: true } }) });
  },
  changeRole: async (req: Request, res: Response) => {
    const u = await prisma.user.update({ where: { id: req.params.id }, data: { role: req.body.role } });
    res.json({ success: true, data: u });
  },
};
