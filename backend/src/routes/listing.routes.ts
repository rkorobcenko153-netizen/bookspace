import { Router } from "express";
import { listingController } from "../controllers/listing.controller";
import { authMiddleware }    from "../middleware/auth.middleware";
import { requireRole }       from "../middleware/role.middleware";

export const listingRouter = Router();
listingRouter.get("/",           listingController.getAll);
listingRouter.get("/:id",        listingController.getOne);
listingRouter.post("/",          authMiddleware, requireRole("OWNER","ADMIN"), listingController.create);
listingRouter.patch("/:id",      authMiddleware, requireRole("OWNER","ADMIN"), listingController.update);
listingRouter.delete("/:id",     authMiddleware, requireRole("OWNER","ADMIN"), listingController.deactivate);
listingRouter.get("/:id/reviews", listingController.getReviews);
