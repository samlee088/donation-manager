import express from "express";
import {
  addDonation,
  getInventory,
  getAllDonations,
  getAllDonationTransactions,
  getAllDonatorsList,
  getDonatorInformation,
  getAllDonationsByCategory,
  getAllCategoriesList,
} from "../../controllers/donation-controller.js";

const router = express.Router();

router.route("/add").post(addDonation);
router.route("/getAll").get(getInventory);
router.route("/getAllDonations").get(getAllDonations);
router.route("/getAllDonationTransactions").get(getAllDonationTransactions);
router.route("/getAllDonationsByCategory").get(getAllDonationsByCategory);
router.route("/getAllDonatorsList").get(getAllDonatorsList);
router.route("/getDonatorInformation/:donatorName").post(getDonatorInformation);
router.route("/getAllCategoriesList").get(getAllCategoriesList);

export default router;
