import express from "express";
import donationRoutes from "./donationRoutes.js";
import distributionsRoutes from "./distributionRoutes.js";

const router = express.Router();

/* All routes to be classified as part of donations vs distributions */
router.use("/donations", donationRoutes);
router.use("/distributions", distributionsRoutes);

export default router;
