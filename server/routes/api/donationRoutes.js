import express from "express";
import {
  addDonation,
  getInventory,
  getAllDonations,
  getAllDonationTransactions,
  getAllDonatorsList,
  getDonatorInformation,
} from "../../controllers/donation-controller.js";

const router = express.Router();

router.route("/add").post(addDonation);
router.route("/getAll").get(getInventory);
router.route("/getAllDonations").get(getAllDonations);
router.route("/getAllDonationTransactions").get(getAllDonationTransactions);
router.route("/getAllDonatorsList").get(getAllDonatorsList);
router.route("/getDonatorInformation/:donatorName").post(getDonatorInformation);

export default router;
