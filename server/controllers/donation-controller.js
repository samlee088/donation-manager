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

export const getInventory = async (req, res) => {
  try {
    const inventory = await Inventory.find();

    return res.status(200).json(inventory);
  } catch (error) {
    console.log(error);
    console.log("cant get current inventory");
    res.status(500).json(error);
  }
};

export const getAllDonations = async (req, res) => {
  try {
    const donations = await Donation.find(); // Fetch your donation data

    // Initialize an array to hold the transformed data
    const transformedData = [];

    // Iterate through each donation
    donations.forEach((donation) => {
      const donator = donation.donorName;
      const donationCategory = donation.donationCategory;
      const donationQuantity = donation.donationQuantity;

      // Find or create a row for the donator in the transformed data
      let donatorRow = transformedData.find((row) => row.Donator === donator);

      if (!donatorRow) {
        donatorRow = {
          Donator: donator,
          Clothing: 0,
          Money: 0,
          Other: 0,
          Toys: 0,
        };
        transformedData.push(donatorRow);
      }

      // Update the quantity in the corresponding category column
      if (donationCategory === "Clothing") {
        donatorRow.Clothing += donationQuantity;
      } else if (donationCategory === "Money") {
        donatorRow.Money += donationQuantity;
      } else if (donationCategory === "Other") {
        donatorRow.Other += donationQuantity;
      } else if (donationCategory === "Toys") {
        donatorRow.Toys += donationQuantity;
      }
    });

    // Return the transformed data, not scrubbedDonations
    return res.status(200).json(transformedData);
  } catch (error) {
    console.log(error);
    console.log("can't get all donations");
    res.status(500).json(error);
  }
};
