import { Router } from "express";
import { authRouter }         from "./auth.routes";
import { listingRouter }      from "./listing.routes";
import { bookingRouter }      from "./booking.routes";
import { reviewRouter }       from "./review.routes";
import { notificationRouter } from "./notification.routes";
import { categoryRouter }     from "./category.routes";
import { adminRouter }        from "./admin.routes";

export const router = Router();

router.use("/auth",          authRouter);
router.use("/listings",      listingRouter);
router.use("/bookings",      bookingRouter);
router.use("/reviews",       reviewRouter);
router.use("/notifications", notificationRouter);
router.use("/categories",    categoryRouter);
router.use("/admin",         adminRouter);
