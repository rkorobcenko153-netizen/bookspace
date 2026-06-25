import { type Request, type Response, type NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface JwtPayload { userId: string; role: string; }

declare global {
  namespace Express {
    interface Request { user?: JwtPayload; }
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    res.status(401).json({ success: false, message: "Токен не предоставлен" });
    return;
  }
  try {
    const token   = header.slice(7);
    req.user = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    next();
  } catch {
    res.status(401).json({ success: false, message: "Невалидный или просроченный токен" });
  }
};
