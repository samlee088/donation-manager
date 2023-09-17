import { Distribution, Donation, Inventory } from "../models/index.js";

export const addDonation = async (req, res) => {
  const newDonationRequestedCategory = req.body.donationCategory;
  const newDonationRequestedQuantity = Number(req.body.donationQuantity);

  try {
    const donation = await Donation.create({
      donorName: req.body.donorName,
      donationCategory: newDonationRequestedCategory,
      donationQuantity: newDonationRequestedQuantity,
      donationDate: req.body.donationDate,
    });

    // Find the inventory item for the donation category
    let categoryInventory = await Inventory.findOne({
      inventoryCategory: newDonationRequestedCategory,
    });

    if (!categoryInventory) {
      // If the inventory item doesn't exist, create it
      categoryInventory = await Inventory.create({
        inventoryCategory: newDonationRequestedCategory,
        inventoryValue: newDonationRequestedQuantity,
      });
    } else {
      // If the inventory item exists, update its value
      categoryInventory.inventoryValue += newDonationRequestedQuantity;
      await categoryInventory.save();
    }

    return res.status(200).json(donation);
  } catch (error) {
    console.error(error);
    console.log("error with adding donation");
    res.status(500).json(error);
  }
};
