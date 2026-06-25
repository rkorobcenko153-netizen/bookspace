import { Router } from "express";
import { authController } from "../controllers/auth.controller";
import { validate } from "../middleware/validate.middleware";
import { loginSchema, registerSchema } from "../schemas/auth.schema";
import { authMiddleware } from "../middleware/auth.middleware";

export const authRouter = Router();
authRouter.post("/register", validate(registerSchema), authController.register);
authRouter.post("/login",    validate(loginSchema),    authController.login);
authRouter.get ("/me",       authMiddleware,            authController.me);
