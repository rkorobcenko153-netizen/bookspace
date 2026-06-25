import { Router } from "express";
import { adminController } from "../controllers/admin.controller";
import { authMiddleware }  from "../middleware/auth.middleware";
import { requireRole }     from "../middleware/role.middleware";

export const adminRouter = Router();
adminRouter.get("/users",    authMiddleware, requireRole("ADMIN"), adminController.getUsers);
adminRouter.get("/bookings", authMiddleware, requireRole("ADMIN"), adminController.getAllBookings);
adminRouter.patch("/users/:id/role", authMiddleware, requireRole("ADMIN"), adminController.changeRole);
