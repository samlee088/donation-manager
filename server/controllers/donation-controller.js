import { Donation, Inventory } from "../models/index.js";

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

export const getAllDonationTransactions = async (req, res) => {
  try {
    const donations = await Donation.find();

    return res.status(200).json(donations);
  } catch (error) {
    console.log(error);
    console.log("can't get all donations transactions");
    res.status(500).json(error);
  }
};

export const getAllDonatorsList = async (req, res) => {
  try {
    const donators = await Donation.distinct("donorName");

    return res.status(200).json(donators);
  } catch (error) {
    console.log(error);
    console.log("can't get a list of all donators");
    res.status(500).json(error);
  }
};

export const getAllDonatorsListByCategory = async (req, res) => {
  try {
    const donorCategory = req.params.categorySelection;

    let donators = [];

    if (donorCategory === "none") {
      donators = await Donation.distinct("donorName");
    } else {
      donators = await Donation.distinct("donorName", {
        donationCategory: donorCategory,
      });
    }

    return res.status(200).json(donators);
  } catch (error) {
    console.log(error);
    console.log("can't get a list of all donators");
    res.status(500).json(error);
  }
};

export const Colors = ["#00A6FB", "#0582CA", "#006494", "#003554", "#051923"];

export const getDonatorInformation = async (req, res) => {
  try {
    const donorName = req.params.donatorName;

    let dataRetrieve = [];
    if (donorName === "none") {
      dataRetrieve = await Donation.find();
    } else {
      dataRetrieve = await Donation.find({ donorName });
    }

    let pieChartData = [];
    let colorsReferenceIndex = 0;

    dataRetrieve.map((donation) => {
      let category = donation.donationCategory;
      let existingData = pieChartData.find((data) => data.id === category);

      if (!existingData) {
        let initial = {
          id: category,
          label: category,
          value: donation.donationQuantity,
          color: Colors[colorsReferenceIndex],
        };
        pieChartData.push(initial);
      } else {
        existingData.value += donation.donationQuantity;
      }

      colorsReferenceIndex = (colorsReferenceIndex + 1) % Colors.length;
    });

    console.log(pieChartData);

    return res.status(200).json(pieChartData);
  } catch (error) {
    console.log(error);
    console.log("can't get a list of all donators");
    res.status(500).json(error);
  }
};

export const getAllDonationsByCategory = async (req, res) => {
  try {
    const donationCategory = req.params.categorySelection;

    console.log(donationCategory);

    let donationsData = [];
    if (donationCategory === "none") {
      donationsData = await Donation.find();
    } else {
      donationsData = await Donation.find({ donationCategory });
    }

    let barGraphData = [];

    let colorsReferenceIndex = 0;

    donationsData.map((donation) => {
      let category = donation.donationCategory;
      let donatorName = donation.donorName;
      let donationQuantity = donation.donationQuantity;
      let existingData = barGraphData.find(
        (data) => data.category === category
      );

      if (!existingData) {
        let initial = {
          category: category,
          [`${donatorName}`]: donationQuantity,
          [`${donatorName}Color`]: Colors[colorsReferenceIndex],
        };

        barGraphData.push(initial);
      } else {
        let donorIdentity = existingData.donatorName;

        if (!donorIdentity) {
          existingData[donatorName] = donationQuantity;
          existingData[`${donatorName}Color`] = Colors[colorsReferenceIndex];
        } else {
          existingData[donatorName] =
            existingData[donatorName] + donationQuantity;
        }
      }

      colorsReferenceIndex = (colorsReferenceIndex + 1) % Colors.length;
    });

    res.status(200).json(barGraphData);
  } catch (error) {
    console.log(error);
    console.log("can't get a list of all donators");
    res.status(500).json(error);
  }
};

export const getAllCategoriesList = async (req, res) => {
  try {
    const categories = await Donation.distinct("donationCategory");

    res.status(200).json(categories);
  } catch (error) {
    console.log(error);
    console.log("can't get a list of all categories");
    res.status(500).json(error);
  }
};
