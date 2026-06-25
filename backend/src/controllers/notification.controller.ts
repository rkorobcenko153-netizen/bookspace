import type { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export const notificationController = {
  getAll: async (req: Request, res: Response) => {
    const data = await prisma.notification.findMany({
      where: { userId: req.user!.userId }, orderBy: { createdAt: "desc" },
    });
    res.json({ success: true, data, unreadCount: data.filter((n) => !n.isRead).length });
  },
  markRead: async (req: Request, res: Response) => {
    const n = await prisma.notification.update({ where: { id: req.params.id }, data: { isRead: true } });
    res.json({ success: true, data: n });
  },
  markAllRead: async (req: Request, res: Response) => {
    await prisma.notification.updateMany({ where: { userId: req.user!.userId }, data: { isRead: true } });
    res.json({ success: true });
  },
};
