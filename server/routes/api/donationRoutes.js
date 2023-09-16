import express from "express";
import { addDonation } from "../../controllers/donation-controller.js";

const router = express.Router();

router.route("/add").post(addDonation);

export default router;
