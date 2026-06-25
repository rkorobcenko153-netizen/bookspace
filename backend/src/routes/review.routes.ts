import { Router } from "express";
import { reviewController } from "../controllers/review.controller";
import { authMiddleware }   from "../middleware/auth.middleware";

export const reviewRouter = Router();
reviewRouter.post("/", authMiddleware, reviewController.create);
