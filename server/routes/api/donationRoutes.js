import express from "express";
import { addDonation, getInventory } from "../../controllers/donation-controller.js";

const router = express.Router();

router.route("/add").post(addDonation);
router.route('/getAll').get(getInventory);

export default router;
