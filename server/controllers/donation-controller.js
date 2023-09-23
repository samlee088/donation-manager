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

    let categoryInventory = await Inventory.findOne({
      inventoryCategory: newDonationRequestedCategory,
    });

    if (!categoryInventory) {
      categoryInventory = await Inventory.create({
        inventoryCategory: newDonationRequestedCategory,
        inventoryValue: newDonationRequestedQuantity,
      });
    } else {
      categoryInventory.inventoryValue += newDonationRequestedQuantity;
      await categoryInventory.save();
    }

    return res.status(200).json(donation);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

export const getInventory = async (req, res) => {
  try {
    const inventory = await Inventory.find();

    return res.status(200).json(inventory);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

export const getAllDonations = async (req, res) => {
  //Used to get all donations and render on data grid
  try {
    const donations = await Donation.find();

    const transformedData = [];

    donations.forEach((donation) => {
      const donator = donation.donorName;
      const donationCategory = donation.donationCategory;
      const donationQuantity = donation.donationQuantity;

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

    return res.status(200).json(transformedData);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

export const getAllDonationTransactions = async (req, res) => {
  try {
    //Find and return all donation transactions
    const donations = await Donation.find();

    return res.status(200).json(donations);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

export const getAllDonatorsList = async (req, res) => {
  try {
    //Unique values for all donators
    const donators = await Donation.distinct("donorName");

    return res.status(200).json(donators);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

export const getAllDonatorsListByCategory = async (req, res) => {
  try {
    //Used for category bar graph legend key
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
    console.error(error);
    res.status(500).json(error);
  }
};

export const Colors = ["#00A6FB", "#0582CA", "#006494", "#003554", "#051923"];

export const getDonatorInformation = async (req, res) => {
  try {
    //API call used for pie chart data.
    const donorName = req.params.donatorName;

    let dataRetrieve = [];
    if (donorName === "none") {
      dataRetrieve = await Donation.find();
    } else {
      dataRetrieve = await Donation.find({ donorName });
    }

    let pieChartData = [];
    let colorsReferenceIndex = 0;

    //Once the data is found for all donators, or particular donor, map the data points needed for Nivo pie chart

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

    return res.status(200).json(pieChartData);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

export const getAllDonationsByCategory = async (req, res) => {
  try {
    const donationCategory = req.params.categorySelection;

    //Used for category summary bar graph
    //Retrieve all data points by category
    let donationsData = [];
    if (donationCategory === "none") {
      donationsData = await Donation.find();
    } else {
      donationsData = await Donation.find({ donationCategory });
    }

    let barGraphData = [];

    let colorsReferenceIndex = 0;

    //map the data for Nivo bar graph format
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
        let donorIdentity = existingData[donatorName];

        if (!donorIdentity) {
          existingData[donatorName] = donationQuantity;
          existingData[`${donatorName}Color`] = Colors[colorsReferenceIndex];
        } else {
          existingData[donatorName] += donationQuantity;
        }
      }

      colorsReferenceIndex = (colorsReferenceIndex + 1) % Colors.length;
    });

    res.status(200).json(barGraphData);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

export const getAllCategoriesList = async (req, res) => {
  //Used for dropdown for category selection in category summary bar graph
  try {
    const categories = await Donation.distinct("donationCategory");

    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

export const getAllDonationsGroupedByCategory = async (req, res) => {
  //Used to get all lifetime donations and sum by category
  try {
    let donations = await Donation.find();

    let idProperty = 0;

    let categorySum = donations.reduce((categorySums, donation) => {
      let donationCategory = donation.donationCategory;
      let donationQuantity = donation.donationQuantity;

      let categoryFind = categorySums.find(
        (category) => category.inventoryCategory === donationCategory
      );

      if (!categoryFind) {
        idProperty += 1;
        let initial = {
          id: idProperty,
          inventoryCategory: donationCategory,
          inventoryValue: donationQuantity,
        };
        categorySums.push(initial);
      } else {
        categoryFind.inventoryValue += donationQuantity;
      }

      return categorySums;
    }, []);

    return res.status(200).json(categorySum);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};
