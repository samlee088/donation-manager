import express from "express";
import donationRoutes from "./donationRoutes.js";
import distributionsRoutes from "./distributionRoutes.js";

const router = express.Router();

router.use("/donations", donationRoutes);
router.use("/distributions", distributionsRoutes);

export default router;
