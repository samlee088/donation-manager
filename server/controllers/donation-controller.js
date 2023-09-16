import { Distribution, Donation, Inventory } from "../models/index.js";

export const addDonation = async (req, res) => {
  try {
    console.log(req);
    console.log(req.body);
  } catch (error) {
    console.error(error);
    console.log("error with adding expense");
    res.status(500).json(error);
  }
};
