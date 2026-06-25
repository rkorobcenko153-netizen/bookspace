import type { Request, Response } from "express";
import { authService } from "../services/auth.service";

const handleError = (res: Response, e: any) =>
  res.status(e.status ?? 500).json({ success: false, message: e.message ?? "Ошибка сервера" });

export const authController = {
  register: async (req: Request, res: Response) => {
    try   { res.status(201).json({ success: true, data: await authService.register(req.body) }); }
    catch (e) { handleError(res, e); }
  },
  login: async (req: Request, res: Response) => {
    try   { res.json({ success: true, data: await authService.login(req.body) }); }
    catch (e) { handleError(res, e); }
  },
  me: (req: Request, res: Response) => res.json({ success: true, data: req.user }),
};
