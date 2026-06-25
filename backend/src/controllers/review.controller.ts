import type { Request, Response } from "express";
import { reviewService } from "../services/review.service";

const handleError = (res: Response, e: any) =>
  res.status(e.status ?? 500).json({ success: false, message: e.message ?? "Ошибка сервера" });

export const reviewController = {
  create: async (req: Request, res: Response) => {
    try   { res.status(201).json({ success: true, data: await reviewService.create(req.user!.userId, req.body) }); }
    catch (e) { handleError(res, e); }
  },
};
