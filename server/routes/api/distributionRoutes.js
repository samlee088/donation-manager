import express from "express";
import {
  addDistribution,
  getAllDistributionTransactions,
} from "../../controllers/distribution-controller.js";

const router = express.Router();

router.route("/add").post(addDistribution);
router
  .route("/getAllDistributionTransactions")
  .get(getAllDistributionTransactions);

export default router;
