import type { Request, Response } from "express";
import { listingService } from "../services/listing.service";

const handleError = (res: Response, e: any) =>
  res.status(e.status ?? 500).json({ success: false, message: e.message ?? "Ошибка сервера" });

export const listingController = {
  getAll: async (req: Request, res: Response) => {
    try   { res.json({ success: true, ...(await listingService.getAll(req.query as any)) }); }
    catch (e) { handleError(res, e); }
  },
  getOne: async (req: Request, res: Response) => {
    try   { res.json({ success: true, data: await listingService.getById(req.params.id) }); }
    catch (e) { handleError(res, e); }
  },
  create:     async (req: Request, res: Response) => { res.status(201).json({ success: true }); },
  update:     async (req: Request, res: Response) => { res.json({ success: true }); },
  deactivate: async (req: Request, res: Response) => { res.json({ success: true }); },
  getReviews: async (req: Request, res: Response) => { res.json({ success: true, data: [] }); },
};
