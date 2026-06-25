import type { Request, Response } from "express";
import { bookingService } from "../services/booking.service";

const handleError = (res: Response, e: any) =>
  res.status(e.status ?? 500).json({ success: false, message: e.message ?? "Ошибка сервера" });

export const bookingController = {
  getMyBookings: async (req: Request, res: Response) => {
    try   { res.json({ success: true, data: await bookingService.getByUser(req.user!.userId) }); }
    catch (e) { handleError(res, e); }
  },
  create: async (req: Request, res: Response) => {
    try   { res.status(201).json({ success: true, data: await bookingService.create(req.user!.userId, req.body) }); }
    catch (e) { handleError(res, e); }
  },
  cancel: async (req: Request, res: Response) => {
    try   { res.json({ success: true, data: await bookingService.cancel(req.params.id, req.user!.userId, req.user!.role) }); }
    catch (e) { handleError(res, e); }
  },
  updateDates: async (req: Request, res: Response) => { res.json({ success: true }); },
};
