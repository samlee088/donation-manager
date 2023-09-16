import express from "express";
import donationRoutes from "./donationRoutes.js";

const router = express.Router();

router.use("/donations", donationRoutes);

export default router;
