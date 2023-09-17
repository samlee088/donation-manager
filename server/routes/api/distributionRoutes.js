import express from "express";
import { addDistribution } from "../../controllers/distribution-controller.js";

const router = express.Router();

router.route("/add").post(addDistribution);

export default router;
