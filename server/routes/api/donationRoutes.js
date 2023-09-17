import express from "express";
import {
  addDonation,
  getInventory,
  getAllDonations,
} from "../../controllers/donation-controller.js";

const router = express.Router();

router.route("/add").post(addDonation);
router.route("/getAll").get(getInventory);
router.route("/getAllDonations").get(getAllDonations);

export default router;
