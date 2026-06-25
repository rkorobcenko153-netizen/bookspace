import { Router } from "express";
import { bookingController } from "../controllers/booking.controller";
import { authMiddleware }    from "../middleware/auth.middleware";
import { validate }          from "../middleware/validate.middleware";
import { createBookingSchema } from "../schemas/booking.schema";

export const bookingRouter = Router();
bookingRouter.get("/",          authMiddleware, bookingController.getMyBookings);
bookingRouter.post("/",         authMiddleware, validate(createBookingSchema), bookingController.create);
bookingRouter.patch("/:id",     authMiddleware, bookingController.updateDates);
bookingRouter.delete("/:id",    authMiddleware, bookingController.cancel);
