import { Router } from "express";
import { notificationController } from "../controllers/notification.controller";
import { authMiddleware }         from "../middleware/auth.middleware";

export const notificationRouter = Router();
notificationRouter.get("/",              authMiddleware, notificationController.getAll);
notificationRouter.patch("/:id/read",    authMiddleware, notificationController.markRead);
notificationRouter.patch("/read-all",    authMiddleware, notificationController.markAllRead);
