import { Router } from "express";
import { categoryController } from "../controllers/category.controller";
import { authMiddleware }     from "../middleware/auth.middleware";
import { requireRole }        from "../middleware/role.middleware";

export const categoryRouter = Router();
categoryRouter.get("/",  categoryController.getAll);
categoryRouter.post("/", authMiddleware, requireRole("ADMIN"), categoryController.create);
